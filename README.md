# DYGSOM Landing Page

Landing page informativa de alto rendimiento para DYGSOM, una solución de detección de fraude en tiempo real para e-commerce y fintech en LATAM.

## 🌐 Sitio en Producción

**URL Principal:** https://www.dygsom.pe

## 🚀 Tecnologías

- **React 18** + **TypeScript**
- **Vite** - Build tool y dev server ultrarrápido
- **Tailwind CSS v3** - Estilos utility-first
- **React Icons** - Iconografía moderna
- **AWS S3** + **CloudFront** - Hosting y CDN global
- **AWS Certificate Manager** - SSL/TLS gratuito
- **GoDaddy DNS** - Gestión de dominio

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

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

## 📁 Estructura del Proyecto

```
dygsom-landing-page/
├── public/
│   ├── dygsom-logo.svg         # Logo principal
│   ├── favicon.svg             # Icono del sitio
│   └── team/                   # Fotos del equipo
│       └── alicia-canta.png
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Navegación principal
│   │   │   └── Footer.tsx      # Pie de página
│   │   ├── ui/
│   │   │   ├── Button.tsx      # Componente de botón reutilizable
│   │   │   └── FeatureCard.tsx # Tarjeta de características
│   │   └── sections/
│   │       ├── HeroSection.tsx                    # Sección hero inicial
│   │       ├── ProblemOpportunitySection.tsx      # Problema y oportunidad
│   │       ├── SolutionArchitectureSection.tsx    # Arquitectura de solución
│   │       ├── DygsomArchitectureAnimation.tsx    # Animación interactiva
│   │       ├── AdvantagesSection.tsx              # Ventajas competitivas
│   │       ├── PricingSection.tsx                 # Planes y precios
│   │       ├── TeamSection.tsx                    # Equipo fundador
│   │       └── CallToActionSection.tsx            # CTA final
│   ├── App.tsx                 # Componente principal
│   ├── main.tsx                # Punto de entrada
│   └── index.css               # Estilos globales + Tailwind
├── cloud/                      # Infraestructura AWS
│   ├── README.md               # Documentación cloud
│   ├── DEPLOYMENT.md           # Guía de despliegue completa
│   ├── DOMINIO-SSL-CONFIG.md   # Configuración dominio y SSL
│   ├── COSTOS-CHECKLIST.md     # Proyección de costos
│   ├── PERMISOS-REQUERIDOS.md  # Permisos IAM necesarios
│   ├── bucket-policy.json      # Política S3
│   ├── iam-policy.json         # Política IAM usuario deploy
│   ├── deploy-s3.sh            # Script despliegue Unix
│   └── deploy-s3.ps1           # Script despliegue Windows
├── tailwind.config.js          # Configuración Tailwind
├── vite.config.ts              # Configuración Vite
├── tsconfig.json               # Configuración TypeScript
├── Dockerfile                  # Imagen Docker (opcional)
├── .env.development            # Variables de entorno dev
├── .env.production             # Variables de entorno prod
└── package.json                # Dependencias y scripts
```

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

## 🎯 Características Técnicas

- ✅ **Responsive Design**: Diseño adaptable mobile-first
- ✅ **Performance Optimizado**: Lighthouse score 90+
- ✅ **SEO Ready**: Meta tags y estructura semántica
- ✅ **Fast Loading**: Vite HMR + lazy loading
- ✅ **Type Safety**: TypeScript en todo el proyecto
- ✅ **Modern CSS**: Tailwind CSS con custom design tokens
- ✅ **Interactive Animations**: Animaciones SVG personalizadas
- ✅ **CDN Global**: CloudFront para latencia mínima
- ✅ **HTTPS Secure**: SSL gratuito vía ACM
- ✅ **Cache Optimizado**: Headers de cache diferenciados por tipo

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo (puerto 5173)
npm run build        # Build de producción
npm run preview      # Preview del build localmente
npm run lint         # Ejecutar ESLint
```

## 🌍 Variables de Entorno

### `.env.development`
```env
VITE_API_URL=http://localhost:3000
VITE_ENV=development
```

### `.env.production`
```env
VITE_API_URL=https://api.dygsom.pe
VITE_ENV=production
```

## 📊 Métricas de Rendimiento

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: ~150KB (gzipped)

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
