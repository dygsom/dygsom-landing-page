# DEPLOYMENT - DYGSOM Landing Page

**Proyecto:** `D:\code\dygsom\dygsom-landing-page`  
**Ultima actualizacion:** 2026-02-15

---

## 1. Objetivo

Esta guia describe el proceso real de despliegue del frontend DYGSOM en AWS:
- modo manual por comandos,
- modo automatizado por scripts (`ps1` / `sh`),
- aplicacion de headers de seguridad en CloudFront,
- y verificaciones post despliegue.

---

## 2. Infraestructura objetivo

- Bucket S3: `dygsom-landing-page-dev`
- Region: `us-east-1`
- CloudFront Distribution: `E8UFMILPM5WIL`
- Dominio CloudFront: `d3rskao5nrdvou.cloudfront.net`
- Dominio publico: `www.dygsom.pe`
- Perfil AWS recomendado: `dygsom-dev`

---

## 3. Prerrequisitos

1. Node.js 18+ y npm 9+.
2. AWS CLI v2 instalado.
3. Credenciales configuradas:
```bash
aws configure --profile dygsom-dev
```
4. Permisos IAM adecuados (ver `PERMISOS-REQUERIDOS.md`).
5. (Linux/macOS) `bash` y `jq` instalados para script de headers.

Validacion minima:
```bash
aws sts get-caller-identity --profile dygsom-dev
```

---

## 4. Opcion A - despliegue automatizado (recomendado)

## 4.1 Windows (PowerShell)
```powershell
.\cloud\deploy-s3.ps1
```

### Que hace el script
1. Ejecuta `npm run build`.
2. Sincroniza `dist/` a S3 con cache largo para assets.
3. Sincroniza HTML/favicon con `no-cache`.
4. Ejecuta `apply-security-headers.ps1`.
5. Crea invalidacion de CloudFront.

## 4.2 Linux/macOS (Bash)
```bash
./cloud/deploy-s3.sh
```

### Que hace el script
1. Ejecuta `npm run build`.
2. Sincroniza `dist/` a S3.
3. Intenta aplicar headers con `apply-security-headers.sh`.
4. Invalida CloudFront.

---

## 5. Opcion B - despliegue manual por comandos

Ejecutar desde raiz del proyecto.

## 5.1 Build
```bash
npm run build
```

## 5.2 Sync de assets (cache largo)
```bash
aws s3 sync dist/ s3://dygsom-landing-page-dev \
  --profile dygsom-dev \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html" \
  --exclude "favicon*.svg"
```

## 5.3 Sync de HTML y favicon (no-cache)
```bash
aws s3 sync dist/ s3://dygsom-landing-page-dev \
  --profile dygsom-dev \
  --cache-control "no-cache" \
  --exclude "*" \
  --include "*.html" \
  --include "favicon*.svg"
```

## 5.4 Aplicar security headers en CloudFront

### Windows
```powershell
.\cloud\apply-security-headers.ps1 -DistributionId E8UFMILPM5WIL -Profile dygsom-dev
```

### Linux/macOS
```bash
./cloud/apply-security-headers.sh E8UFMILPM5WIL dygsom-dev
```

## 5.5 Invalidar cache CloudFront
```bash
aws cloudfront create-invalidation \
  --profile dygsom-dev \
  --distribution-id E8UFMILPM5WIL \
  --paths "/*"
```

---

## 6. Security headers: comportamiento esperado

## 6.1 Policy custom
- Definida en `cloud/security/response-headers-policy.json`.
- Incluye HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, X-XSS-Protection y CSP custom.

## 6.2 Restriccion de plan gratuito CloudFront
- En algunas cuentas/distribuciones free plan, CloudFront rechaza policy custom de response headers.
- `apply-security-headers.ps1` contiene fallback a policy administrada:
  - `Managed-SecurityHeadersPolicy` (`67f7725c-6f97-4210-82d7-5512b31e9d03`).
- En fallback:
  - se mantienen headers base de seguridad,
  - pero puede no aplicarse CSP custom completa.

---

## 7. Verificacion post despliegue

## 7.1 Verificacion HTTP
```bash
curl -I https://www.dygsom.pe
curl -I https://d3rskao5nrdvou.cloudfront.net
```

Revisar presencia de headers de seguridad y status `200`.

## 7.2 Verificacion funcional minima
1. Abrir `https://www.dygsom.pe`.
2. Iniciar scan desde Hero.
3. Confirmar avance de modulos en `/scan/{id}`.
4. Confirmar redireccion a `/results/{id}`.
5. Validar envio de formulario demo.

---

## 8. Troubleshooting

## 8.1 `AccessDenied` en comandos AWS
- Verificar profile activo:
```bash
aws sts get-caller-identity --profile dygsom-dev
```
- Revisar policy IAM (ver `PERMISOS-REQUERIDOS.md`).

## 8.2 Stream scan retorna `503`
- No bloquea despliegue.
- Frontend ya incorpora fallback a polling de estado/resultados.
- Revisar salud del backend scan por separado.

## 8.3 Headers custom no se aplican en CloudFront
- Revisar si la distribucion esta en plan gratuito.
- Confirmar salida del script `apply-security-headers.ps1`.
- Si entro fallback, validar headers base y continuar operacion.

## 8.4 Sitio no refleja cambios
- Confirmar invalidacion CloudFront.
- Limpiar cache de navegador y DNS local.

---

## 9. Operacion diaria recomendada

1. Desarrollar cambios.
2. Ejecutar `npm run lint`.
3. Ejecutar `npm run build`.
4. Deploy por script.
5. Verificacion funcional en produccion.
6. Registrar hallazgos/incidencias.

