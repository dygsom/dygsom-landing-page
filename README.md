# DYGSOM Landing Page

Landing page comercial y modulo de escaneo de seguridad para `www.dygsom.pe`.

## Estado actual
- Produccion: `https://www.dygsom.pe`
- Dominio CDN: `https://d3rskao5nrdvou.cloudfront.net`
- Frontend: React + TypeScript + Vite + Tailwind
- Escaneo: API DYGSOM Scan (`/api/scan`, SSE + polling fallback)
- Leads: API AWS (`/lead`)
- Ultima actualizacion documental: `2026-02-16`

## Objetivo del proyecto
- Capturar demanda comercial (formularios de demo y ROI).
- Ejecutar un scan de seguridad web en flujo autoservicio.
- Mostrar resultados accionables por modulo (SSL/TLS, Headers, Email, WAF).
- Enviar eventos de analitica para trazabilidad de conversion.

## Arquitectura resumida
1. Usuario navega la landing y ejecuta acciones (scan, formularios, CTAs).
2. Frontend llama:
   - `scanService` para iniciar y monitorear escaneos.
   - `leadsService` para capturas comerciales.
3. Hosting en S3 + CloudFront con dominio GoDaddy.
4. Instrumentacion de eventos via GA4 y tracker local.

## Funcionalidades principales
- Hero con `ScanWidget` embebido.
- Seccion `Ruta recomendada para MYPE` con flujo guiado de 3 pasos.
- Flujo de scan completo:
  - Inicio: `POST /api/scan`
  - Progreso: `GET /api/scan/{scanId}/stream` (SSE)
  - Respaldo: polling de `status` y `results`
  - Resultado final: `GET /api/scan/{scanId}/results`
- Progreso con indicador de etapa activa (`Paso X de 4`).
- Resultados con benchmark, hallazgos criticos, plan de accion priorizado y detalle por modulo.
- Descarga de reporte JSON.
- Formulario de demo (`DemoFormSection`).
- Modal de bienvenida con formulario ROI (`WelcomeVideoModal`).
- Popup de salida (`ExitIntentPopup`).
- Boton flotante WhatsApp.

## Rutas de la aplicacion
- `/`: Landing principal
- `/scan`: Formulario dedicado de scan
- `/scan/:scanId`: Progreso del scan
- `/results/:scanId`: Resultado del scan
- `*`: NotFound

## Requisitos de entorno
- Node.js 18+
- npm 9+
- AWS CLI v2 (solo para despliegue)

## Inicio rapido local
```bash
npm install
npm run dev
```

## Scripts
```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Variables de entorno

### Frontend general
| Variable | Uso |
|---|---|
| `VITE_APP_NAME` | Nombre del sitio |
| `VITE_ENV` | Entorno (`development`/`production`) |
| `VITE_SUPPORT_EMAIL` | Correo de soporte visible en UI |
| `VITE_GA_TRACKING_ID` | ID de Google Analytics 4 |
| `VITE_DEBUG_ENABLED` | Activa helpers de debug en local |

### APIs
| Variable | Uso |
|---|---|
| `VITE_DYGSOM_API_URL` | Endpoint backend de leads (`/lead`) |
| `VITE_SCAN_API_BASE_URL` | Base URL del backend de scan (si no existe, usa default en `scanService`) |

## Estructura relevante
```text
src/
  components/
    layout/            # Header/Footer
    modals/            # WelcomeVideoModal, ExitIntentPopup
    scan/              # ScanWidget
    sections/          # Bloques de landing
    ui/                # Button, FeatureCard, FloatingWhatsAppButton
  pages/               # Landing, Scan, ScanProgress, Results, NotFound
  services/            # scanService, leadsService
  types/               # Tipos de scan
  utils/               # analytics, VisitorTracker, constants, url
cloud/
  deploy-s3.ps1
  deploy-s3.sh
  apply-security-headers.ps1
  apply-security-headers.sh
  security/response-headers-policy.json
```

## Despliegue

### Windows (PowerShell)
```powershell
.\cloud\deploy-s3.ps1
```

### Linux/macOS (Bash)
```bash
./cloud/deploy-s3.sh
```

Los scripts hacen:
1. Build de produccion (`npm run build`)
2. Sync de `dist/` a S3 (cache largo en assets, no-cache en HTML)
3. Aplicacion de policy de headers en CloudFront
4. Invalidacion de CloudFront

## Documentacion clave
- Funcional completa: `docs/landing-page-funcional.md`
- Tecnica completa: `docs/landing-page-tecnico.md`
- Integracion Scan API: `docs/API_INTEGRATION_GUIDE.md`
- Guia cloud: `cloud/README.md`
- Pasos de despliegue: `cloud/DEPLOYMENT.md`
- Permisos IAM: `cloud/PERMISOS-REQUERIDOS.md`
- SEO: `seo/README.md`

## Notas operativas
- Si el stream SSE se corta durante scan, la pagina usa polling de respaldo.
- En plan gratuito de CloudFront, no siempre se permite policy custom completa para headers; existe fallback a policy administrada.
- Parte de hallazgos (ej. DKIM/DMARC) depende de DNS/correo del dominio, no solo del frontend.

## Licencia
Proyecto propietario de DYGSOM.
