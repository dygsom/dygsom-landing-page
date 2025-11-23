# 🔐 Permisos IAM Requeridos para Despliegue

## ❌ Error Actual

```
fatal error: An error occurred (AccessDenied) when calling the ListObjectsV2 operation: Access Denied
```

**Usuario actual:** `admin` (Account: 270801937660)  
**Bucket:** `dygsom-landing-page-dev`

## ✅ Solución

Tu usuario IAM necesita permisos adicionales para desplegar al bucket S3.

---

## 📋 Permisos Necesarios

El archivo `cloud/iam-policy.json` contiene la política completa. Necesitas estos permisos:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DygsomS3DeploymentPermissions",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",          // Subir archivos
        "s3:GetObject",          // Leer archivos
        "s3:DeleteObject",       // Eliminar archivos obsoletos
        "s3:ListBucket",         // Listar contenido (FALTA ESTE)
        "s3:PutBucketWebsite",   // Configurar website hosting
        "s3:PutBucketPolicy",    // Aplicar políticas
        "s3:GetBucketLocation"   // Obtener región
      ],
      "Resource": [
        "arn:aws:s3:::dygsom-landing-page-dev",
        "arn:aws:s3:::dygsom-landing-page-dev/*"
      ]
    }
  ]
}
```

---

## 🛠️ Pasos para Aplicar Permisos

### Opción 1: Política Personalizada (Recomendado - Seguridad)

**Solicitar a un administrador de AWS:**

1. **Ir a IAM Console:**  
   https://console.aws.amazon.com/iam/

2. **Crear la política:**
   - Clic en **"Policies"** en el menú lateral
   - Clic en **"Create policy"**
   - Seleccionar pestaña **"JSON"**
   - Copiar y pegar el contenido de `cloud/iam-policy.json`
   - Clic en **"Next"**
   - **Nombre de la política:** `DygsomS3DeploymentPolicy`
   - **Descripción:** `Permisos para desplegar landing page a S3`
   - Clic en **"Create policy"**

3. **Adjuntar al usuario:**
   - Ir a **"Users"** en el menú lateral
   - Buscar y seleccionar usuario: **`admin`**
   - Ir a pestaña **"Permissions"**
   - Clic en **"Add permissions"** → **"Attach policies directly"**
   - Buscar: `DygsomS3DeploymentPolicy`
   - Seleccionar y clic en **"Add permissions"**

4. **Verificar:**
   ```powershell
   aws s3 ls s3://dygsom-landing-page-dev
   ```
   Si ya no sale error, los permisos están correctos.

---

### Opción 2: Política Administrada AWS (Rápido - Menos Seguro)

**Solo para desarrollo:**

1. Ir a **IAM Console** → **Users** → **`admin`**
2. Pestaña **"Permissions"**
3. Clic en **"Add permissions"** → **"Attach policies directly"**
4. Buscar y seleccionar: **`AmazonS3FullAccess`**
5. Clic en **"Add permissions"**

⚠️ **Advertencia:** Esta política da acceso completo a TODOS los buckets S3, no solo a `dygsom-landing-page-dev`.

---

## 🔄 Después de Aplicar Permisos

Una vez que tengas los permisos, ejecuta el despliegue:

```powershell
# Desplegar usando el script
.\cloud\deploy-s3.ps1

# O manualmente:
npm run build
aws s3 sync dist/ s3://dygsom-landing-page-dev --delete
```

---

## ✅ Verificación de Permisos

Para verificar que tienes los permisos correctos:

```powershell
# 1. Verificar identidad
aws sts get-caller-identity

# 2. Intentar listar bucket (debe funcionar)
aws s3 ls s3://dygsom-landing-page-dev

# 3. Intentar subir archivo de prueba
echo "test" > test.txt
aws s3 cp test.txt s3://dygsom-landing-page-dev/test.txt
aws s3 rm s3://dygsom-landing-page-dev/test.txt
Remove-Item test.txt
```

Si todos los comandos funcionan sin errores, ¡estás listo para desplegar! 🚀

---

## 📞 Contacto

Si necesitas ayuda con los permisos, contacta al administrador de AWS de tu organización con:

- **Usuario IAM:** `admin` (Account: 440744239014)
- **Bucket:** `arn:aws:s3:::dygsom-landing-page-dev`
- **Archivo de política:** `cloud/iam-policy.json`
- **Política recomendada:** `DygsomS3DeploymentPolicy` (personalizada) o `AmazonS3FullAccess` (administrada)
