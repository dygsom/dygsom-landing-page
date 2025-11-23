# 🚀 Guía de Despliegue a AWS S3

Esta guía detalla todos los pasos necesarios para desplegar la landing page de DYGSOM en AWS S3 como sitio web estático.

---

## 📋 Tabla de Contenidos

1. [Crear el Bucket S3](#paso-1-crear-el-bucket-s3)
2. [Configurar Política del Bucket](#paso-2-configurar-política-del-bucket)
3. [Instalar y Configurar AWS CLI](#paso-3-instalar-y-configurar-aws-cli)
4. [Configurar Permisos IAM](#paso-4-configurar-permisos-iam)
5. [Build y Despliegue](#paso-5-build-y-despliegue)
6. [Configurar CloudFront (Opcional)](#paso-6-configurar-cloudfront-opcional)
7. [Variables de Entorno](#paso-7-variables-de-entorno)
8. [Checklist de Despliegue](#checklist-de-despliegue)
9. [Troubleshooting](#troubleshooting)

---

## Paso 1: Crear el Bucket S3

### Opción A: Usando AWS Console

1. Ir a [AWS S3 Console](https://console.aws.amazon.com/s3/)
2. Clic en **"Create bucket"**
3. Configuración del bucket:
   - **Bucket name**: `dygsom-landing-page-dev` (debe ser único globalmente)
   - **Region**: Seleccionar región más cercana (ej: `us-east-1` para N. Virginia)
   - **Block Public Access**: DESMARCAR todas las opciones (necesario para sitio web público)
   - ⚠️ Confirmar que entiendes los riesgos de hacer el bucket público
4. Clic en **"Create bucket"**
5. Ir a la pestaña **"Properties"** del bucket
6. Scroll hasta **"Static website hosting"** y hacer clic en **"Edit"**
7. Habilitar **"Static website hosting"**
8. Configurar:
   - **Index document**: `index.html`
   - **Error document**: `index.html` (para SPA routing)
9. Guardar cambios

### Opción B: Usando AWS CLI

```bash
# El bucket ya existe (dygsom-landing-page-dev)
# Si necesitas crearlo de nuevo:
aws s3api create-bucket \
  --bucket dygsom-landing-page-dev \
  --region us-east-1

# Configurar como sitio web estático
aws s3 website s3://dygsom-landing-page-dev/ \
  --index-document index.html \
  --error-document index.html

# Desactivar bloqueo de acceso público
aws s3api put-public-access-block \
  --bucket dygsom-landing-page-dev \
  --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

---

## Paso 2: Configurar Política del Bucket

Para permitir acceso público de lectura, necesitas aplicar una política al bucket.

### Usando AWS Console

1. Ir al bucket en [S3 Console](https://console.aws.amazon.com/s3/)
2. Ir a la pestaña **"Permissions"**
3. Scroll hasta **"Bucket policy"** y clic en **"Edit"**
4. Pegar esta política (reemplaza el nombre del bucket si es diferente):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::dygsom-landing-page-dev/*"
    }
  ]
}
```

5. Clic en **"Save changes"**

### Usando AWS CLI

```bash
# Usar el archivo bucket-policy.json del proyecto
aws s3api put-bucket-policy \
  --bucket dygsom-landing-page-dev \
  --policy file://cloud/bucket-policy.json
```

---

## Paso 3: Instalar y Configurar AWS CLI

### Instalar AWS CLI

#### Windows (PowerShell como Administrador):
```powershell
# Descargar e instalar AWS CLI v2
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# Verificar instalación
aws --version
```

#### macOS:
```bash
# Usando Homebrew
brew install awscli

# O descargando el instalador
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

#### Linux:
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### Configurar Credenciales AWS

#### Paso 1: Crear Usuario IAM para Despliegue

1. Ir a [AWS IAM Console](https://console.aws.amazon.com/iam/)
2. En el menú lateral, clic en **"Users"** → **"Create user"**
3. Configurar usuario:
   - **User name**: `dygsom-landing-deploy-user` (o nombre descriptivo)
   - **Provide user access to AWS Management Console**: NO (solo CLI)
   - Clic en **"Next"**
4. **Permisos**: Por ahora omitir, se configurarán en el Paso 4
5. Clic en **"Create user"**

#### Paso 2: Generar Access Key

1. En la lista de usuarios, seleccionar **`dygsom-landing-deploy-user`**
2. Ir a la pestaña **"Security credentials"**
3. Scroll hasta **"Access keys"** → Clic en **"Create access key"**
4. Seleccionar **"Command Line Interface (CLI)"**
5. Marcar checkbox de confirmación → Clic en **"Next"**
6. (Opcional) Agregar descripción: `Despliegue DYGSOM Landing Page`
7. Clic en **"Create access key"**
8. ⚠️ **IMPORTANTE**: Guardar ambos valores de forma segura:
   - **Access Key ID**: `AKIAT...` (ejemplo)
   - **Secret Access Key**: Solo se muestra una vez, descarga el archivo CSV

#### Paso 3: Configurar Perfil AWS CLI

> **Buena práctica**: Usar perfiles nombrados en lugar del perfil `default` para evitar conflictos con otras cuentas AWS.

##### Windows PowerShell / macOS / Linux:
```bash
# Configurar perfil específico para DYGSOM
aws configure --profile dygsom-dev

# Te pedirá:
AWS Access Key ID [None]: <pegar Access Key ID del paso anterior>
AWS Secret Access Key [None]: <pegar Secret Access Key del paso anterior>
Default region name [None]: us-east-1
Default output format [None]: json
```

**Ubicación de archivos de configuración:**
- **Windows**: `C:\Users\<tu_usuario>\.aws\credentials` y `config`
- **Linux/macOS**: `~/.aws/credentials` y `config`

##### Verificar archivos generados:

**`~/.aws/credentials`** (contiene las credenciales):
```ini
[dygsom-dev]
aws_access_key_id = AKIAT6DINUTGACPNGZVEV
aws_secret_access_key = ********
```

**`~/.aws/config`** (contiene configuración regional):
```ini
[profile dygsom-dev]
region = us-east-1
output = json
```

#### Paso 4: Verificar Configuración

```bash
# Verificar identidad del perfil
aws sts get-caller-identity --profile dygsom-dev

# Debe mostrar:
# {
#     "UserId": "AIDAT...",
#     "Account": "270801937660",  ← Verificar que sea la cuenta correcta
#     "Arn": "arn:aws:iam::270801937660:user/dygsom-landing-deploy-user"
# }

# Listar buckets con el perfil
aws s3 ls --profile dygsom-dev

# Intentar acceder al bucket específico
aws s3 ls s3://dygsom-landing-page-dev --profile dygsom-dev
```

> **Nota**: Si el último comando falla con `AccessDenied`, continuar al Paso 4 para configurar permisos IAM.

---

## Paso 4: Configurar Permisos IAM

El usuario IAM que uses para el despliegue necesita permisos específicos.

### Opción A: Crear política personalizada (Recomendado)

1. Ir a [IAM Console](https://console.aws.amazon.com/iam/)
2. Ir a **"Policies"** → **"Create policy"**
3. Seleccionar **"JSON"** y pegar el contenido de `iam-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DygsomS3DeploymentPermissions",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:PutBucketWebsite",
        "s3:PutBucketPolicy",
        "s3:GetBucketLocation"
      ],
      "Resource": [
        "arn:aws:s3:::dygsom-landing-page-dev",
        "arn:aws:s3:::dygsom-landing-page-dev/*"
      ]
    }
  }
}
```

4. Clic en **"Next"**
5. Nombre: `DygsomS3DeploymentPolicy`
6. Clic en **"Create policy"**
7. Ir a **"Users"** → Tu usuario → **"Add permissions"** → **"Attach policies directly"**
8. Buscar `DygsomS3DeploymentPolicy` y adjuntarla

### Opción B: Política Administrada de AWS (⚠️ Solo Desarrollo)

**Advertencia**: Esta opción da acceso completo a **TODOS** los buckets S3 de la cuenta, no solo a `dygsom-landing-page-dev`. No recomendado para producción.

#### Pasos:

1. Ir a **IAM Console** → **"Users"** → **`dygsom-landing-deploy-user`**
2. Pestaña **"Permissions"** → **"Add permissions"**
3. Seleccionar **"Attach policies directly"**
4. Buscar: `AmazonS3FullAccess`
5. Seleccionar y clic en **"Add permissions"**

---

### Comparación de Opciones

| Característica | Opción A (Personalizada) | Opción B (S3FullAccess) |
|----------------|-------------------------|------------------------|
| **Seguridad** | ✅ Alta (mínimo privilegio) | ⚠️ Baja (acceso completo) |
| **Alcance** | Solo bucket específico | Todos los buckets S3 |
| **Producción** | ✅ Recomendado | ❌ No recomendado |
| **Desarrollo** | ✅ Recomendado | ⚠️ Aceptable temporalmente |
| **Auditoría** | ✅ Trazable | ⚠️ Difícil de auditar |

---

## Paso 5: Build y Despliegue

> **Nota importante**: Todos los comandos AWS CLI deben incluir `--profile dygsom-dev` para usar las credenciales correctas.

### Despliegue Automático con Scripts

> **Recomendado**: Usar el script automatizado que incluye build, optimización de cache y validación.

#### Windows PowerShell:
```powershell
# Dar permisos de ejecución (primera vez)
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Ejecutar script (ya configurado con perfil dygsom-dev)
.\cloud\deploy-s3.ps1
```

#### Linux/macOS:
```bash
# Dar permisos de ejecución (primera vez)
chmod +x cloud/deploy-s3.sh

# Ejecutar script
./cloud/deploy-s3.sh
```

### Despliegue Manual

> **Importante**: Todos los comandos AWS CLI deben incluir `--profile dygsom-dev`.

```bash
# Paso 1: Build de producción
npm run build

# Paso 2: Subir archivos a S3 con optimización de cache
# Assets (JS, CSS, imágenes) con cache largo (1 año)
aws s3 sync dist/ s3://dygsom-landing-page-dev \
  --profile dygsom-dev \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html" \
  --exclude "favicon*.svg"

# HTML y favicon sin cache (para actualizaciones inmediatas)
aws s3 sync dist/ s3://dygsom-landing-page-dev \
  --profile dygsom-dev \
  --cache-control "no-cache" \
  --exclude "*" \
  --include "*.html" \
  --include "favicon*.svg"

# Paso 3: Verificar archivos subidos
aws s3 ls s3://dygsom-landing-page-dev/ --recursive --profile dygsom-dev
```

#### Explicación de la Estrategia de Cache:

- **Assets con hash** (`index-ZhaUFnG7.js`, `index-BjCWEle6.css`): Cache de 1 año
  - Vite genera nombres únicos por versión
  - Cambios en código → nuevo hash → nueva URL → no hay problema de cache
  
- **HTML y favicons**: Sin cache
  - Siempre se descargan frescos
  - Referencias a los assets se actualizan automáticamente

### URL del Sitio Web

Después del despliegue, tu sitio estará disponible en:
```
http://dygsom-landing-page-dev.s3-website-us-east-1.amazonaws.com
```

---

## Paso 6: Configurar CloudFront (Opcional)

CloudFront proporciona HTTPS, mejor rendimiento global y dominio personalizado.

### Crear Distribución CloudFront

#### Usando AWS Console:

1. Ir a [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Clic en **"Create distribution"**
3. Configuración:
   - **Origin domain**: Seleccionar tu bucket S3 endpoint (NO el bucket directo, usar el website endpoint)
   - **Origin domain**: `dygsom-landing-page-dev.s3-website-us-east-1.amazonaws.com`
   - **Viewer Protocol Policy**: Redirect HTTP to HTTPS
   - **Allowed HTTP Methods**: GET, HEAD, OPTIONS
   - **Cache Policy**: CachingOptimized
   - **Default Root Object**: `index.html`
4. Clic en **"Create distribution"**
5. Esperar 10-15 minutos a que se despliegue

#### Configurar Error Pages para SPA:

1. En la distribución, ir a **"Error pages"**
2. Clic en **"Create custom error response"**
3. Configurar:
   - **HTTP Error Code**: 404
   - **Customize Error Response**: Yes
   - **Response Page Path**: `/index.html`
   - **HTTP Response Code**: 200
4. Repetir para error 403

### Dominio Personalizado

Si tienes un dominio (ej: `www.dygsom.pe`):

1. Solicitar certificado SSL en [AWS Certificate Manager](https://console.aws.amazon.com/acm/) (región us-east-1)
2. En CloudFront, agregar **"Alternate domain names (CNAMEs)"**: `www.dygsom.pe`, `dygsom.pe`
3. Seleccionar el certificado SSL
4. En Route 53 o tu proveedor DNS:
   - Crear registro A/ALIAS apuntando a la distribución CloudFront
   - Para subdominios: Registro CNAME → `xxxxx.cloudfront.net`

---

## Paso 7: Variables de Entorno

Si necesitas diferentes configuraciones por ambiente:

### Archivo `.env.production`:
```env
VITE_API_URL=https://api.dygsom.pe
VITE_ENVIRONMENT=production
VITE_ENABLE_ANALYTICS=true
```

Las variables con prefijo `VITE_` están disponibles en el código:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 📋 Checklist de Despliegue

Antes de considerar completado el despliegue, verifica:

- [ ] Bucket S3 creado con nombre `dygsom-landing-page-dev`
- [ ] Sitio web estático habilitado en el bucket
- [ ] Política de bucket configurada (acceso público de lectura)
- [ ] "Block Public Access" desactivado en el bucket
- [ ] AWS CLI instalado y configurado correctamente
- [ ] Credenciales IAM funcionando (`aws sts get-caller-identity`)
- [ ] Usuario IAM con permisos S3 necesarios
- [ ] Build de producción exitoso (`npm run build`)
- [ ] Archivos subidos a S3 (`aws s3 ls s3://dygsom-landing-page-dev/`)
- [ ] URL del sitio web funcionando y mostrando la landing page
- [ ] Todas las imágenes y recursos cargando correctamente
- [ ] Navegación entre secciones funcional
- [ ] Responsive design funcionando en móviles
- [ ] (Opcional) CloudFront configurado para HTTPS
- [ ] (Opcional) Dominio personalizado configurado
- [ ] (Opcional) Certificado SSL activo

---

## 🔗 URLs Útiles

### Desarrollo:
- **Local**: http://localhost:5173

### Producción:
- **S3 Website**: http://dygsom-landing-page-dev.s3-website-us-east-1.amazonaws.com
- **CloudFront** (si aplica): https://xxxxx.cloudfront.net
- **Dominio Custom** (si aplica): https://www.dygsom.pe

### Consolas AWS:
- **S3**: https://console.aws.amazon.com/s3/
- **CloudFront**: https://console.aws.amazon.com/cloudfront/
- **IAM**: https://console.aws.amazon.com/iam/
- **Route 53**: https://console.aws.amazon.com/route53/
- **Certificate Manager**: https://console.aws.amazon.com/acm/

---

## 🚨 Troubleshooting

### Error: Access Denied al visitar el sitio

**Causa**: El bucket no tiene acceso público configurado.

**Solución**:
1. Verificar que "Block Public Access" está desactivado
2. Verificar que la política del bucket está aplicada correctamente
3. Verificar que la política incluye `"Resource": "arn:aws:s3:::dygsom-landing-page-dev/*"`

```bash
# Verificar política actual
aws s3api get-bucket-policy --bucket dygsom-landing-page-dev

# Re-aplicar política
aws s3api put-bucket-policy --bucket dygsom-landing-page-dev --policy file://cloud/bucket-policy.json
```

### Error: NoSuchBucket

**Causa**: El nombre del bucket es incorrecto o no existe en la región.

**Solución**:
```bash
# Verificar que el bucket existe
aws s3 ls | grep dygsom-landing-page-dev

# Verificar región del bucket
aws s3api get-bucket-location --bucket dygsom-landing-page-dev
```

### Error: InvalidAccessKeyId

**Causa**: Credenciales AWS incorrectas o expiradas.

**Solución**:
```bash
# Verificar configuración actual
aws configure list

# Reconfigurar credenciales
aws configure

# Probar credenciales
aws sts get-caller-identity
```

### Archivos no actualizan en el navegador

**Causa**: Cache del navegador o CloudFront.

**Solución**:
1. **Cache del navegador**: Hard refresh (Ctrl+F5 o Cmd+Shift+R)
2. **CloudFront**: Invalidar cache
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id E1234567890ABC \
     --paths "/*"
   ```
3. **Verificar headers**: Los archivos HTML deben tener `cache-control: no-cache`

### Error: An error occurred (AccessDenied) when calling the PutObject operation

**Causa**: El usuario IAM no tiene permisos para subir archivos.

**Solución**:
1. Verificar que la política IAM está adjunta al usuario
2. Verificar que la política incluye `s3:PutObject`
3. Aplicar la política desde `iam-policy.json`

### Sitio funciona en S3 pero no en CloudFront

**Causa**: CloudFront no está configurado para manejar SPA routing.

**Solución**:
1. Configurar error pages personalizadas (404 → index.html con código 200)
2. Invalidar cache de CloudFront después de cada despliegue

### Build falla con errores de TypeScript

**Causa**: Errores de tipo en el código.

**Solución**:
```bash
# Verificar errores
npm run build

# Ver errores en detalle
npx tsc --noEmit
```

---

## 🔄 Actualización del Sitio

Cada vez que hagas cambios:

```bash
# 1. Verificar cambios localmente
npm run dev

# 2. Build de producción
npm run build

# 3. Desplegar
./cloud/deploy-s3.ps1  # Windows
# o
./cloud/deploy-s3.sh   # Linux/macOS

# 4. (Si usas CloudFront) Invalidar cache
aws cloudfront create-invalidation \
  --distribution-id E1234567890ABC \
  --paths "/*"
```

---

## 📊 Monitoreo y Costos

### Costos Estimados:
- **S3**: ~$0.023/GB almacenado + ~$0.09/GB transferido
- **CloudFront**: Gratis hasta 1TB/mes en el primer año (capa gratuita)
- **Route 53**: ~$0.50/mes por zona hospedada

Para un sitio estático pequeño: **< $5/mes**

### Monitoreo:
```bash
# Ver tamaño del bucket
aws s3 ls s3://dygsom-landing-page-dev/ --recursive --summarize

# Ver métricas de CloudFront (últimas 24h)
aws cloudfront get-distribution-config --id E1234567890ABC
```

---

## 🎯 Mejores Prácticas

1. **Versionado**: Usar Git tags para releases
2. **Cache**: Optimizar headers de cache (assets con hash en nombre)
3. **Compresión**: Habilitar compresión gzip en CloudFront
4. **Seguridad**: Usar HTTPS siempre (CloudFront)
5. **Monitoring**: Configurar alarmas en CloudWatch
6. **Backup**: Habilitar versionado en S3 para rollback
7. **CI/CD**: Automatizar despliegue con GitHub Actions o GitLab CI

---

## 📞 Soporte

Para dudas sobre el despliegue:
- **Email**: alicia.canta@dygsom.pe
- **Documentación AWS S3**: https://docs.aws.amazon.com/s3/
- **Documentación CloudFront**: https://docs.aws.amazon.com/cloudfront/
