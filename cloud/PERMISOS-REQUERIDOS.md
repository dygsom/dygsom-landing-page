# Permisos IAM Requeridos - DYGSOM Landing

**Ultima actualizacion:** 2026-02-15

---

## 1. Objetivo

Definir permisos minimos para el usuario de despliegue (ej. `dygsom-landing-deploy-user`) para:
- subir build a S3,
- invalidar CloudFront,
- y actualizar policy de security headers.

---

## 2. Recomendacion de asignacion

Para evitar limite de caracteres en inline policy:
1. crear **managed policy dedicada** para landing,
2. adjuntarla al usuario de despliegue,
3. no mezclarla con politicas de otros proyectos.

Archivo de referencia JSON: `cloud/iam-policy.json`.

---

## 3. Permisos minimos por capacidad

## 3.1 S3 (deploy)
- `s3:ListBucket`
- `s3:GetObject`
- `s3:PutObject`
- `s3:DeleteObject`
- `s3:GetBucketLocation`

Recursos:
- `arn:aws:s3:::dygsom-landing-page-dev`
- `arn:aws:s3:::dygsom-landing-page-dev/*`

## 3.2 CloudFront (operacion)
- `cloudfront:CreateInvalidation`
- `cloudfront:GetDistributionConfig`
- `cloudfront:UpdateDistribution`
- `cloudfront:ListResponseHeadersPolicies`
- `cloudfront:GetResponseHeadersPolicy`
- `cloudfront:GetResponseHeadersPolicyConfig`
- `cloudfront:CreateResponseHeadersPolicy`
- `cloudfront:UpdateResponseHeadersPolicy`

Recurso: `"*"` (CloudFront generalmente requiere scope global para estas acciones).

---

## 4. Policy de ejemplo (managed policy dedicada)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DygsomLandingS3Deploy",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:GetBucketLocation"
      ],
      "Resource": [
        "arn:aws:s3:::dygsom-landing-page-dev",
        "arn:aws:s3:::dygsom-landing-page-dev/*"
      ]
    },
    {
      "Sid": "DygsomLandingCloudFrontOps",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetDistributionConfig",
        "cloudfront:UpdateDistribution",
        "cloudfront:ListResponseHeadersPolicies",
        "cloudfront:GetResponseHeadersPolicy",
        "cloudfront:GetResponseHeadersPolicyConfig",
        "cloudfront:CreateResponseHeadersPolicy",
        "cloudfront:UpdateResponseHeadersPolicy"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## 5. Verificacion de permisos

Comandos recomendados:

```bash
aws sts get-caller-identity --profile dygsom-dev
aws s3 ls s3://dygsom-landing-page-dev --profile dygsom-dev
aws cloudfront get-distribution-config --id E8UFMILPM5WIL --profile dygsom-dev
```

Si falla alguno:
1. revisar profile AWS,
2. validar usuario IAM activo,
3. confirmar que la policy dedicada esta adjunta.

---

## 6. Nota sobre costo

Agregar estos permisos IAM **no genera costo directo**.
El costo proviene del uso de servicios (S3, CloudFront, API Gateway, Lambda), no del permiso en si.

