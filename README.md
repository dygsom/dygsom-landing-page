# DYGSOM Landing Page

Landing page moderna y optimizada para DYGSOM, plataforma de detección de fraude en tiempo real para e-commerce y fintech en LATAM. **Completamente funcional con backend AWS Lambda y sistema de tracking inteligente**.

## 🌐 Sitio en Producción

**URL Principal:** ✅ https://www.dygsom.pe  
**API Backend:** ✅ AWS Lambda + API Gateway  
**Estado:** 🟢 Operacional y optimizado  
**Última actualización:** Noviembre 2025

## 🚀 Stack Tecnológico

### Frontend
- **React 18** + **TypeScript** - Componentes tipados y modernos
- **Vite** - Build tool optimizado (267KB bundle)
- **Tailwind CSS v3** - Estilos utility-first con design system
- **React Icons** - Iconografía consistente

### Backend & Infraestructura
- **AWS Lambda** - Procesamiento serverless de formularios
- **AWS API Gateway** - REST API con CORS configurado
- **AWS S3** + **CloudFront** - Hosting estático con CDN global
- **AWS Certificate Manager** - SSL/TLS automático

### Características Avanzadas
- **Visitor Tracking** - Sistema propio de analytics
- **Modal inteligente** - Captura de leads automática
- **Formularios integrados** - Validación y envío a Lambda
- **Debug tools** - Herramientas de desarrollo separadas
- **Constants centralizadas** - Configuración mantenible

## 📦 Instalación

```bash
npm install
```

## 🔧 Desarrollo

```bash
# Servidor de desarrollo con debug tools
npm run dev
```

**URL Development:** http://localhost:5173  
**Debug Tools:** Disponibles en consola del navegador (`DygsomDebug.*`)  
**Hot Reload:** ✅ Habilitado para desarrollo rápido

## 🏗️ Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

## 🐳 Docker

### Construir imagen

```bash
docker build -t dygsom-landing-page .
```

### Ejecutar contenedor

```bash
docker run -p 80:80 dygsom-landing-page
```

## 📁 Estructura del Proyecto (Actualizada Nov 2025)

```
dygsom-landing-page/
├── public/
│   ├── dygsom-logo.svg         # Logo principal
│   ├── favicon.svg             # Icono del sitio
│   ├── robots.txt              # SEO robots
│   └── team/                   # Fotos del equipo
├── src/
│   ├── components/             # Componentes React
│   │   ├── layout/             # Header, Footer
│   │   ├── ui/                 # Button, FeatureCard (reutilizables)
│   │   └── sections/           # HeroSection, DemoFormSection, etc.
│   ├── services/               # 🆕 API integration
│   │   └── leadsService.ts     # AWS Lambda integration
│   ├── utils/
│   │   ├── constants.ts        # 🆕 Configuraciones centralizadas
│   │   ├── VisitorTracker.ts   # Sistema tracking optimizado
│   │   └── debug/              # 🆕 Debug tools (dev-only)
│   │       ├── DebugTools.ts   # Herramientas desarrollo
│   │       └── README.md       # Documentación debug
│   ├── App.tsx                 # Componente principal
│   ├── App.css                 # Estilos globales optimizados
│   └── main.tsx                # Entry point
├── seo/                        # 🆕 SEO aislado
│   ├── docs/                   # Estrategias SEO
│   └── tools/                  # Scripts verificación
├── dev-tools/                  # 🆕 Archivos desarrollo
│   └── architecture-animation-test.html
├── cloud/                      # Scripts despliegue AWS
│   ├── deploy-s3.ps1          # ✅ Despliegue automático
│   └── [configs y docs]       # Configuraciones AWS
├── .env.development            # Variables entorno desarrollo
├── .env.production             # Variables entorno producción
├── REFACTORING.md             # 🆕 Documentación refactoring
├── ARCHITECTURE.md            # 🆕 Documentación arquitectura
└── package.json               # Dependencias optimizadas
```

**🔑 Novedades principales:**
- ✨ **Servicios API** con integración Lambda funcional
- ✨ **Constantes centralizadas** para mejor mantenimiento
- ✨ **Debug tools separados** (no afectan producción)
- ✨ **SEO organizado** en carpeta aislada
- ✨ **Código refactorizado** siguiendo mejores prácticas

## 🎨 Paleta de Colores

- **dygsom-blue**: `#0EA5E9` - Color principal
- **dygsom-dark**: `#0F172A` - Fondo oscuro
- **dygsom-light-text**: `#E2E8F0` - Texto claro
- **dygsom-accent**: `#FBBF24` - Amarillo para highlights
- **dygsom-green**: `#22C55E` - Verde para éxito
- **dygsom-orange**: `#F97316` - Naranja para alertas

## 🚀 Despliegue en AWS

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
3. Invalidación de cache CloudFront
4. Verificación de despliegue exitoso

### URLs del Proyecto

- **Producción:** https://www.dygsom.pe
- **CloudFront:** https://d3rskao5nrdvou.cloudfront.net
- **S3 Direct:** http://dygsom-landing-page-dev.s3-website-us-east-1.amazonaws.com
- **Desarrollo:** http://localhost:5173

## 📝 Componentes Principales

### Layout Components
- **Header**: Navegación principal con logo clickeable y enlaces a secciones
- **Footer**: Información de contacto y enlaces legales

### UI Components
- **Button**: Botón reutilizable con variantes (primary, secondary, outline)
- **FeatureCard**: Tarjeta para mostrar características con icono, título y descripción

### Section Components
- **HeroSection**: Página inicial con CTA principal
- **ProblemOpportunitySection**: Descripción del problema y oportunidad de mercado
- **SolutionArchitectureSection**: Visualización de la arquitectura técnica con animación interactiva
- **DygsomArchitectureAnimation**: Animación SVG interactiva del flujo de ML con mapa mundial
- **AdvantagesSection**: Ventajas competitivas de DYGSOM
- **PricingSection**: Planes y precios con toggles
- **TeamSection**: Equipo fundador con fotos y perfiles
- **CallToActionSection**: CTA final para conversión

## 🎯 Características Técnicas Implementadas

### ✅ Frontend Avanzado
- **React 18** con TypeScript y componentes optimizados
- **Bundle optimizado**: 267KB gzipped con Vite
- **Responsive Design**: Mobile-first con Tailwind CSS
- **Performance**: Carga rápida y smooth scrolling

### ✅ Backend Funcional  
- **AWS Lambda**: Procesamiento serverless de formularios
- **API REST**: Endpoint funcional `/lead` con CORS
- **Validación**: Input validation y error handling robusto
- **Email integration**: Notificaciones automáticas

### ✅ Funcionalidades Avanzadas
- **Visitor Tracking**: Sistema propio de analytics
- **Modal inteligente**: Auto-popup después de 15 segundos
- **Formularios integrados**: Demo request + Email capture
- **Debug tools**: Consola de desarrollo (`DygsomDebug.*`)
- **Error UX**: Mensajes de error user-friendly

### ✅ Arquitectura Limpia
- **Clean Code**: Refactorizado sin duplicados
- **Separation of concerns**: Debug separado de producción  
- **Centralized config**: Constants.ts para configuraciones
- **Type safety**: TypeScript strict mode
- **SEO optimized**: Meta tags y estructura semántica
- ✅ **HTTPS Secure**: SSL gratuito vía ACM
- ✅ **Cache Optimizado**: Headers de cache diferenciados por tipo

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo con debug tools (puerto 5173)
npm run build        # Build optimizado para producción  
npm run preview      # Preview del build localmente
npm run lint         # ESLint con configuración estricta
```

## 🌍 Variables de Entorno (Actualizadas)

### `.env.development`
```env
VITE_APP_NAME=DYGSOM
VITE_ENV=development
VITE_DYGSOM_API_URL=https://trveshdr84.execute-api.us-east-1.amazonaws.com/lead
VITE_SUPPORT_EMAIL=support@dygsom.pe
VITE_DEBUG_ENABLED=true
```

### `.env.production`
```env
VITE_APP_NAME=DYGSOM
VITE_ENV=production
VITE_DYGSOM_API_URL=https://trveshdr84.execute-api.us-east-1.amazonaws.com/lead
VITE_SUPPORT_EMAIL=support@dygsom.pe
VITE_DEBUG_ENABLED=false
```

## 📊 Métricas de Rendimiento (Actuales)

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
1. ✅ Build de producción con Vite
2. ✅ Sync a S3 bucket con cache headers optimizados
3. ✅ Invalidación de CloudFront (si permisos disponibles)  
4. ✅ Verificación en https://www.dygsom.pe

## 🛠️ Debug Tools (Desarrollo)

Durante desarrollo, herramientas disponibles en consola del navegador:

```javascript
// Reset modal state para testing
DygsomDebug.resetModal()

// Forzar mostrar modal de información  
DygsomDebug.forceShowModal()

// Ver estado actual de la aplicación
DygsomDebug.checkState()

// Probar conectividad con API Lambda
DygsomDebug.testAPI()

// Limpiar localStorage de DYGSOM
DygsomDebug.clearStorage()
```

## 📈 Próximos Pasos

- [ ] **Dashboard Analytics**: Panel interno para leads capturados
- [ ] **DynamoDB Integration**: Persistencia de datos estructurada  
- [ ] **Email Templates**: Templates HTML profesionales
- [ ] **A/B Testing**: Testing de conversión automático
- [ ] **CRM Integration**: Conexión con HubSpot/Salesforce

## 📄 Documentación Adicional

- 📋 [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitectura técnica detallada
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
