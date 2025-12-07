# DYGSOM Landing Page - Resumen del Proyecto

## 📋 Información General

**Proyecto:** Landing page para DYGSOM - Plataforma antifraude para e-commerce y fintech en LATAM
**Stack Tecnológico:** React 18 + TypeScript + Vite + Tailwind CSS
**Deployment:** AWS (S3 + CloudFront)
**Estado Actual:** MVP en fase piloto, aplicando a financiamiento ProInnóvate (Produce/Perú)
**Fecha:** Diciembre 2025

## 🎯 Propósito del Proyecto

DYGSOM es una solución de detección de fraude con Machine Learning optimizada para LATAM (especialmente Perú). La diferencia clave vs competidores internacionales (Stripe Radar, Signifyd, Sift) es que entiende el contexto local: direcciones de conos limeños (SJL, VMT, etc.), comportamientos de compra normales en la región, y reduce los falsos positivos que sistemas extranjeros marcan incorrectamente.

## 📁 Estructura del Proyecto

```
dygsom-landing-page/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── ui/              # Button, componentes reutilizables
│   │   └── sections/        # Secciones de la landing (ver abajo)
│   ├── utils/               # VisitorTracker, debug tools
│   ├── App.tsx              # Componente principal
│   └── main.tsx
├── public/
├── .env                     # Variables de entorno (no commiteado)
└── package.json
```

## 🧩 Secciones de la Landing (Orden Actual)

1. **HeroSection** (`id="inicio"`) - Above the fold con CTA principal
2. **ProblemSection** (`id="problema"`) - Pain points del público objetivo
3. **BeforeAfterComparisonSection** (`id="solucion"`) - Comparación visual (Sistema tradicional vs DYGSOM)
4. **HowItWorksSection** - Cómo funciona la plataforma (3 pasos)
5. **ROICalculatorSection** (`id="calculator"`) - Calculadora interactiva de ahorros
6. **CompatibilitySection** - Compatibilidad con pasarelas de pago
7. **TargetAudienceSection** (`id="casos-uso"`) - Casos de uso (E-commerce, Fintech, etc.)
8. **SocialProofSection** - Testimonios y casos de clientes (simulados)
9. **SecurityComplianceSection** - Seguridad, compliance, roadmap de certificaciones
10. **MarketComparisonSection** (`id="market-comparison"`) - Tabla comparativa vs competencia
11. **PricingSection** (`id="pricing"`) - 4 planes (Starter, Professional, Business, Enterprise)
12. **FAQSection** (`id="faq"`) - Preguntas frecuentes
13. **ProjectStageSection** - Estado del proyecto, roadmap 2026, financiamiento
14. **DemoFormSection** (`id="contacto"`) - Formulario de contacto
15. **CallToActionSection** - CTA final

## 🔑 Características Clave Implementadas

### 1. Disclaimers de Credibilidad (para ProInnóvate)
**Contexto:** El proyecto está aplicando a financiamiento gubernamental, por lo que se agregaron disclaimers en toda la landing para evitar promesas absolutas y mostrar transparencia.

#### Disclaimers Implementados:
- **PricingSection**: Banner azul indicando "Pricing preliminar sujeto a ajustes según pilotos (Q1 2026)"
- **ROI en Pricing**: Todos los valores tienen prefijo "~" (~S/. 4,900/mes, ~9x ROI) y dicen "Proyección basada en..."
- **ROICalculatorSection**: Banner azul explicando que son proyecciones basadas en promedios industria LATAM
- **SocialProofSection**:
  - Banner amarillo grande: "Casos simulados para fines ilustrativos"
  - Badge "Caso Simulado" en el testimonial
- **BeforeAfterComparisonSection**: Nota de metodología explicando que scores son referenciales
- **ProjectStageSection**: Muestra transparentemente que están en "MVP en Piloto", roadmap 2026, y estado de financiamiento
- **SecurityComplianceSection**: Roadmap de compliance 2026 con estados claros (Completado, En Proceso, Planificado)

### 2. Navegación Principal
```tsx
// Header links (desktop y mobile)
- Inicio (#inicio)
- El Problema (#problema)
- Solución (#solucion)
- ROI Calculator (#calculator)
- Pricing (#pricing)
- FAQ (#faq)
- Demo Gratis (#contacto) [CTA button]
```

### 3. Sistema de Colores (Tailwind Custom)
```js
// tailwind.config.js
colors: {
  'dygsom-green': '#10b981',  // Verde principal (emerald-500)
  'dygsom-blue': '#3b82f6',   // Azul secundario (blue-500)
}
```

### 4. Integración con Backend
- **API Base URL**: Configurada en `.env` como `VITE_API_URL`
- **Endpoints**:
  - `/api/visitors/track` - Tracking de visitantes (VisitorTracker)
  - `/api/demo-request` - Envío de formularios de contacto
- **Lambda Functions**: Desplegadas en AWS Lambda con API Gateway

### 5. Visitor Tracking
```typescript
// src/utils/VisitorTracker.ts
// Rastrea visitantes únicos usando localStorage
// Campos: visitorId, sessionId, pageViews, timestamps, etc.
```

## 📝 Documentos de Referencia

### Archivos de Instrucciones en Raíz:
1. **CLAUDE.md** - Guía completa para Claude Code sobre comandos, arquitectura, patrones
2. **LANDING_ACTUALIZACIONES_NAV_TARGET.md** - Cambios de navegación y target audience
3. **LANDING_DIAGRAMA_PRICING_MEJORADO.md** - Diseño de pricing y comparaciones
4. **LANDING_AJUSTES_PROINNOVATE.md** - Ajustes de credibilidad para aplicación ProInnóvate
5. **LANDING_COPY_LEGAL_SEGURO.md** - Copy legal y disclaimers
6. **LANDING_REDISENO_INSTRUCCIONES.md** - Instrucciones de rediseño general

### Orden de Implementación (Histórico):
1. Primero: Creación de CLAUDE.md y estructura base
2. Segundo: Actualización de navegación y TargetAudienceSection
3. Tercero: Implementación de BeforeAfterComparisonSection y MarketComparisonSection
4. Cuarto: Mejoras de contraste en secciones con fondo claro
5. Quinto: Implementación de disclaimers ProInnóvate (última actualización)

## 🚀 Comandos Comunes

```bash
# Desarrollo local
npm run dev          # http://localhost:5173

# Build producción
npm run build        # Output: dist/

# Preview build local
npm run preview

# Deploy a AWS
npm run deploy       # Sube a S3 + invalida CloudFront
```

## 🎨 Patrones de Diseño

### Responsive
- Mobile-first approach
- Breakpoints: `md:` (768px), `lg:` (1024px)
- Contenedores: `max-w-6xl` o `max-w-7xl mx-auto`

### Contraste de Texto
**IMPORTANTE:** Evitar `text-slate-600` en fondos blancos (falla WCAG AA)
- Fondos claros: usar `text-slate-700`, `text-slate-800`, `text-slate-900`
- Fondos oscros: usar `text-slate-200`, `text-slate-300`, `text-slate-400`
- Agregar `font-medium` o `font-semibold` para mejorar legibilidad

### Secciones con Fondo
- Oscuro: `bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950`
- Claro: `bg-gradient-to-br from-slate-50 via-white to-slate-50`
- Alternar fondos oscuro/claro para crear separación visual

## 🔄 Estado Actual del Git

```bash
# Branch: main
# Archivos modificados (no commiteados):
M  .gitignore
M  src/App.tsx
M  src/components/sections/DemoFormSection.tsx
M  src/components/sections/DygsomArchitectureAnimation.tsx
M  src/components/sections/HeroSection.tsx
M  src/components/sections/PricingSection.tsx
M  src/components/sections/SolutionArchitectureSection.tsx
M  src/components/ui/Button.tsx

# Archivos nuevos (no trackeados):
?? LANDING_COPY_LEGAL_SEGURO.md
?? LANDING_REDISENO_INSTRUCCIONES.md
?? src/components/sections/CompatibilitySection.tsx
?? src/components/sections/FAQSection.tsx
?? src/components/sections/ProblemSection.tsx
?? src/components/sections/ROICalculatorSection.tsx
?? src/components/sections/SocialProofSection.tsx
?? src/components/sections/TargetAudienceSection.tsx
?? src/components/sections/BeforeAfterComparisonSection.tsx
?? src/components/sections/MarketComparisonSection.tsx
?? src/components/sections/ProjectStageSection.tsx
?? src/components/sections/SecurityComplianceSection.tsx
?? PROYECTO_RESUMEN.md (este archivo)

# Último commit:
c7d073d feat: Agregar redes sociales oficiales de DYGSOM
```

## ⚠️ Consideraciones Importantes

### 1. Fechas y Años
- **CRÍTICO**: Estamos en diciembre 2025, por lo tanto:
  - Roadmaps deben ser para 2026 (Q1 2026, Q2 2026, etc.)
  - NO usar 2025 en fechas futuras (ya pasó)
  - Pricing preliminar ajustable en Q1 2026

### 2. Disclaimers y Transparencia
- Todos los ROI deben tener "~" (aproximadamente)
- Testimonios marcados como "Caso Simulado"
- Métricas marcadas como "Proyección" o "Estimado"
- Estado del proyecto claramente indicado: "MVP en Piloto"

### 3. SEO y Metadata
- Títulos optimizados para keywords: "antifraude", "e-commerce", "LATAM", "Perú"
- Meta descriptions en cada página
- Open Graph tags para redes sociales

### 4. Performance
- Imágenes optimizadas (WebP cuando sea posible)
- Code splitting con dynamic imports
- Lazy loading de secciones no críticas

## 🐛 Errores Comunes y Soluciones

### Error: "Found 2 matches" en Edit tool
**Solución:** Usar `replace_all: true` si el string aparece múltiples veces

### Error: Texto no visible en fondo blanco
**Solución:** Cambiar `text-slate-600` por `text-slate-700` o más oscuro

### Error: Link de navegación no funciona
**Solución:** Verificar que la sección tenga el `id` correcto (ej: `id="solucion"`)

### Error: Pricing se desborda en mobile
**Solución:** Usar `flex-wrap`, `text-sm` en mobile, `md:text-base` en desktop

## 📊 Métricas y KPIs del Proyecto

### Métricas de Industria (Referenciales)
- Tasa de rechazo promedio Perú: **8%**
- Tasa de fraude promedio LATAM: **3.7%**
- Detección DYGSOM: **87%** (benchmark interno)
- Reducción falsos positivos: **70%** (objetivo)

### Pricing Actual (Preliminar - Q1 2026)
- **Starter**: S/. 549/mes (~$149 USD) - 10K transacciones
- **Professional**: S/. 1,649/mes (~$449 USD) - 50K transacciones [MÁS POPULAR]
- **Business**: S/. 3,299/mes (~$899 USD) - 200K transacciones
- **Enterprise**: Custom pricing - Transacciones ilimitadas

## 🔐 Variables de Entorno

```bash
# .env (no commiteado)
VITE_API_URL=https://api.dygsom.pe
VITE_ENVIRONMENT=production
# Agregar más según necesidad
```

## 👥 Equipo y Contacto

- **Website**: https://www.dygsom.pe
- **Email**: contacto@dygsom.pe
- **LinkedIn**: https://www.linkedin.com/company/dygsom
- **Twitter/X**: https://x.com/dygsom
- **Instagram**: https://www.instagram.com/dygsom

## 📌 TODOs Pendientes

### Prioridad Alta:
- [ ] Hacer commit de todos los cambios actuales
- [ ] Testear la landing completa en mobile y desktop
- [ ] Validar todos los links de navegación
- [ ] Revisar formulario de contacto (DemoFormSection)

### Prioridad Media:
- [ ] Agregar testimonios reales cuando salgan de piloto
- [ ] Actualizar logos de clientes cuando haya acuerdos firmados
- [ ] Optimizar imágenes y assets
- [ ] Implementar Analytics (Google Analytics o similar)

### Prioridad Baja:
- [ ] Agregar animaciones sutiles (framer-motion)
- [ ] Implementar dark mode toggle (si se solicita)
- [ ] A/B testing de CTAs
- [ ] Blog section (futuro)

## 🎓 Para Futuras Sesiones de Claude Code

**Al iniciar una nueva sesión:**

1. Lee este archivo (PROYECTO_RESUMEN.md) primero
2. Lee CLAUDE.md para comandos y arquitectura
3. Revisa el git status para ver cambios pendientes
4. Si vas a modificar secciones, lee primero los archivos `LANDING_*.md` relevantes
5. Siempre verifica el contraste de texto (WCAG AA)
6. Recuerda: estamos en diciembre 2025, usa 2026 para fechas futuras
7. Mantén los disclaimers de credibilidad en todas las métricas

**Antes de hacer cambios:**
- Usa `Read` tool para leer archivos existentes
- Usa `Grep` para buscar patrones antes de editar
- Usa `Edit` tool (no `Write`) para archivos existentes
- Usa `replace_all: true` si el string aparece múltiples veces

**Después de hacer cambios:**
- Testea localmente con `npm run dev`
- Verifica responsive design
- Revisa contraste de texto
- Considera hacer commit si los cambios son significativos

---

**Última actualización:** Diciembre 2025
**Versión del documento:** 1.0
**Mantenedor:** Equipo DYGSOM
