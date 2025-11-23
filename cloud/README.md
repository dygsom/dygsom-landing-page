# ☁️ AWS Cloud Infrastructure

Documentación completa de la infraestructura AWS para el despliegue de DYGSOM Landing Page.

## 🏗️ Arquitectura Actual

```
┌─────────────┐
│   GoDaddy   │
│     DNS     │  www.dygsom.pe (CNAME)
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│        CloudFront CDN               │
│  Distribution: E8UFMILPM5WIL        │
│  Domain: d3rskao5nrdvou...net       │
│  SSL: ACM Certificate               │
│  Cache: Optimized                   │
└──────────────┬──────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│         S3 Static Website            │
│  Bucket: dygsom-landing-page-dev     │
│  Region: us-east-1                   │
│  Website Hosting: Enabled            │
└──────────────────────────────────────┘
```

## 📁 Estructura de Archivos

```
cloud/
├── README.md                  # Esta documentación
├── DEPLOYMENT.md              # Guía paso a paso de despliegue
├── DOMINIO-SSL-CONFIG.md      # Configuración dominio y certificado SSL
├── COSTOS-CHECKLIST.md        # Análisis de costos AWS
├── PERMISOS-REQUERIDOS.md     # Políticas IAM necesarias
├── bucket-policy.json         # Política de acceso público S3
├── iam-policy.json            # Permisos IAM usuario deploy
├── deploy-s3.sh               # Script despliegue Unix/Linux/macOS
└── deploy-s3.ps1              # Script despliegue Windows PowerShell
```

## 📄 Descripción de Archivos

### Documentación

#### `DEPLOYMENT.md`
Guía completa paso a paso para desplegar la aplicación desde cero.

**Incluye:**
- Configuración inicial de AWS CLI
- Creación de bucket S3
- Configuración de CloudFront
- Configuración de certificado SSL
- Troubleshooting

#### `DOMINIO-SSL-CONFIG.md`
Configuración específica para dominio personalizado y certificado SSL.

**Cubre:**
- Solicitud de certificado en ACM
- Validación DNS del certificado
- Configuración de CNAMEs en CloudFront
- Configuración de DNS en GoDaddy
- Error pages para SPA routing

#### `COSTOS-CHECKLIST.md`
Análisis detallado de costos mensuales proyectados.

**Servicios:**
- S3 Storage y transferencia
- CloudFront requests y data transfer
- Route 53 (si aplica)
- ACM (gratuito)

#### `PERMISOS-REQUERIDOS.md`
Documentación de todos los permisos IAM necesarios.

**Permisos para:**
- Usuario de despliegue (S3 + CloudFront)
- Bucket policies
- CloudFront access

### Archivos de Configuración

#### `bucket-policy.json`
Política de bucket S3 para acceso público de lectura.

**Aplica con:**
```bash
aws s3api put-bucket-policy \
  --bucket dygsom-landing-page-dev \
  --policy file://cloud/bucket-policy.json
```

#### `iam-policy.json`
Política IAM para usuario de despliegue.

**Permisos incluidos:**
- S3: PutObject, GetObject, DeleteObject, ListBucket
- S3: PutBucketWebsite, PutBucketPolicy, GetBucketLocation
- CloudFront: CreateInvalidation (para cache clearing)

**Adjuntar con:**
```bash
aws iam attach-user-policy \
  --user-name dygsom-landing-deploy-user \
  --policy-arn arn:aws:iam::ACCOUNT_ID:policy/DygsomDeployPolicy
```

### Scripts de Despliegue

#### `deploy-s3.ps1` (Windows PowerShell)
Script automatizado para despliegue en Windows.

**Funcionalidad:**
1. Build de producción con `npm run build`
2. Sync a S3 con cache headers optimizados
3. Invalidación de cache CloudFront
4. Verificación de éxito

**Uso:**
```powershell
.\cloud\deploy-s3.ps1
```

**Requisitos:**
- PowerShell 5.1+
- AWS CLI configurado con profile `dygsom-dev`
- Node.js y npm instalados

#### `deploy-s3.sh` (Unix/Linux/macOS)
Script automatizado para despliegue en sistemas Unix.

**Funcionalidad:**
1. Build de producción con validación
2. Sync a S3 con estrategia de cache
3. Output con colores para legibilidad
4. Exit codes apropiados

**Uso:**
```bash
chmod +x cloud/deploy-s3.sh
./cloud/deploy-s3.sh
```

**Requisitos:**
- Bash shell
- AWS CLI configurado
- Node.js y npm instalados

## 🚀 Guía Rápida de Despliegue

### Prerequisitos

1. **AWS CLI** instalado y configurado
   ```bash
   aws configure --profile dygsom-dev
   ```

2. **Node.js** y npm instalados
   ```bash
   node --version  # v18+
   npm --version   # v9+
   ```

3. **Permisos IAM** configurados (ver `PERMISOS-REQUERIDOS.md`)

### Despliegue Automático

**Windows PowerShell:**
```powershell
cd d:\code\dygsom\dygsom-landing-page
.\cloud\deploy-s3.ps1
```

**Linux/macOS:**
```bash
cd /path/to/dygsom-landing-page
chmod +x cloud/deploy-s3.sh
./cloud/deploy-s3.sh
```

### ¿Qué hace el script?

1. ✅ Ejecuta `npm run build` (Vite production build)
2. ✅ Sube archivos a S3 con cache headers:
   - Assets (JS, CSS, imágenes): `max-age=31536000` (1 año)
   - HTML y favicon: `no-cache` (siempre fresh)
3. ✅ Invalida cache de CloudFront (distribución E8UFMILPM5WIL)
4. ✅ Muestra URLs de producción

### Verificación Post-Despliegue

```bash
# Limpiar DNS cache local
ipconfig /flushdns  # Windows
sudo dscacheutil -flushcache  # macOS

# Probar URLs
curl -I https://www.dygsom.pe
curl -I https://d3rskao5nrdvou.cloudfront.net
```

## 🌐 Infraestructura de Producción

### S3 Bucket
- **Nombre:** `dygsom-landing-page-dev`
- **Región:** `us-east-1`
- **Website Hosting:** Habilitado
- **Endpoint:** `http://dygsom-landing-page-dev.s3-website-us-east-1.amazonaws.com`
- **Política:** Acceso público de lectura (bucket-policy.json)

### CloudFront Distribution
- **ID:** `E8UFMILPM5WIL`
- **Domain:** `d3rskao5nrdvou.cloudfront.net`
- **Origin:** S3 website endpoint (HTTP only)
- **Viewer Protocol:** Redirect HTTP → HTTPS
- **CNAMEs:** `dygsom.pe`, `www.dygsom.pe`
- **SSL Certificate:** AWS Certificate Manager (ACM)
- **Price Class:** Use all edge locations
- **Default Root Object:** `index.html`
- **Error Pages:** 403, 404 → `/index.html` (200) para SPA routing

### DNS Configuration (GoDaddy)
- **CNAME:** `www` → `d3rskao5nrdvou.cloudfront.net`
- **Domain Forwarding:** `dygsom.pe` → `https://www.dygsom.pe`
- **TTL:** 1 Hour (3600 seconds)

### SSL Certificate (ACM)
- **Domain Names:** `dygsom.pe`, `www.dygsom.pe`, `*.dygsom.pe`
- **Validation:** DNS (CNAME records en GoDaddy)
- **Status:** Issued
- **Renewal:** Automática por AWS

## 🔒 Seguridad y Mejores Prácticas

### Principios Implementados

1. **Least Privilege**: Usuario IAM solo con permisos necesarios
2. **HTTPS Only**: Todo el tráfico redirigido a HTTPS
3. **Public Read, No Write**: Bucket S3 permite solo lectura pública
4. **Automated Deployments**: Scripts validados y seguros
5. **Cache Invalidation**: Limpieza automática post-deploy
6. **SSL/TLS**: Certificado gratuito con renovación automática

### Headers de Seguridad

Configurados en CloudFront:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`

### Estrategia de Cache

**Assets estáticos** (JS, CSS, imágenes):
```
Cache-Control: public, max-age=31536000
```
- Cache de 1 año
- Vite genera hashes en nombres de archivo
- Cache seguro por versionado automático

**HTML y favicon**:
```
Cache-Control: no-cache
```
- Siempre se valida con servidor
- Permite actualizaciones inmediatas
- Mejor UX para cambios frecuentes

## 📊 Monitoreo y Logs

### CloudWatch Metrics (Disponibles)
- CloudFront requests
- CloudFront data transfer
- CloudFront error rates
- S3 storage metrics

### Logs Disponibles
- **CloudFront Access Logs**: Habilitables en distribución
- **S3 Access Logs**: Habilitables en bucket properties

### Comandos Útiles

```bash
# Ver tamaño actual del bucket
aws s3 ls s3://dygsom-landing-page-dev --recursive --human-readable --summarize

# Listar archivos en S3
aws s3 ls s3://dygsom-landing-page-dev/ --profile dygsom-dev

# Ver estado de CloudFront
aws cloudfront get-distribution --id E8UFMILPM5WIL --profile dygsom-dev

# Crear invalidación manual
aws cloudfront create-invalidation \
  --distribution-id E8UFMILPM5WIL \
  --paths "/*" \
  --profile dygsom-dev
```

## 🆘 Troubleshooting

### Problema: Sitio no actualiza después de deploy

**Solución:**
```powershell
# Invalidar cache CloudFront
aws cloudfront create-invalidation `
  --distribution-id E8UFMILPM5WIL `
  --paths "/*" `
  --profile dygsom-dev

# Limpiar cache local
ipconfig /flushdns
```

### Problema: Error 403 en rutas de React

**Solución:**
Verificar que CloudFront tenga configuradas las Custom Error Responses:
- 403 → `/index.html` (200)
- 404 → `/index.html` (200)

### Problema: SSL/TLS error

**Solución:**
1. Verificar certificado en ACM (debe estar "Issued")
2. Verificar CNAMEs en CloudFront distribution
3. Verificar CNAME en DNS apunta al dominio CloudFront correcto

### Problema: Deploy script falla

**Solución:**
```bash
# Verificar AWS CLI configurado
aws sts get-caller-identity --profile dygsom-dev

# Verificar permisos
aws s3 ls s3://dygsom-landing-page-dev --profile dygsom-dev

# Verificar Node.js y build
npm run build
```

## 📚 Recursos Adicionales

- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [ACM Certificate Validation](https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html)
- [Vite Production Build](https://vitejs.dev/guide/build.html)

## 🔄 Historial de Cambios

### 2025-11-23
- ✅ CloudFront distribution E8UFMILPM5WIL activada
- ✅ Dominio www.dygsom.pe configurado y funcionando
- ✅ SSL/TLS habilitado vía ACM
- ✅ Scripts de deploy actualizados con invalidación CloudFront
- ✅ Documentación actualizada con infraestructura real

---

**Última actualización:** 23 de Noviembre, 2025  
**Mantenido por:** Equipo DYGSOM
- **Nunca** commitear credenciales AWS en estos archivos
- Las políticas siguen el principio de **mínimo privilegio**
- El bucket policy solo permite lectura pública, no escritura
- Usar variables de entorno para información sensible

## 📊 Configuración del Bucket

**Nombre:** `dygsom-landing-page-dev`  
**Región:** `us-east-1` (N. Virginia)  
**Tipo:** Static Website Hosting  
**Index document:** `index.html`  
**Error document:** `index.html` (para SPA routing)

## 🔗 URLs

- **S3 Website:** http://dygsom-landing-page-dev.s3-website-us-east-1.amazonaws.com
- **S3 Console:** https://console.aws.amazon.com/s3/
- **IAM Console:** https://console.aws.amazon.com/iam/

## 📝 Notas

- Los scripts eliminan archivos obsoletos con `--delete`
- Assets (JS/CSS/imágenes) tienen cache de 1 año
- HTML y favicon sin cache para actualizaciones inmediatas
- Todos los comandos incluyen validación de errores

## 🆘 Soporte

Para instrucciones detalladas, consulta [DEPLOYMENT.md](../DEPLOYMENT.md) en la raíz del proyecto.
