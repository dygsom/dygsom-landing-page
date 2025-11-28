# Arquitectura del Proyecto

Documentación de la arquitectura y patrones de diseño implementados en DYGSOM Landing Page.

## 🏛️ Arquitectura General

### Stack Tecnológico

```
┌─────────────────────────────────────────┐
│         Frontend (React 18)             │
│  ┌──────────────────────────────────┐   │
│  │  TypeScript + Vite + Tailwind    │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      CDN Layer (CloudFront)             │
│  ┌──────────────────────────────────┐   │
│  │  Edge Caching + SSL/TLS          │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│       Storage (S3 Static Website)       │
│  ┌──────────────────────────────────┐   │
│  │  HTML, CSS, JS, Images           │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## 📐 Arquitectura de Componentes

### Estructura por Capas (Atomic Design)

```
src/
├── components/
│   ├── layout/          # Componentes de estructura (Header, Footer)
│   ├── ui/              # Componentes reutilizables básicos (Button, Card)
│   └── sections/        # Secciones complejas de la página
├── services/            # ✨ Servicios API (leadsService.ts)
├── utils/
│   ├── constants.ts     # ✨ Configuraciones centralizadas
│   ├── VisitorTracker.ts # Sistema de tracking optimizado
│   └── debug/           # ✨ Herramientas debug (dev-only)
├── App.tsx              # Orquestador principal
└── main.tsx             # Entry point
```

### Jerarquía de Componentes

```
App
├── Header (Layout)
│   └── Logo + Navigation
├── HeroSection (Section)
│   ├── Button (UI)
│   └── Heading + Description
├── ProblemOpportunitySection (Section)
│   └── FeatureCard (UI) × N
├── SolutionArchitectureSection (Section)
│   └── DygsomArchitectureAnimation (Complex)
│       └── SVG Interactive Animation
├── AdvantagesSection (Section)
│   └── FeatureCard (UI) × N
├── PricingSection (Section)
│   └── PricingCard × N
├── TeamSection (Section)
│   └── TeamMemberCard × N
├── CallToActionSection (Section)
│   └── Button (UI)
└── Footer (Layout)
    └── Social Links + Legal
```

## 🛠️ Servicios y Utilidades

### Servicios API (services/)

```typescript
// leadsService.ts - Integración AWS Lambda
export async function submitDemoLead(values: DemoFormValues): Promise<void>
export async function submitInterestPopup(email: string): Promise<void>

// Configuración centralizada
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_DYGSOM_API_URL,
  TIMEOUT: 10000
}
```

### Constantes Centralizadas (utils/constants.ts)

```typescript
export const MODAL_CONFIG = {
  SHOW_DELAY: 15000,
  AUTO_HIDE_DELAY: 5000
} as const;

export const STORAGE_KEYS = {
  EMAIL_MODAL_SHOWN: 'dygsom_email_modal_shown',
  CAPTURED_EMAIL: 'dygsom_captured_email'
} as const;
```

### Debug Tools (utils/debug/)

```typescript
// Solo disponible en desarrollo
DygsomDebug.resetModal()      // Reset estado modal
DygsomDebug.forceShowModal()  // Forzar mostrar modal
DygsomDebug.checkState()      // Ver estado aplicación
```

## 🎨 Sistema de Diseño

### Design Tokens (Tailwind Config)

```javascript
{
  colors: {
    'dygsom-blue': '#0EA5E9',      // Primary brand color
    'dygsom-dark': '#0F172A',      // Background dark
    'dygsom-light-text': '#E2E8F0', // Text light
    'dygsom-accent': '#FBBF24',    // Highlight yellow
    'dygsom-green': '#22C55E',     // Success green
    'dygsom-orange': '#F97316'     // Alert orange
  }
}
```

### Tipografía

- **Headings**: Font weight 700-900, tracking tight
- **Body**: Font weight 400, line height relaxed
- **Scale**: 2xl → xl → lg → base → sm

### Espaciado

- **Sections**: py-20 (desktop), py-12 (mobile)
- **Container**: max-w-7xl mx-auto px-4
- **Cards**: p-6 o p-8 según contexto

## 🔧 Patrones de Diseño

### 1. Composición sobre Herencia

Todos los componentes son funcionales y se componen:

```tsx
// ✅ Buena práctica
const HeroSection = () => {
  return (
    <section>
      <Button variant="primary" />
      <Button variant="secondary" />
    </section>
  );
};
```

### 2. Props Typing Estricto

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ ... }) => { ... };
```

### 3. Single Responsibility

Cada componente tiene una única responsabilidad:

- `Button`: Renderizar botón con estilos
- `FeatureCard`: Mostrar una característica
- `Header`: Navegación y branding
- `HeroSection`: Primera impresión y CTA

### 4. DRY (Don't Repeat Yourself)

Componentes reutilizables en `ui/`:
- `Button` → Usado en 5+ lugares
- `FeatureCard` → Usado en 2 secciones

### 5. Separation of Concerns

- **Lógica de UI**: Dentro de componentes
- **Estilos**: Tailwind inline classes
- **Data**: Props desde componente padre
- **Build**: Vite configuration
- **Deploy**: Scripts en `cloud/`

## 📊 Flujo de Datos

### One-Way Data Flow

```
App.tsx (State)
    ↓ props
Section Components (Presentation)
    ↓ props
UI Components (Pure)
```

### Estado Local vs Props

```tsx
// Estado local para interactividad
const [isAnimating, setIsAnimating] = useState(false);

// Props para configuración
const Button = ({ variant, onClick, children }) => { ... };
```

## 🚀 Performance Optimizations

### 1. Code Splitting

Vite automáticamente:
- Separa chunks por route (si usa React Router)
- Tree-shaking de imports no usados
- Minificación de JS y CSS

### 2. Asset Optimization

```javascript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'icons': ['react-icons']
      }
    }
  }
}
```

### 3. Image Optimization

- SVGs para logos e íconos (escalables, pequeños)
- WebP para fotografías (cuando sea posible)
- Lazy loading para imágenes below-the-fold

### 4. CSS Optimization

- Tailwind purge en producción
- Critical CSS inline (Vite automático)
- Utility-first reduce CSS bundle

## 🔒 Seguridad

### Content Security Policy

Headers configurados en CloudFront:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline';
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
```

### HTTPS Everywhere

- Certificado SSL/TLS vía ACM
- Redirect HTTP → HTTPS en CloudFront
- HSTS header habilitado

## 📦 Build Pipeline

```
1. Developer commits → main branch
2. npm run build (local o CI/CD)
   ├── TypeScript compilation
   ├── Vite bundling
   ├── Tailwind purge
   └── Asset hashing
3. deploy-s3.ps1
   ├── Sync to S3
   └── CloudFront invalidation
4. Production live!
```

## 🧪 Testing Strategy (Future)

### Unit Tests
- Component rendering
- Props validation
- User interactions

### Integration Tests
- Multi-component workflows
- Navigation flows
- Form submissions

### E2E Tests
- Critical user paths
- Cross-browser compatibility
- Mobile responsiveness

## 📈 Escalabilidad

### Preparado para:

1. **Más secciones**: Agregar en `src/components/sections/`
2. **Más páginas**: React Router + lazy loading
3. **Internacionalización**: react-i18next
4. **CMS Integration**: Headless CMS (Strapi, Contentful)
5. **Analytics**: Google Analytics, Mixpanel
6. **A/B Testing**: Split testing components

### No necesita:

- ❌ State management complejo (Redux) - No hay estado global
- ❌ Server-side rendering (SSR) - Landing page estática
- ❌ Database - Contenido hardcoded

## 🔄 Workflow de Desarrollo

```
1. Feature Branch
   ↓
2. Local Development (npm run dev)
   ↓
3. Testing manual
   ↓
4. Build local (npm run build)
   ↓
5. Merge to main
   ↓
6. Deploy to S3 (.\cloud\deploy-s3.ps1)
   ↓
7. CloudFront cache invalidation
   ↓
8. Verify production (https://www.dygsom.pe)
```

## 📚 Mejores Prácticas Implementadas

✅ **TypeScript**: Type safety en todo el proyecto  
✅ **ESLint**: Linting automático  
✅ **Atomic Design**: Componentes jerárquicos  
✅ **Responsive First**: Mobile-first approach  
✅ **Accessibility**: Semantic HTML, ARIA labels  
✅ **SEO**: Meta tags, semantic structure  
✅ **Performance**: Bundle optimizado (267KB)  
✅ **Security**: HTTPS, validación de inputs  
✅ **Clean Code**: Código refactorizado sin duplicados  
✅ **Centralized Config**: Constants.ts para configuraciones  
✅ **Debug Separation**: Tools de debug separados de producción  
✅ **API Integration**: AWS Lambda funcional  
✅ **Error Handling**: UX mejorada para errores  
✅ **Documentation**: Arquitectura actualizada  

---

**Última actualización:** 23 de Noviembre, 2025  
**Mantenido por:** Equipo DYGSOM
