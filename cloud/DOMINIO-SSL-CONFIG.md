# 🌐 Configuración de Dominio y SSL para DYGSOM

Esta guía detalla cómo configurar el dominio `dygsom.pe` (comprado en GoDaddy) con AWS CloudFront y certificado SSL gratuito.

---

## 📋 Tabla de Contenidos

1. [Arquitectura de la Solución](#arquitectura-de-la-solución)
2. [Servicios AWS Requeridos](#servicios-aws-requeridos)
3. [Costos Estimados](#costos-estimados)
4. [Paso 1: Solicitar Certificado SSL](#paso-1-solicitar-certificado-ssl)
5. [Paso 2: Configurar CloudFront](#paso-2-configurar-cloudfront)
6. [Paso 3: Configurar DNS en GoDaddy](#paso-3-configurar-dns-en-godaddy)
7. [Paso 4: Verificación](#paso-4-verificación)
8. [Troubleshooting](#troubleshooting)

---

## Arquitectura de la Solución

```
Usuario
   ↓
dygsom.pe (GoDaddy DNS)
   ↓
CloudFront (CDN + HTTPS)
   ↓
S3 Bucket (dygsom-landing-page-dev)
```

**Ventajas**:
- ✅ HTTPS gratuito con AWS Certificate Manager
- ✅ CDN global (mejor rendimiento)
- ✅ Protección DDoS básica incluida
- ✅ Cache inteligente
- ✅ Compresión automática

---

## Servicios AWS Requeridos

### 1. AWS Certificate Manager (ACM)
- **Función**: Proporcionar certificado SSL/TLS gratuito
- **Región requerida**: `us-east-1` (obligatorio para CloudFront)
- **Costo**: **GRATIS** ✅

### 2. Amazon CloudFront
- **Función**: CDN que distribuye el contenido globalmente con HTTPS
- **Capa gratuita**: 1 TB/mes de transferencia de datos durante 12 meses
- **Costo después de capa gratuita**: Ver tabla de costos

### 3. Amazon S3
- **Función**: Almacenamiento del sitio web estático
- **Costo**: Muy bajo (ver tabla de costos)

### 4. Amazon Route 53 (Opcional)
- **Función**: DNS administrado por AWS (alternativa a GoDaddy DNS)
- **Costo**: $0.50/mes por zona hospedada
- **Nota**: NO es necesario si usas DNS de GoDaddy

---

## Costos Estimados

### 💰 Tabla de Costos AWS

| Servicio | Componente | Costo | Notas |
|----------|-----------|-------|-------|
| **ACM** | Certificado SSL | **$0.00** | ✅ Completamente gratis |
| **S3** | Almacenamiento | ~$0.023/GB/mes | Landing page ~2-5 MB ≈ **$0.01/mes** |
| **S3** | Solicitudes PUT/COPY | $0.005 por 1,000 | Despliegue 1x/semana ≈ **$0.00** |
| **S3** | Solicitudes GET | $0.0004 por 1,000 | Covered por CloudFront |
| **CloudFront** | Transferencia (0-10 TB) | $0.085/GB | Primeros 1 TB gratis año 1 |
| **CloudFront** | Solicitudes HTTPS | $0.010 por 10,000 | Incluido en capa gratuita |
| **CloudFront** | Invalidaciones cache | Gratis primeras 1,000/mes | $0.005 después |
| **Route 53** | Zona hospedada | $0.50/mes | ⚠️ OPCIONAL (puedes usar GoDaddy) |
| **Route 53** | Consultas DNS | $0.40 por millón | Solo si usas Route 53 |

### 📊 Escenarios de Costo

#### Escenario 1: Sin Route 53 (Recomendado Inicialmente)
**Configuración**: GoDaddy DNS → CloudFront → S3

| Mes | Tráfico Estimado | Costo CloudFront | Costo S3 | **Total** |
|-----|------------------|------------------|----------|-----------|
| 1-12 | < 1 TB/mes | **$0.00** (capa gratuita) | $0.01 | **~$0.01/mes** ✅ |
| 13+ | 100 GB/mes | $8.50 | $0.01 | **~$8.51/mes** |
| 13+ | 500 GB/mes | $42.50 | $0.01 | **~$42.51/mes** |

#### Escenario 2: Con Route 53
**Configuración**: Route 53 → CloudFront → S3

| Mes | Tráfico Estimado | CloudFront | S3 | Route 53 | **Total** |
|-----|------------------|------------|-----|----------|-----------|
| 1-12 | < 1 TB/mes | $0.00 | $0.01 | $0.50 | **~$0.51/mes** |
| 13+ | 100 GB/mes | $8.50 | $0.01 | $0.50 | **~$9.01/mes** |

### 🎯 Recomendación

**Fase Inicial**: Usar GoDaddy DNS (sin Route 53)
- **Costo**: ~$0.01/mes durante el primer año
- **Ahorro**: $0.50/mes

**Migrar a Route 53 cuando**:
- Necesites healthchecks avanzados
- Requieras geolocalización de tráfico
- Quieras automatización completa de DNS

---

## Paso 1: Solicitar Certificado SSL

### 1.1. Acceder a AWS Certificate Manager

> ⚠️ **IMPORTANTE**: Debes solicitar el certificado en la región **us-east-1** (N. Virginia) para que funcione con CloudFront.

1. Ir a [AWS Certificate Manager](https://console.aws.amazon.com/acm/home?region=us-east-1)
2. Verificar que estás en región **us-east-1** (arriba a la derecha)
3. Clic en **"Request a certificate"**

### 1.2. Configurar el Certificado

1. Seleccionar **"Request a public certificate"** → **"Next"**

2. **Fully qualified domain names**:
   - Agregar: `dygsom.pe`
   - Clic en **"Add another name to this certificate"**
   - Agregar: `www.dygsom.pe`
   - *(Esto permite que funcione con y sin www)*

3. **Validation method**: Seleccionar **"DNS validation"** (recomendado)
   - ✅ Más rápido que validación por email
   - ✅ Se renueva automáticamente

4. **Key algorithm**: Dejar **"RSA 2048"** (default)

5. Clic en **"Request"**

### 1.3. Validar el Certificado

AWS te proporcionará registros DNS CNAME que debes agregar en GoDaddy.

1. En la pantalla de certificados, clic en el ID del certificado recién creado
2. En la sección **"Domains"**, verás algo como:

```
Name: _abc123def456.dygsom.pe
Value: _xyz789uvw012.acm-validations.aws.
```

3. **Abrir GoDaddy DNS** en otra pestaña (siguiente paso)

---

## Paso 2: Configurar DNS en GoDaddy (Validación)

### 2.1. Acceder a Gestión de DNS

1. Ir a [GoDaddy Domain Manager](https://dcc.godaddy.com/manage/dygsom.pe/dns)
2. Iniciar sesión con tu cuenta de GoDaddy
3. Buscar tu dominio: `dygsom.pe`
4. Clic en el dominio → **"Manage DNS"** o **"DNS"**

### 2.2. Agregar Registro CNAME para Validación

> ⚠️ **IMPORTANTE - Error Común en GoDaddy**: GoDaddy agrega automáticamente el dominio al final del campo "Name/Host". Por lo tanto, debes **eliminar** `.dygsom.pe` del nombre que te da AWS.

**Ejemplo de AWS ACM:**
```
CNAME name: _10b9618b57c796c88231eef7bb0e1030.dygsom.pe.
```

**En GoDaddy debes poner:**
```
Name/Host: _10b9618b57c796c88231eef7bb0e1030
```
*(GoDaddy agregará automáticamente .dygsom.pe, resultando en el nombre correcto)*

#### Pasos en GoDaddy:

1. Scroll hasta la sección **"Records"**
2. Clic en **"Add"** o **"Add Record"**
3. Configurar:
   - **Type**: `CNAME`
   - **Name/Host**: `_abc123def456` ⚠️ **SIN** `.dygsom.pe` al final
   - **Value/Points to**: `_xyz789uvw012.acm-validations.aws.` (copiar completo de AWS ACM)
   - **TTL**: `1 Hour` (o dejar default)
4. Clic en **"Save"**

#### ❌ Error Común:
Si pones `_abc123def456.dygsom.pe` en el campo Name, GoDaddy lo convierte en:
```
_abc123def456.dygsom.pe.dygsom.pe  ❌ INCORRECTO
```
Y AWS nunca podrá validar el certificado.

#### ✅ Correcto:
Solo pon `_abc123def456` y GoDaddy automáticamente agregará `.dygsom.pe`:
```
_abc123def456.dygsom.pe  ✅ CORRECTO
```

**Referencia oficial**: [AWS Documentation - GoDaddy DNS Validation](https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html)

### 2.3. Esperar Validación

- Tiempo estimado: **5-30 minutos**
- En AWS ACM, el estado cambiará de `Pending validation` a **`Issued`** ✅
- Puedes actualizar la página cada 5 minutos para verificar

---

## Paso 3: Configurar CloudFront

### 3.1. Crear Distribución CloudFront

1. Ir a [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Clic en **"Create distribution"**

### 3.2. Configurar Origin

#### Origin domain:
⚠️ **IMPORTANTE**: NO selecciones el bucket S3 del dropdown. Debes usar el **website endpoint**.

```
dygsom-landing-page-dev.s3-website-us-east-1.amazonaws.com
```

*(Este endpoint permite que funcione como sitio web con index.html)*

#### Origin settings:
- **Protocol**: `HTTP only` (S3 website endpoint no soporta HTTPS)
- **Name**: Dejar el auto-generado
- **Enable Origin Shield**: `No`

### 3.3. Configurar Default Cache Behavior

- **Viewer protocol policy**: **`Redirect HTTP to HTTPS`** ✅
- **Allowed HTTP methods**: `GET, HEAD, OPTIONS`
- **Cache policy**: `CachingOptimized`
- **Origin request policy**: `CORS-S3Origin` (si usas CORS)
- **Response headers policy**: `SimpleCORS` (opcional)

### 3.4. Configurar Settings

#### Alternate domain names (CNAMEs):
Agregar ambos dominios:
```
dygsom.pe
www.dygsom.pe
```

#### Custom SSL certificate:
- Seleccionar el certificado que creaste en ACM
- Debe mostrar: `dygsom.pe (arn:aws:acm:us-east-1:...)`

#### Default root object:
```
index.html
```

#### WAF (Web Application Firewall):
- **Do not enable security protections** (para evitar costos)
- *(Opcional para fase inicial)*

### 3.5. Crear la Distribución

1. Clic en **"Create distribution"**
2. Esperar **10-15 minutos** mientras se despliega
3. Estado cambiará de `Deploying` a **`Enabled`** ✅

### 3.6. Configurar Error Pages (Para SPA Routing)

Esto permite que las rutas de React Router funcionen correctamente.

1. En tu distribución, ir a pestaña **"Error pages"**
2. Clic en **"Create custom error response"**
3. Configurar para error 404:
   - **HTTP error code**: `404: Not Found`
   - **Customize error response**: `Yes`
   - **Response page path**: `/index.html`
   - **HTTP response code**: `200: OK`
4. Clic en **"Create custom error response"**
5. **Repetir para error 403**:
   - **HTTP error code**: `403: Forbidden`
   - **Response page path**: `/index.html`
   - **HTTP response code**: `200: OK`

### 3.7. Copiar el Domain Name de CloudFront

En la lista de distribuciones, copiar el **"Distribution domain name"**:
```
d1234abcdefg.cloudfront.net
```

Lo necesitarás para configurar DNS en GoDaddy.

---

## Paso 4: Configurar DNS en GoDaddy (Dominio Principal)

### 4.1. Eliminar Registros Conflictivos

1. En GoDaddy DNS Manager, buscar registros existentes:
   - Registros **A** que apunten a `dygsom.pe` o `www.dygsom.pe`
   - Registros **CNAME** existentes para `www`
2. **Eliminarlos** (click en ícono de papelera)

### 4.2. Configurar Dominio Principal (dygsom.pe)

#### Opción A: CNAME Flattening (Si GoDaddy lo soporta)
```
Type: CNAME
Name: @
Value: d1234abcdefg.cloudfront.net
TTL: 1 Hour
```

#### Opción B: ALIAS (Si no funciona CNAME)

GoDaddy no soporta registros ALIAS nativamente, así que necesitas:

1. **Opción Simple**: Usar un servicio de forwarding:
   - En GoDaddy, ir a **"Forwarding"**
   - Configurar `dygsom.pe` → `www.dygsom.pe` (301 redirect)
   - Luego solo configurar `www.dygsom.pe` con CNAME

2. **Opción Profesional**: Migrar DNS a Route 53 (costo: $0.50/mes)

### 4.3. Configurar Subdominio WWW

```
Type: CNAME
Name: www
Value: d1234abcdefg.cloudfront.net
TTL: 1 Hour
```

Clic en **"Save"**

### 4.4. Verificar Propagación DNS

```bash
# Verificar registro CNAME
nslookup www.dygsom.pe

# O usar herramienta online
# https://www.whatsmydns.net/#CNAME/www.dygsom.pe
```

Propagación completa: **15 minutos - 48 horas** (típicamente 1-2 horas)

---

## Paso 5: Actualizar Script de Despliegue

Después de cada despliegue, debes invalidar el cache de CloudFront.

### 5.1. Obtener Distribution ID

En CloudFront Console, copiar el **ID** de tu distribución (ej: `E1234567890ABC`)

### 5.2. Actualizar deploy-s3.ps1

Agregar al final del script:

```powershell
# Al final del archivo, antes del último if
$CLOUDFRONT_DISTRIBUTION_ID = "E1234567890ABC"  # Reemplazar con tu ID

if ($LASTEXITCODE -eq 0) {
    Write-Host "🔄 Invalidating CloudFront cache..." -ForegroundColor Cyan
    
    aws cloudfront create-invalidation `
      --profile $PROFILE `
      --distribution-id $CLOUDFRONT_DISTRIBUTION_ID `
      --paths "/*"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Deployment complete!" -ForegroundColor Green
        Write-Host "🌐 Site URL: https://dygsom.pe" -ForegroundColor Yellow
        Write-Host "🌐 Alternative: https://www.dygsom.pe" -ForegroundColor Yellow
    } else {
        Write-Host "⚠️  Deployment successful but cache invalidation failed" -ForegroundColor Yellow
        Write-Host "Run manually: aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths '/*'" -ForegroundColor Gray
    }
} else {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}
```

---

## Paso 6: Verificación

### 6.1. Checklist de Verificación

- [ ] Certificado SSL en estado **"Issued"** en ACM
- [ ] Distribución CloudFront en estado **"Enabled"**
- [ ] Error pages configuradas (403 y 404 → index.html)
- [ ] DNS en GoDaddy apuntando a CloudFront
- [ ] `https://dygsom.pe` carga correctamente
- [ ] `https://www.dygsom.pe` carga correctamente
- [ ] Candado verde de HTTPS visible en navegador
- [ ] Certificado válido (clic en candado → detalles)
- [ ] Todas las imágenes y recursos cargan correctamente
- [ ] Navegación entre secciones funciona
- [ ] Responsive design funciona en móvil

### 6.2. Herramientas de Verificación

```bash
# Verificar DNS
nslookup www.dygsom.pe

# Verificar HTTPS
curl -I https://dygsom.pe

# Test SSL
https://www.ssllabs.com/ssltest/analyze.html?d=dygsom.pe
```

### 6.3. Test en Navegador

1. Abrir: `https://dygsom.pe`
2. Verificar candado verde en barra de direcciones
3. Clic en candado → **"Connection is secure"**
4. Ver detalles del certificado:
   - Issued by: Amazon
   - Valid for: dygsom.pe, www.dygsom.pe

---

## Troubleshooting

### Error: Certificate not found in us-east-1

**Causa**: Certificado creado en región incorrecta.

**Solución**:
- CloudFront SOLO acepta certificados de `us-east-1`
- Eliminar certificado y crearlo nuevamente en us-east-1

### Error: CNAMEs already exist

**Causa**: El dominio ya está configurado en otra distribución CloudFront.

**Solución**:
```bash
# Buscar distribución existente
aws cloudfront list-distributions --profile dygsom-dev | grep dygsom.pe
```

### SSL/TLS certificate not validated

**Causa**: Registro CNAME de validación no agregado correctamente en GoDaddy.

**Solución**:
1. Verificar que el registro CNAME existe en GoDaddy
2. Verificar que el valor termina con punto final: `_xyz.acm-validations.aws.`
3. Esperar 30 minutos más

### CloudFront returns 403 Forbidden

**Causa**: Configuración incorrecta del origin.

**Solución**:
1. Verificar que usaste el **website endpoint** como origin
2. NO usar: `dygsom-landing-page-dev.s3.amazonaws.com`
3. SÍ usar: `dygsom-landing-page-dev.s3-website-us-east-1.amazonaws.com`

### Sitio no carga después de despliegue

**Causa**: Cache de CloudFront.

**Solución**:
```bash
# Invalidar cache
aws cloudfront create-invalidation \
  --profile dygsom-dev \
  --distribution-id E1234567890ABC \
  --paths "/*"
```

### GoDaddy no permite CNAME en root domain

**Causa**: Limitación de DNS estándar.

**Soluciones**:

1. **Opción 1**: Usar forwarding de GoDaddy
   - Configurar `dygsom.pe` → `www.dygsom.pe` (redirect 301)
   
2. **Opción 2**: Migrar DNS a Route 53
   - Costo: $0.50/mes
   - Permite usar ALIAS records en root domain

---

## Renovación Automática

✅ **Certificado SSL se renueva automáticamente**
- AWS ACM renueva certificados validados por DNS automáticamente
- No requiere acción manual
- Válido por 13 meses, se renueva a los 60 días antes de expirar

---

## Mejores Prácticas

### 1. Seguridad
- ✅ Siempre usar HTTPS (CloudFront redirige HTTP → HTTPS)
- ✅ Mantener certificado con validación DNS (se renueva solo)
- ✅ Habilitar WAF cuando tengas más tráfico

### 2. Rendimiento
- ✅ Configurar cache correctamente (assets largos, HTML corto)
- ✅ Invalidar cache solo cuando necesites (`/*` cuesta después de 1,000/mes)
- ✅ Usar compresión (CloudFront la habilita automáticamente)

### 3. Costos
- ✅ Monitorear uso mensual en AWS Billing Dashboard
- ✅ Configurar alertas de billing en $10, $50, $100
- ✅ Revisar métricas de CloudFront para optimizar

### 4. Monitoreo
- ✅ Configurar alarma de CloudWatch para errores 5xx
- ✅ Revisar logs de CloudFront (opcional, costo adicional)
- ✅ Usar Google Analytics para métricas de usuarios

---

## URLs Útiles

### Consolas AWS:
- **ACM**: https://console.aws.amazon.com/acm/home?region=us-east-1
- **CloudFront**: https://console.aws.amazon.com/cloudfront/
- **S3**: https://console.aws.amazon.com/s3/

### GoDaddy:
- **Domain Manager**: https://dcc.godaddy.com/
- **DNS Management**: https://dcc.godaddy.com/manage/dygsom.pe/dns

### Herramientas:
- **DNS Checker**: https://www.whatsmydns.net/
- **SSL Test**: https://www.ssllabs.com/ssltest/
- **CDN Test**: https://tools.keycdn.com/performance

---

## 📞 Soporte

Para dudas:
- **Email**: alicia.canta@dygsom.pe
- **Documentación CloudFront**: https://docs.aws.amazon.com/cloudfront/
- **Documentación ACM**: https://docs.aws.amazon.com/acm/
