# DYGSOM Landing Page

Landing page moderna y optimizada para DYGSOM, plataforma de detección de fraude en tiempo real para e-commerce y fintech en LATAM. Completamente funcional con backend AWS Lambda, Google Analytics 4 y sistema de tracking inteligente.

## Sitio en Producción

**URL Principal:** https://www.dygsom.pe  
**API Backend:** AWS Lambda + API Gateway  
**Analytics:** Google Analytics 4 (G-BEG8B9BQJ4)  
**Estado:** Operacional y optimizado  
**Última actualización:** Enero 2026

## Stack Tecnológico

### Frontend
- **React 19.2** + **TypeScript** - Componentes tipados y modernos
- **Vite 7.2** - Build tool optimizado (~330KB bundle)
- **Tailwind CSS v3** - Estilos utility-first con design system
- **React Icons** - Iconografía consistente

### Backend & Infraestructura
- **AWS Lambda** - Procesamiento serverless de formularios (trveshdr84.execute-api.us-east-1.amazonaws.com)
- **AWS API Gateway** - REST API con CORS configurado
- **AWS S3** + **CloudFront** - Hosting estático con CDN global (E8UFMILPM5WIL)
- **AWS Certificate Manager** - SSL/TLS automático
- **Google Analytics 4** - Tracking de usuarios y eventos

### Características Avanzadas
- **Google Analytics 4** - Implementación profesional con TypeScript
- **Visitor Tracking** - Sistema propio de analytics complementario
- **Welcome Video Modal** - Modal con video y formulario ROI (activable/desactivable)
- **Formularios integrados** - Demo request + ROI calculator con validación
- **Debug tools** - Herramientas de desarrollo separadas (solo dev)
- **Constants centralizadas** - Configuración mantenible
- **FloatingWhatsAppButton** - Botón flotante de contacto

## Instalación

```bash
npm install
```

## Desarrollo

```bash
# Servidor de desarrollo con debug tools
npm run dev
```

**URL Development:** http://localhost:5173  
**Debug Tools:** Disponibles en consola del navegador (`DygsomDebug.*`)  
**Hot Reload:** Habilitado para desarrollo rápido

## Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

## Docker

### Construir imagen

```bash
docker build -t dygsom-landing-page .
```

### Ejecutar contenedor

```bash
docker run -p 80:80 dygsom-landing-page
```

## Estructura del Proyecto (Actualizada Enero 2026)

```
dygsom-landing-page/
├── public/
│   ├── dygsom-logo.svg         # Logo principal
│   ├── favicon.svg             # Icono del sitio
│   ├── robots.txt              # SEO robots
│   ├── sitemap.xml             # Sitemap SEO
│   ├── manifest.json           # PWA manifest
│   └── team/                   # Fotos del equipo
├── src/
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── modals/             # WelcomeVideoModal
│   │   ├── ui/                 # Button, FeatureCard, FloatingWhatsAppButton
│   │   └── sections/           # 15+ secciones de la landing
│   ├── services/
│   │   └── leadsService.ts     # AWS Lambda integration
│   ├── utils/
│   │   ├── analytics.ts        # Google Analytics 4 integration
│   │   ├── constants.ts        # Configuraciones centralizadas
│   │   ├── VisitorTracker.ts   # Sistema tracking complementario
│   │   └── debug/              # Debug tools (dev-only)
│   ├── App.tsx                 # Componente principal
│   ├── App.css                 # Estilos globales
│   └── main.tsx                # Entry point + GA4 init
├── seo/                        # SEO documentation
│   ├── docs/                   # Estrategias SEO
│   └── tools/                  # Scripts verificación
├── cloud/                      # AWS deployment
│   ├── deploy-s3.ps1           # PowerShell deployment script
│   ├── deploy-s3.sh            # Bash deployment script
│   └── [docs]                  # Configuraciones AWS
├── cleanup-artifacts/          # Documentación histórica
├── .env.development            # Dev environment vars
├── .env.production             # Production environment vars (incluye GA4)
└── package.json                # React 19 + Vite 7
```

**Características principales:**
- **Google Analytics 4** implementado profesionalmente
- **Welcome Video Modal** con formulario ROI calculator
- **15+ secciones** optimizadas (Hero, Pricing, Team, FAQ, etc.)
- **FloatingWhatsAppButton** para contacto directo
- **Debug tools** separados (solo dev)
- **SEO optimizado** con sitemap y manifest

## 🎨 Paleta de Colores

- **dygsom-blue**: `#0EA5E9` - Color principal
- **dygsom-dark**: `#0F172A` - Fondo oscuro
- **dygsom-light-text**: `#E2E8F0` - Texto claro
- **dygsom-accent**: `#FBBF24` - Amarillo para highlights
- **dygsom-green**: `#22C55E` - Verde para éxito
- **dygsom-orange**: `#F97316` - Naranja para alertas

## Despliegue en AWS

### Infraestructura Actual

- **S3 Bucket:** `dygsom-landing-page-dev` (us-east-1)
- **CloudFront Distribution:** `E8UFMILPM5WIL`
- **CloudFront Domain:** `d3rskao5nrdvou.cloudfront.net`
- **Dominio Principal:** `www.dygsom.pe`
- **Certificado SSL:** AWS Certificate Manager (ACM)
- **DNS:** GoDaddy con CNAME a CloudFront

### Documentación de Despliegue

| Documento | Descripción |
|-----------|-------------|
| **[DEPLOYMENT.md](./cloud/DEPLOYMENT.md)** | Guía completa de despliegue a AWS S3 + CloudFront |
| **[DOMINIO-SSL-CONFIG.md](./cloud/DOMINIO-SSL-CONFIG.md)** | Configuración de dominio personalizado y SSL |
| **[COSTOS-CHECKLIST.md](./cloud/COSTOS-CHECKLIST.md)** | Checklist de servicios AWS y proyección de costos |
| **[PERMISOS-REQUERIDOS.md](./cloud/PERMISOS-REQUERIDOS.md)** | Permisos IAM necesarios para deployment |

### Quick Deploy

```bash
# Windows
.\cloud\deploy-s3.ps1

# Linux/macOS
./cloud/deploy-s3.sh
```

El script automatiza:
1. Build de producción con Vite
2. Sincronización a S3 con cache optimizado
3. Invalidación de cache CloudFront (requiere permisos)
4. Verificación de despliegue exitoso

### URLs del Proyecto

- **Producción:** https://www.dygsom.pe
- **CloudFront:** https://d3rskao5nrdvou.cloudfront.net
- **S3 Direct:** http://dygsom-landing-page-dev.s3-website-us-east-1.amazonaws.com
- **Desarrollo:** http://localhost:5173

## Componentes Principales

### Layout Components
- **Header**: Navegación principal con logo clickeable y enlaces a secciones
- **Footer**: Información de contacto, enlaces legales y redes sociales

### Modals
- **WelcomeVideoModal**: Modal con video de bienvenida y formulario ROI calculator (configurable via FEATURE_FLAGS)

### UI Components
- **Button**: Botón reutilizable con variantes (primary, secondary, outline)
- **FeatureCard**: Tarjeta para mostrar características con icono, título y descripción
- **FloatingWhatsAppButton**: Botón flotante para contacto directo por WhatsApp

### Section Components (15+)
- **HeroSection**: Página inicial con CTA principal
- **ProblemSection / ProblemOpportunitySection**: Descripción del problema del mercado
- **SolutionArchitectureSection**: Arquitectura técnica con animación
- **DygsomArchitectureAnimation**: Animación SVG del flujo de ML con mapa mundial
- **AdvantagesSection**: Ventajas competitivas de DYGSOM
- *Características Técnicas Implementadas

### Frontend Avanzado
- **React 19.2** con TypeScript y componentes optimizados
- **Bundle optimizado**: ~330KB con Vite 7.2
- **Responsive Design**: Mobile-first con Tailwind CSS
- **Performance**: Carga rápida y smooth scrolling
- **Google Analytics 4**: Tracking profesional con TypeScript

### Backend Funcional  
- **AWS Lambda**: Procesamiento serverless de formularios
- **API REST**: Endpoint `/lead` con CORS configurado
- **Validación**: Input validation y error handling robusto
- **Múltiples formularios**: Demo request, ROI calculator, Interest popup

### Funcionalidades Avanzadas
- **Google Analytics 4**: Implementación profesional (G-BEG8B9BQJ4)
- **Visitor Tracking**: Sistema complementario de analytics
- **Welcome Video Modal**: Modal configurable con video y formulario ROI
- **Formularios integrados**: Demo request + ROI calculator + Email capture
- **Debug tools**: Consola de desarrollo (`DygsomDebug.*`) - solo dev
- **FloatingWhatsAppButton**: Contacto directo flotante
- **Error UX**: Mensajes de error user-friendly

### Arquitectura Limpia
- **Clean Code**: Refactorizado sin duplicados
- **Separation of concerns**: Debug separado de producción  
- **Centralized config**: Constants.ts para configuraciones
- **Type safety**: TypeScript strict mode
- **SEO optimized**: Meta tags, sitemap, manifest
- *Scripts Disponibles

```bash
npm run dev          # Desarrollo con debug tools (puerto 5173)
npm run build        # Build optimizado para producción  
npm run preview      # Preview del build localmente
npm run lint         # ESLint con configuración estricta
```

## Variables de Entorno

### `.env.development`
```env
VITE_APP_NAME=DYGSOM
VITE_ENV=development
VITE_DYGSOM_API_URL=https://trveshdr84.execute-api.us-east-1.amazonaws.com/lead
VITE_SUPPORT_EMAIL=support@dygsom.pe
VITE_DEBUG_ENABLED=true
VITE_GA_TRACKING_ID=G-BEG8B9BQJ4
```

### `.env.production`
```env
VITE_APP_NAME=DYGSOM
VITE_ENV=production
VITE_DYGSOM_API_URL=https://trveshdr84.execute-api.us-east-1.amazonaws.com/lead
VITE_SUPPORT_EMAIL=support@dygsom.pe
VITE_GA_TRACKING_ID=G-BEG8B9BQJ4
```
Métricas de Rendimiento

- **Bundle Size**: ~330KB con Vite 7.2
- **Load Time**: < 2s en www.dygsom.pe
- **API Response**: < 500ms AWS Lambda
- **Welcome Modal**: 0.5s después de carga (configurable)
- **Form Validation**: Real-time con UX mejorada
- **Error Handling**: User-friendly con fallbacks
- **GA4 Tracking**: Activo y funcional

## Despliegue a Producción

```powershell
# Windows PowerShell
.\cloud\deploy-s3.ps1

# Linux/macOS
./cloud/deploy-s3.sh
```

**Proceso automático:**
1. Build de producción con Vite
2. Sync a S3 bucket con cache headers optimizados
3. Invalidación de CloudFront (requiere permisos)
4. Verificación en https://www.dygsom.pe

##Métricas de Rendimiento (Actuales)

- **Bundle Size**: 267KB (gzipped) - Optimizado
- **Load Time**: < 2s en www.dygsom.pe
- **API Response**: < 500ms AWS Lambda
- **Modal Trigger**: 15s después de carga
- **Form Validation**: Real-time con UX mejorada
- **Error Handling**: User-friendly con fallbacks

## 🚀 Despliegue a Producción

```powershell
# Despliegue automatizado a S3 + CloudFront
./cloud/deploy-s3.ps1
```

**Proceso automático:**
1. Configuración de Feature Flags

En `src/utils/constants.ts`:

```typescript
export const FEATURE_FLAGS = {
  WELCOME_VIDEO_MODAL_ENABLED: true,  // Activar/desactivar modal de bienvenida
  WELCOME_MODAL_DELAY_MS: 500,        // Delay antes de mostrar modal (ms)
  WELCOME_MODAL_VIDEO_ENABLED: true,  // Mostrar video en el modal
} as const;
```

## Próximos Pasos

- [ ] **Dashboard Analytics**: Panel interno para leads capturados
- [ ] **DynamoDB Integration**: Persistencia de datos estructurada  
- [ ] **Email Templates**: Templates HTML profesionales
- [ ] **A/B Testing**: Testing de conversión automático
- [ ] **CRM Integration**: Conexión con HubSpot/Salesforce

## Documentación Adicional

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitectura técnica detallada
- [cloud/README.md](./cloud/README.md) - Infraestructura AWS
- [seo/README.md](./seo/README.md) - Estrategias SEO
- [PILARES-DYGSOM-EXPLICACION-CLIENTE.md](./PILARES-DYGSOM-EXPLICACION-CLIENTE.md) - Explicación de pilares técnicos

## Seguridad

- Headers de seguridad configurados en CloudFront
- Política CORS restrictiva
- Contenido servido solo por HTTPS
- Certificado SSL/TLS válido y renovación automática
- Google Analytics 4 con anonymize_ip activado (GDPR compliant)

## Notas Técnicas

- Proyecto inicializado con Vite + React + TypeScript template
- Tailwind CSS configurado con custom design system
- React Icons para iconografía consistente
- Arquitectura de componentes atómicos (Layout → Modals → UI → Sections)
- Deploy automatizado con invalidación de cache CloudFront
- Google Analytics 4 inicializado desde main.tsx

---

**Landing page de DYGSOM - Optimizada y funcional | Enero 2026**écnica detallada
- 🏗️ [Arquitectura-LandingPage.md](./Arquitectura-LandingPage.md) - Documentación AWS completa  
- 🔄 [REFACTORING.md](./REFACTORING.md) - Log de mejoras implementadas
- ☁️ [cloud/README.md](./cloud/README.md) - Infraestructura AWS
- 🚀 [seo/README.md](./seo/README.md) - Estrategias SEO

---

**🎯 Landing page de DYGSOM - Optimizada y funcional | Noviembre 2025**
2. ✅ Sync a S3 bucket con cache headers optimizados
3. ✅ Invalidación de CloudFront (si permisos disponibles)  
4. ✅ Verificación en https://www.dygsom.pe

## 🔐 Seguridad

- Headers de seguridad configurados en CloudFront
- Política CORS restrictiva
- Contenido servido solo por HTTPS
- Certificado SSL/TLS válido y renovación automática

## 📝 Notas Técnicas

- Proyecto inicializado con Vite + React + TypeScript template
- Tailwind CSS configurado con custom design system
- React Icons para iconografía consistente
- Arquitectura de componentes atómicos (Layout → UI → Sections)
- Deploy automatizado con invalidación de cache CloudFront
```
