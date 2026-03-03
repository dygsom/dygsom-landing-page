import type {
  ScanResultsResponse,
  ScanStartRequest,
  ScanStartResponse,
  ScanStatusResponse,
  ScanStreamMessage,
} from '../types/scan';

const DEFAULT_SCAN_API_BASE_URL = 'https://qjrvkkbaa2.execute-api.us-east-1.amazonaws.com/prod';
const SCAN_API_BASE_URL = (
  import.meta.env.VITE_SCAN_API_BASE_URL || DEFAULT_SCAN_API_BASE_URL
).replace(/\/+$/, '');

type ErrorPayload = {
  message?: string;
  detail?: string;
  error?: string;
  [key: string]: unknown;
};

const STATUS_MESSAGES: Record<number, string> = {
  400: 'La URL ingresada no es valida o no puede ser analizada.',
  404: 'No se encontro el escaneo solicitado.',
  429: 'Has alcanzado el limite de escaneos. Espera un minuto para intentar nuevamente.',
  504: 'El analisis esta tardando mas de lo esperado. Intentaremos recuperar resultados.',
};

export class ScanApiError extends Error {
  status: number;
  details?: ErrorPayload;

  constructor(message: string, status = 0, details?: ErrorPayload) {
    super(message);
    this.name = 'ScanApiError';
    this.status = status;
    this.details = details;
  }
}

export interface ScanStreamHandlers {
  onMessage?: (message: ScanStreamMessage) => void;
  onComplete?: (results: ScanResultsResponse) => void;
  onError?: (error: ScanApiError) => void;
  onReconnect?: () => void;
  onConnectionError?: () => void;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function buildUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SCAN_API_BASE_URL}${normalizedPath}`;
}

function buildConnectivityErrorMessage(): string {
  return [
    'No se pudo conectar con el servicio de escaneo.',
    'Revisa red/CORS y, en local, usa `npm run dev` para aprovechar el proxy.',
  ].join(' ');
}

function pickErrorMessage(payload: ErrorPayload | null, status: number, fallback: string): string {
  if (payload) {
    if (typeof payload.detail === 'string' && payload.detail.trim()) return payload.detail;
    if (typeof payload.message === 'string' && payload.message.trim()) return payload.message;
    if (typeof payload.error === 'string' && payload.error.trim()) return payload.error;
  }

  return STATUS_MESSAGES[status] || fallback;
}

async function parseJsonSafe<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function toApiError(
  response: Response,
  fallback: string,
): Promise<ScanApiError> {
  const payload = await parseJsonSafe<ErrorPayload>(response);
  const message = pickErrorMessage(payload, response.status, fallback);
  return new ScanApiError(message, response.status, payload || undefined);
}

function parseStreamPayload(eventData: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(eventData) as unknown;
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function isScanPendingPayload(payload: Record<string, unknown> | null): payload is { detail: string } {
  if (!payload) return false;
  if (typeof payload.detail !== 'string') return false;
  return payload.detail.toLowerCase().includes('still running');
}

function toStreamError(payload: Record<string, unknown> | null): ScanApiError {
  if (!payload) {
    return new ScanApiError('El stream devolvio un error no valido.');
  }

  const message = pickErrorMessage(payload, 0, 'El escaneo reporto un error.');
  return new ScanApiError(message, 0, payload);
}

function assertResultsPayload(
  payload: Record<string, unknown> | null,
): ScanResultsResponse {
  if (!payload) {
    throw new ScanApiError('El backend devolvio una respuesta vacia de resultados.');
  }

  if (typeof payload.scan_id !== 'string' || !payload.scan_id.trim()) {
    throw new ScanApiError('La respuesta de resultados no incluye scan_id.');
  }

  const modulesPayload = payload.modules;
  const hasValidModules = isRecord(modulesPayload) || Array.isArray(modulesPayload);
  if (!hasValidModules) {
    throw new ScanApiError('La respuesta de resultados no incluye modulos validos.');
  }

  return payload as unknown as ScanResultsResponse;
}

export const scanService = {
  async startScan(request: ScanStartRequest): Promise<ScanStartResponse> {
    let response: Response;
    try {
      response = await fetch(buildUrl('/api/scan'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
    } catch (error) {
      throw new ScanApiError(buildConnectivityErrorMessage(), 0, {
        message: error instanceof Error ? error.message : 'fetch_error',
      });
    }

    if (!response.ok) {
      throw await toApiError(response, 'No se pudo iniciar el escaneo.');
    }

    const payload = await parseJsonSafe<Record<string, unknown>>(response);
    if (!payload || typeof payload.scan_id !== 'string') {
      throw new ScanApiError('Respuesta invalida al iniciar escaneo.');
    }

    return payload as unknown as ScanStartResponse;
  },

  connectScanStream(scanId: string, handlers: ScanStreamHandlers): () => void {
    const streamUrl = buildUrl(`/api/scan/${encodeURIComponent(scanId)}/stream`);
    const eventSource = new EventSource(streamUrl);
    let connectionClosed = false;
    let expectedReconnect = false;

    eventSource.onmessage = (event) => {
      const payload = parseStreamPayload(event.data);
      if (!payload) return;

      if (typeof payload.error === 'string' && payload.error.trim()) {
        handlers.onError?.(toStreamError(payload));
        eventSource.close();
        return;
      }

      handlers.onMessage?.(payload as ScanStreamMessage);
    };

    eventSource.addEventListener('complete', (event) => {
      if (!(event instanceof MessageEvent) || typeof event.data !== 'string') {
        handlers.onError?.(new ScanApiError('Evento complete sin datos validos.'));
        eventSource.close();
        return;
      }

      const payload = assertResultsPayload(parseStreamPayload(event.data));
      handlers.onComplete?.(payload);
      eventSource.close();
    });

    eventSource.addEventListener('error', (event) => {
      if (!(event instanceof MessageEvent) || typeof event.data !== 'string') {
        return;
      }

      handlers.onError?.(toStreamError(parseStreamPayload(event.data)));
      eventSource.close();
    });

    eventSource.addEventListener('reconnect', () => {
      // Backend can request controlled reconnects to avoid API Gateway timeouts.
      expectedReconnect = true;
      handlers.onReconnect?.();
    });

    eventSource.onerror = () => {
      if (connectionClosed) return;
      if (expectedReconnect) {
        expectedReconnect = false;
        return;
      }
      connectionClosed = true;
      eventSource.close();
      handlers.onConnectionError?.();
    };

    return () => {
      connectionClosed = true;
      eventSource.close();
    };
  },

  async getScanStatus(scanId: string): Promise<ScanStatusResponse> {
    let response: Response;
    try {
      response = await fetch(buildUrl(`/api/scan/${encodeURIComponent(scanId)}`));
    } catch (error) {
      throw new ScanApiError(buildConnectivityErrorMessage(), 0, {
        message: error instanceof Error ? error.message : 'fetch_error',
      });
    }

    if (!response.ok) {
      throw await toApiError(response, 'No se pudo obtener el estado del escaneo.');
    }

    const payload = await parseJsonSafe<Record<string, unknown>>(response);
    if (!payload || typeof payload.scan_id !== 'string' || typeof payload.status !== 'string') {
      throw new ScanApiError('Respuesta invalida al consultar estado del escaneo.');
    }

    return payload as ScanStatusResponse;
  },

  async getScanResults(scanId: string): Promise<ScanResultsResponse> {
    let response: Response;
    try {
      response = await fetch(buildUrl(`/api/scan/${encodeURIComponent(scanId)}/results`));
    } catch (error) {
      throw new ScanApiError(buildConnectivityErrorMessage(), 0, {
        message: error instanceof Error ? error.message : 'fetch_error',
      });
    }

    if (!response.ok) {
      throw await toApiError(response, 'No se pudieron obtener los resultados del escaneo.');
    }

    const payload = await parseJsonSafe<Record<string, unknown>>(response);
    if (response.status === 202 || isScanPendingPayload(payload)) {
      throw new ScanApiError('El escaneo sigue en ejecucion.', 202, payload || undefined);
    }
    return assertResultsPayload(payload);
  },
};

export function getScanApiBaseUrl(): string {
  return SCAN_API_BASE_URL;
}
