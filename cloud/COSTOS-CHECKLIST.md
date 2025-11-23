# 📊 Checklist de Servicios y Costos AWS - DYGSOM

Seguimiento de servicios utilizados y costos asociados para el proyecto DYGSOM Landing Page.

---

## 🎯 Resumen Ejecutivo

| Estado Actual | Detalles |
|--------------|----------|
| **Proyecto** | DYGSOM Landing Page |
| **Dominio** | dygsom.pe (GoDaddy) |
| **Ambiente** | Desarrollo/Producción |
| **Cuenta AWS** | 270801937660 |
| **Región Principal** | us-east-1 (N. Virginia) |

---

## ✅ Checklist de Implementación

### Fase 1: Configuración Básica (Completado ✅)

- [x] **S3 Bucket creado**
  - Nombre: `dygsom-landing-page-dev`
  - Static website hosting: Habilitado
  - Bucket policy: Configurada
  - Costo mensual: ~$0.01

- [x] **Usuario IAM configurado**
  - Usuario: `dygsom-landing-deploy-user`
  - Política: `DygsomS3DeploymentPolicy`
  - Access Keys: Configuradas
  - Costo: **GRATIS** ✅

- [x] **AWS CLI configurado**
  - Perfil: `dygsom-dev`
  - Región: `us-east-1`
  - Credenciales: Verificadas
  - Costo: **GRATIS** ✅

- [x] **Primer despliegue exitoso**
  - Build: Completado
  - Upload a S3: Exitoso
  - URL: http://dygsom-landing-page-dev.s3-website-us-east-1.amazonaws.com
  - Costo: Incluido en S3

---

### Fase 2: Dominio y SSL (Pendiente ⏳)

- [ ] **AWS Certificate Manager (ACM)**
  - [ ] Certificado solicitado para `dygsom.pe` y `www.dygsom.pe`
  - [ ] Región: us-east-1 (obligatorio)
  - [ ] Validación DNS configurada en GoDaddy
  - [ ] Estado: `Issued` ✅
  - **Costo**: **$0.00 GRATIS** ✅

- [ ] **Amazon CloudFront**
  - [ ] Distribución creada
  - [ ] Origin: S3 website endpoint configurado
  - [ ] Certificado SSL adjuntado
  - [ ] CNAMEs: dygsom.pe, www.dygsom.pe
  - [ ] Error pages configuradas (403, 404)
  - [ ] Cache policy optimizada
  - **Costo Año 1**: **$0.00** (capa gratuita 1 TB/mes) ✅
  - **Costo Año 2+**: Variable según tráfico

- [ ] **DNS en GoDaddy**
  - [ ] Registro CNAME para validación SSL
  - [ ] Registro CNAME para `www.dygsom.pe`
  - [ ] Forwarding de `dygsom.pe` → `www.dygsom.pe` (opcional)
  - **Costo**: Incluido en dominio GoDaddy

---

### Fase 3: Optimización (Opcional)

- [ ] **Amazon Route 53** (⚠️ Opcional - $0.50/mes)
  - [ ] Zona hospedada creada
  - [ ] Registros NS actualizados en GoDaddy
  - [ ] Healthchecks configurados
  - **Costo**: $0.50/mes zona + $0.40 por millón de consultas

- [ ] **AWS WAF** (⚠️ Opcional - Costos adicionales)
  - [ ] Web ACL creada
  - [ ] Reglas básicas configuradas
  - [ ] Adjuntada a CloudFront
  - **Costo**: $5.00/mes + $1.00 por millón de requests

- [ ] **CloudWatch Alarms**
  - [ ] Alarma para errores 5xx
  - [ ] Alarma para costos > $10
  - [ ] Notificaciones SNS configuradas
  - **Costo**: Primeras 10 alarmas gratis

---

## 💰 Tabla Detallada de Costos

### Costos Actuales (Fase 1)

| Servicio | Componente | Uso Actual | Costo Actual | Estado |
|----------|-----------|------------|--------------|--------|
| S3 | Almacenamiento | ~5 MB | $0.0001/mes | ✅ Activo |
| S3 | Requests PUT | ~50/mes | $0.0003/mes | ✅ Activo |
| IAM | Usuario + Política | N/A | $0.00 | ✅ Activo |
| **TOTAL MENSUAL** | | | **~$0.01** | |

---

### Costos Proyectados (Fase 2 - Con CloudFront)

#### Escenario: Primeros 12 Meses (Con Capa Gratuita)

| Servicio | Componente | Uso Estimado | Costo/Mes | Año 1 Total |
|----------|-----------|--------------|-----------|-------------|
| **ACM** | Certificado SSL | 1 certificado | **$0.00** | **$0.00** |
| **S3** | Almacenamiento | 5 MB | $0.0001 | $0.001 |
| **S3** | Requests | Mínimas (CloudFront cache) | $0.00 | $0.00 |
| **CloudFront** | Data Transfer | 0-1 TB/mes | **$0.00** ⭐ | **$0.00** |
| **CloudFront** | HTTPS Requests | 100K-1M/mes | **$0.00** ⭐ | **$0.00** |
| **CloudFront** | Invalidaciones | < 1,000/mes | **$0.00** | **$0.00** |
| | | | **Total/Mes** | **~$0.01** |
| | | | **Total Año** | **~$0.12** |

⭐ **Capa gratuita AWS**: 1 TB transferencia + 10M HTTPS requests por 12 meses

---

#### Escenario: Después del Año 1 (Sin Capa Gratuita)

**Tráfico Bajo** (100 visitas/día, 3,000/mes)

| Servicio | Uso Mensual | Costo |
|----------|-------------|-------|
| ACM | 1 certificado | $0.00 |
| S3 | 5 MB storage + requests | $0.01 |
| CloudFront | 10 GB transferencia | $0.85 |
| CloudFront | 100K HTTPS requests | $0.10 |
| CloudFront | 5 invalidaciones | $0.00 |
| **TOTAL** | | **~$0.96/mes** |

**Tráfico Medio** (500 visitas/día, 15,000/mes)

| Servicio | Uso Mensual | Costo |
|----------|-------------|-------|
| ACM | 1 certificado | $0.00 |
| S3 | 5 MB storage + requests | $0.01 |
| CloudFront | 50 GB transferencia | $4.25 |
| CloudFront | 500K HTTPS requests | $0.50 |
| CloudFront | 10 invalidaciones | $0.00 |
| **TOTAL** | | **~$4.76/mes** |

**Tráfico Alto** (2,000 visitas/día, 60,000/mes)

| Servicio | Uso Mensual | Costo |
|----------|-------------|-------|
| ACM | 1 certificado | $0.00 |
| S3 | 5 MB storage + requests | $0.01 |
| CloudFront | 200 GB transferencia | $17.00 |
| CloudFront | 2M HTTPS requests | $2.00 |
| CloudFront | 20 invalidaciones | $0.00 |
| **TOTAL** | | **~$19.01/mes** |

---

### Costos con Route 53 (Opcional)

Agregar a los costos anteriores:

| Componente | Costo |
|-----------|-------|
| Zona hospedada | $0.50/mes |
| Consultas DNS (primer millón) | $0.40/mes |
| **TOTAL ADICIONAL** | **+$0.90/mes** |

---

## 📈 Proyección de Costos Anuales

### Comparativa por Escenario

| Escenario | Mes 1-12 | Mes 13-24 | Año 1 | Año 2 |
|-----------|----------|-----------|-------|-------|
| **Solo S3** (sin dominio) | $0.01 | $0.01 | $0.12 | $0.12 |
| **CloudFront + SSL (Tráfico bajo)** | $0.01 | $0.96 | $0.12 | $11.52 |
| **CloudFront + SSL (Tráfico medio)** | $0.01 | $4.76 | $0.12 | $57.12 |
| **+ Route 53 (Tráfico bajo)** | $0.51 | $1.86 | $6.12 | $22.32 |
| **+ Route 53 (Tráfico medio)** | $0.51 | $5.66 | $6.12 | $67.92 |

---

## 🎯 Recomendaciones de Costos

### Fase de Lanzamiento (Meses 1-3)
**Configuración Recomendada**: CloudFront + SSL (sin Route 53)
- ✅ Aprovechar capa gratuita de CloudFront (12 meses)
- ✅ SSL gratuito con ACM
- ✅ Usar DNS de GoDaddy (sin costo adicional)
- **Costo estimado**: ~$0.01/mes

### Fase de Crecimiento (Meses 4-12)
**Configuración**: Mantener CloudFront + SSL
- ✅ Seguir en capa gratuita
- ✅ Monitorear métricas de uso
- ✅ Evaluar necesidad de Route 53 según tráfico
- **Costo estimado**: ~$0.01/mes

### Fase Estable (Año 2+)
**Configuración**: CloudFront + SSL + (Opcional) Route 53
- ⚠️ Capa gratuita termina después de 12 meses
- 📊 Evaluar migrar a Route 53 si se requiere:
  - Healthchecks
  - Geolocalización
  - Automatización DNS
- **Costo estimado**: $1-20/mes según tráfico

---

## 📊 Monitoreo y Alertas

### Configurar Alertas de Billing

```bash
# Crear alarma para costos > $10/mes
aws cloudwatch put-metric-alarm \
  --profile dygsom-dev \
  --alarm-name "DYGSOM-Billing-Alert-10USD" \
  --alarm-description "Alerta cuando costos superan $10" \
  --metric-name EstimatedCharges \
  --namespace AWS/Billing \
  --statistic Maximum \
  --period 86400 \
  --evaluation-periods 1 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold
```

### Dashboard de Costos

Acceder a: https://console.aws.amazon.com/billing/home

**Revisar mensualmente**:
- [ ] Cost Explorer
- [ ] Bills (detalle por servicio)
- [ ] Free Tier Usage
- [ ] Budgets

---

## 🔍 Métricas a Monitorear

### CloudFront
- **Data Transfer**: GB transferidos/mes
- **Requests**: Número de requests HTTPS
- **Cache Hit Ratio**: % de requests servidos desde cache (objetivo: > 80%)
- **4xx/5xx Errors**: Errores de cliente/servidor

### S3
- **Storage**: MB utilizados
- **Requests**: GET, PUT, DELETE
- **Data Transfer Out**: GB transferidos (debería ser mínimo con CloudFront)

### Costos
- **Billing por servicio**: S3, CloudFront, Route 53 (si aplica)
- **Comparación mes a mes**: Detectar incrementos anormales
- **Free Tier Usage**: Cuánto queda del tier gratuito

---

## 💡 Tips para Reducir Costos

### 1. Optimizar Cache de CloudFront
✅ **Impacto**: Reduce requests a S3 y transferencia de datos
```
Cache-Control: public, max-age=31536000  # Assets
Cache-Control: no-cache                  # HTML
```

### 2. Minimizar Invalidaciones
⚠️ **Impacto**: Primeras 1,000/mes gratis, después $0.005 cada una
- Solo invalidar cuando sea necesario
- Usar paths específicos en lugar de `/*` cuando sea posible

### 3. Comprimir Assets
✅ **Impacto**: Reduce transferencia de datos 50-70%
- Vite ya comprime automáticamente
- CloudFront comprime adicionalmente

### 4. Usar DNS de GoDaddy Inicialmente
✅ **Impacto**: Ahorro de $0.50/mes
- Migrar a Route 53 solo cuando se necesiten features avanzadas

### 5. Monitorear Free Tier
✅ **Impacto**: Evitar sorpresas al finalizar 12 meses
- Revisar mensualmente en AWS Console → Billing → Free Tier

---

## 📅 Calendario de Revisión

| Frecuencia | Actividad |
|------------|-----------|
| **Semanal** | Verificar métricas de CloudFront (cache hit ratio) |
| **Mensual** | Revisar costos en Billing Dashboard |
| **Mensual** | Verificar Free Tier Usage |
| **Trimestral** | Optimizar cache policies |
| **Anual** | Evaluar migración a Route 53 |
| **Anual** | Planear fin de Free Tier (mes 12) |

---

## 🎓 Recursos de Aprendizaje

### Calculadoras de Costos
- **AWS Pricing Calculator**: https://calculator.aws/
- **CloudFront Pricing**: https://aws.amazon.com/cloudfront/pricing/
- **S3 Pricing**: https://aws.amazon.com/s3/pricing/

### Documentación
- **CloudFront Costs**: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CloudFrontPricing.html
- **Free Tier**: https://aws.amazon.com/free/
- **Cost Optimization**: https://aws.amazon.com/architecture/cost-optimization/

---

## 📞 Contacto

Para revisión de costos o dudas:
- **Email**: alicia.canta@dygsom.pe
- **Proyecto**: DYGSOM Landing Page
- **Última actualización**: 2025-11-22
