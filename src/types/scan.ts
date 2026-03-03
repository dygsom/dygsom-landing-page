export type ScanSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface ScanStartRequest {
  url: string;
  email?: string;
  industry?: string;
}

export interface ScanStartResponse {
  scan_id: string;
  status: string;
  url: string;
  domain: string;
}

export interface ScanIssue {
  severity?: ScanSeverity | string;
  code?: string;
  title?: string;
  description?: string;
  recommendation?: string;
  impact?: string;
}

export interface ScanModuleResult {
  module?: string;
  key?: string;
  name?: string;
  status?: string;
  score?: number;
  grade?: string;
  progress?: number;
  issues?: ScanIssue[];
  data?: Record<string, unknown>;
  [key: string]: unknown;
}

export type ScanModulesMap = Record<string, ScanModuleResult>;
export type ScanModulesPayload = ScanModulesMap | ScanModuleResult[];

export interface ScanResultsResponse {
  scan_id: string;
  status?: string;
  industry?: string;
  domain: string;
  score: number;
  grade: string;
  timestamp?: string;
  created_at?: string;
  completed_at?: string;
  url?: string;
  modules: ScanModulesPayload;
  [key: string]: unknown;
}

export interface ScanStreamModuleProgress {
  name?: string;
  key?: string;
  status?: string;
  progress?: number;
  score?: number;
}

export interface ScanStreamMessage {
  status?: string;
  progress?: number;
  message?: string;
  log?: string;
  error?: string;
  modules?: ScanStreamModuleProgress[] | Record<string, unknown>;
  [key: string]: unknown;
}

export interface ScanStatusModule {
  module?: string;
  key?: string;
  name?: string;
  status?: string;
  score?: number | null;
  progress?: number | null;
  [key: string]: unknown;
}

export interface ScanStatusResponse {
  scan_id: string;
  status: string;
  progress?: number;
  modules?: ScanStatusModule[];
  [key: string]: unknown;
}
