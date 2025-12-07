# 🔍 SEO Diagnóstico y Soluciones para DYGSOM.PE

## 📊 Análisis del Problema Actual

### Problema Principal
**La página www.dygsom.pe NO aparece en Google y se redirige incorrectamente**

### Causas Identificadas

#### 1. **Problema de Infraestructura DNS/Hosting** ⚠️ CRÍTICO
Si al buscar "dygsom.pe" te redirige a otras páginas, hay un problema en:
- ✗ Configuración DNS del dominio
- ✗ Configuración de CloudFront/S3
- ✗ Posible problema con el certificado SSL
- ✗ Redirecciones incorrectas en el servidor

**Esto NO es un problema de código, sino de infraestructura AWS.**

#### 2. **Sitemap Desactualizado** ⚠️ IMPORTANTE
El `sitemap.xml` tiene secciones que ya no existen:
- ❌ `#ventajas` (ya no existe)
- ❌ `#tecnico` (ya no existe)
- ❌ `#equipo` (ya no existe)
- ❌ `#precios` (debería ser `#pricing`)
- ✓ Faltan secciones nuevas: `#problema`, `#solucion`, `#calculator`, `#pricing`, `#faq`, `#casos-uso`

#### 3. **Falta de Indexación en Google**
Si el sitio es nuevo o se desplegó recientemente:
- ✗ No se ha enviado el sitemap a Google Search Console
- ✗ No hay backlinks (enlaces desde otros sitios)
- ✗ Dominio nuevo sin historial

---

## 🛠️ Soluciones Paso a Paso

### PASO 1: Verificar Infraestructura AWS (CRÍTICO)

#### A. Verificar DNS
```bash
# Ejecuta estos comandos en tu terminal para diagnosticar:

# 1. Ver dónde apunta tu dominio
nslookup dygsom.pe
nslookup www.dygsom.pe

# 2. Ver registros DNS completos
dig dygsom.pe
dig www.dygsom.pe

# 3. Verificar certificado SSL
curl -I https://www.dygsom.pe
```

**Lo que deberías ver:**
- `dygsom.pe` debe apuntar a la distribución de CloudFront
- `www.dygsom.pe` debe apuntar a la misma distribución
- Debe devolver código 200 (no 301, 302, 404, 403)

#### B. Configuración de CloudFront

En tu consola AWS CloudFront, verifica:

1. **Alternate Domain Names (CNAMEs)**:
   ```
   ✓ www.dygsom.pe
   ✓ dygsom.pe
   ```

2. **Certificado SSL**:
   - Debe estar validado para `*.dygsom.pe` y `dygsom.pe`
   - Estado: "Issued"

3. **Default Root Object**:
   ```
   index.html
   ```

4. **Error Pages (Custom Error Response)**:
   - 404 → `/index.html` (código 200) - Para SPA routing
   - 403 → `/index.html` (código 200) - Para SPA routing

#### C. Configuración de S3 Bucket

1. **Bucket Policy** debe permitir acceso público vía CloudFront:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::tu-bucket-dygsom/*"
    }
  ]
}
```

2. **NO debe tener** "Static Website Hosting" habilitado (CloudFront lo maneja)

#### D. Verificar Redirección www → no-www (o viceversa)

**Opción Recomendada:** Usar `www.dygsom.pe` como principal

En Route 53:
1. `A Record` para `dygsom.pe` → Alias a CloudFront
2. `A Record` para `www.dygsom.pe` → Alias a CloudFront
3. Configurar redirección en CloudFront Functions (si necesitas canonicalizar)

---

### PASO 2: Actualizar Sitemap.xml

Actualiza `/public/sitemap.xml` con las secciones correctas:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

   <!-- Homepage -->
   <url>
      <loc>https://www.dygsom.pe/</loc>
      <lastmod>2025-12-07</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
   </url>

   <!-- Secciones principales -->
   <url>
      <loc>https://www.dygsom.pe/#inicio</loc>
      <lastmod>2025-12-07</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
   </url>

   <url>
      <loc>https://www.dygsom.pe/#problema</loc>
      <lastmod>2025-12-07</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
   </url>

   <url>
      <loc>https://www.dygsom.pe/#solucion</loc>
      <lastmod>2025-12-07</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
   </url>

   <url>
      <loc>https://www.dygsom.pe/#calculator</loc>
      <lastmod>2025-12-07</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
   </url>

   <url>
      <loc>https://www.dygsom.pe/#pricing</loc>
      <lastmod>2025-12-07</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
   </url>

   <url>
      <loc>https://www.dygsom.pe/#casos-uso</loc>
      <lastmod>2025-12-07</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
   </url>

   <url>
      <loc>https://www.dygsom.pe/#faq</loc>
      <lastmod>2025-12-07</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
   </url>

   <url>
      <loc>https://www.dygsom.pe/#contacto</loc>
      <lastmod>2025-12-07</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
   </url>

</urlset>
```

---

### PASO 3: Crear/Actualizar Google Search Console

#### A. Registrar el Sitio
1. Ve a: https://search.google.com/search-console
2. Agrega propiedad: `https://www.dygsom.pe`
3. Verifica propiedad usando:
   - Opción 1: Subir archivo HTML a `/public`
   - Opción 2: Meta tag en `index.html` (ya lo tienes)
   - Opción 3: Google Analytics (recomendado)

#### B. Enviar Sitemap
Una vez verificado:
1. En Search Console → Sitemaps
2. Agregar sitemap: `https://www.dygsom.pe/sitemap.xml`
3. Enviar

#### C. Solicitar Indexación Manual
1. En Search Console → Inspección de URL
2. Pega: `https://www.dygsom.pe/`
3. Clic en "Solicitar indexación"

---

### PASO 4: Optimizaciones de Código SEO

#### A. Actualizar index.html

Agrega verificación de Google Search Console (si usas meta tag):
```html
<!-- Dentro de <head> -->
<meta name="google-site-verification" content="TU_CODIGO_AQUI" />
```

#### B. Agregar Schema.org adicional

Actualiza el structured data para incluir más información:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DYGSOM",
  "url": "https://www.dygsom.pe",
  "logo": "https://www.dygsom.pe/dygsom-logo.svg",
  "description": "Plataforma antifraude con IA para e-commerce en LATAM",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "PE",
    "addressLocality": "Lima"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Sales",
    "email": "contacto@dygsom.pe",
    "availableLanguage": "Spanish"
  },
  "sameAs": [
    "https://www.linkedin.com/company/dygsom",
    "https://x.com/dygsom",
    "https://www.instagram.com/dygsom"
  ]
}
```

#### C. Mejorar Performance (Core Web Vitals)

1. **Preload critical resources**:
```html
<!-- En index.html <head> -->
<link rel="preload" as="style" href="/src/index.css">
<link rel="preload" as="script" href="/src/main.tsx">
```

2. **Lazy load imágenes**:
```tsx
// En componentes con imágenes
<img src="..." loading="lazy" alt="..." />
```

3. **Optimizar fonts**:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
```

---

### PASO 5: Crear Archivo _headers (para Netlify/CloudFront)

Si usas CloudFront, configura headers de seguridad y cache:

**Crear:** `/public/_headers`
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

---

### PASO 6: Backlinks y Promoción

#### A. Directorios Peruanos
Registra DYGSOM en:
- ✓ Páginas Amarillas Perú
- ✓ Mercado Libre (perfil de empresa)
- ✓ LinkedIn Company Page (ya existe)
- ✓ Product Hunt (si aplica)
- ✓ Directorio de Startups de ProInnóvate

#### B. Redes Sociales
Actualiza bio en todas las redes con link:
- ✓ LinkedIn: https://www.linkedin.com/company/dygsom
- ✓ Twitter/X: https://x.com/dygsom
- ✓ Instagram: https://www.instagram.com/dygsom

Publica posts con link al sitio.

#### C. Menciones en Foros
- Reddit (r/startups, r/ecommerce)
- Foros de e-commerce en Perú
- Grupos de Facebook/LinkedIn de e-commerce Perú

---

## 📋 Checklist de Implementación

### Infraestructura (CRÍTICO - Hacer PRIMERO)
- [ ] Verificar DNS apunta correctamente
- [ ] Verificar CloudFront funciona (curl -I https://www.dygsom.pe)
- [ ] Verificar certificado SSL válido
- [ ] Configurar error pages 404/403 → index.html
- [ ] Verificar que S3 bucket policy permite CloudFront
- [ ] Testear que https://www.dygsom.pe carga correctamente

### SEO On-Page (Hacer DESPUÉS de infraestructura)
- [ ] Actualizar sitemap.xml con secciones correctas
- [ ] Rebuild y redeploy (npm run build && npm run deploy)
- [ ] Verificar sitemap accesible: https://www.dygsom.pe/sitemap.xml
- [ ] Verificar robots.txt accesible: https://www.dygsom.pe/robots.txt

### Google Search Console
- [ ] Registrar sitio en Google Search Console
- [ ] Verificar propiedad (HTML file, meta tag, o Analytics)
- [ ] Enviar sitemap.xml
- [ ] Solicitar indexación manual de homepage
- [ ] Monitorear errores de cobertura

### Performance y Technical SEO
- [ ] Agregar preload de recursos críticos
- [ ] Optimizar imágenes (WebP, lazy loading)
- [ ] Configurar headers de cache
- [ ] Testear Core Web Vitals (PageSpeed Insights)
- [ ] Verificar mobile-friendly (Google Mobile-Friendly Test)

### Promoción y Backlinks
- [ ] Actualizar redes sociales con link
- [ ] Registrar en directorios
- [ ] Publicar en LinkedIn/Twitter sobre el lanzamiento
- [ ] Contactar blogs/medios de e-commerce en Perú

---

## 🔧 Comandos Útiles para Diagnóstico

```bash
# 1. Verificar si el sitio está accesible
curl -I https://www.dygsom.pe

# 2. Ver headers HTTP completos
curl -v https://www.dygsom.pe

# 3. Verificar DNS
nslookup www.dygsom.pe
dig www.dygsom.pe

# 4. Verificar certificado SSL
openssl s_client -connect www.dygsom.pe:443 -servername www.dygsom.pe

# 5. Testear desde diferentes ubicaciones
# Usa: https://www.whatsmydns.net/#A/www.dygsom.pe

# 6. Ver si Google puede rastrear
# Usa: https://search.google.com/test/mobile-friendly
# Ingresa: https://www.dygsom.pe
```

---

## 🎯 Tiempos Esperados

Después de implementar todas las soluciones:

- **Infraestructura arreglada**: Inmediato (minutos)
- **Google encuentra el sitio**: 1-3 días
- **Aparece en búsquedas genéricas**: 2-4 semanas
- **Rankings mejoran**: 1-3 meses

**IMPORTANTE:** El problema de redirección debe resolverse PRIMERO. Sin acceso al sitio, ninguna optimización SEO funcionará.

---

## 📞 Próximos Pasos Inmediatos

1. **HOY:** Verificar que https://www.dygsom.pe carga correctamente
   - Si NO carga → Revisar DNS/CloudFront (problema de infraestructura)
   - Si SÍ carga → Continuar con Google Search Console

2. **HOY:** Actualizar sitemap.xml y redesplegar

3. **Esta semana:** Registrar en Google Search Console y enviar sitemap

4. **Este mes:** Crear backlinks y promocionar

---

**Última actualización:** 7 de diciembre 2025
