# Cloud Operations - DYGSOM Landing

**Ambito:** despliegue, seguridad de cabeceras y permisos IAM para `dygsom-landing-page`.

**Ultima actualizacion:** 2026-02-15

---

## 1. Objetivo

Centralizar en esta carpeta todo lo necesario para desplegar y operar el frontend en AWS:
- despliegue automatico por script,
- despliegue manual por comandos,
- aplicacion de security headers en CloudFront,
- permisos IAM minimos necesarios.

---

## 2. Artefactos vigentes

## 2.1 Scripts operativos
- `deploy-s3.ps1` - flujo completo de despliegue (Windows/PowerShell).
- `deploy-s3.sh` - flujo completo de despliegue (Linux/macOS).
- `apply-security-headers.ps1` - aplica/actualiza response headers policy en CloudFront (con fallback para plan gratuito).
- `apply-security-headers.sh` - version Bash de aplicacion de headers.

## 2.2 Configuracion
- `security/response-headers-policy.json` - definicion de policy custom de headers.
- `iam-policy.json` - policy de referencia para usuario de despliegue.
- `bucket-policy.json` - policy publica de lectura para S3 website (si se usa website endpoint).

## 2.3 Documentacion
- `DEPLOYMENT.md` - guia integral (manual, comandos y scripting).
- `PERMISOS-REQUERIDOS.md` - permisos IAM y recomendaciones de asignacion.

---

## 3. Flujo recomendado de despliegue

1. Validar credenciales AWS (`aws sts get-caller-identity --profile dygsom-dev`).
2. Ejecutar despliegue por script:
   - Windows: `.\cloud\deploy-s3.ps1`
   - Linux/macOS: `./cloud/deploy-s3.sh`
3. Verificar:
   - `https://www.dygsom.pe`
   - `https://d3rskao5nrdvou.cloudfront.net`
4. Ejecutar smoke test funcional (scan + formularios).

---

## 4. Consideracion importante (CloudFront Free Plan)

Si la distribucion esta en plan gratuito, CloudFront puede rechazar policy custom de response headers.
El script PowerShell (`apply-security-headers.ps1`) tiene fallback a policy administrada de AWS para mantener continuidad operativa.

---

## 5. Orden de lectura para nuevos integrantes

1. `DEPLOYMENT.md`
2. `PERMISOS-REQUERIDOS.md`
3. `iam-policy.json`
4. `security/response-headers-policy.json`

