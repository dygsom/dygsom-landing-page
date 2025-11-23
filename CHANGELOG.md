# Changelog

Registro de cambios importantes del proyecto DYGSOM Landing Page.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2025-11-23

### 🎉 Lanzamiento Inicial en Producción

#### Added
- ✅ Landing page completa con 7 secciones principales
- ✅ Componente interactivo de arquitectura con animación SVG
- ✅ Sistema de diseño personalizado con Tailwind CSS
- ✅ Infraestructura AWS completa (S3 + CloudFront + ACM)
- ✅ Dominio personalizado www.dygsom.pe con HTTPS
- ✅ Scripts de deploy automatizados (Windows + Unix)
- ✅ Invalidación automática de cache CloudFront
- ✅ Documentación completa del proyecto
- ✅ Guía de arquitectura y patrones de diseño
- ✅ Guía de contribución para desarrolladores

#### Componentes Principales
- **HeroSection**: Página de inicio con CTA principal
- **ProblemOpportunitySection**: Descripción del problema y oportunidad
- **SolutionArchitectureSection**: Arquitectura técnica de la solución
- **DygsomArchitectureAnimation**: Animación interactiva del flujo ML
- **AdvantagesSection**: Ventajas competitivas
- **PricingSection**: Planes y precios
- **TeamSection**: Equipo fundador
- **CallToActionSection**: CTA final
- **Header**: Navegación con logo y menú
- **Footer**: Enlaces y contacto

#### Infraestructura
- **S3 Bucket**: `dygsom-landing-page-dev` (us-east-1)
- **CloudFront Distribution**: `E8UFMILPM5WIL`
- **CloudFront Domain**: `d3rskao5nrdvou.cloudfront.net`
- **SSL Certificate**: AWS Certificate Manager (ACM)
- **DNS Provider**: GoDaddy
- **Custom Domain**: `www.dygsom.pe`

#### Documentación
- `README.md` - Documentación principal
- `ARCHITECTURE.md` - Arquitectura y patrones
- `CONTRIBUTING.md` - Guía de contribución
- `cloud/README.md` - Infraestructura AWS
- `cloud/DEPLOYMENT.md` - Guía de deploy
- `cloud/DOMINIO-SSL-CONFIG.md` - Configuración SSL/DNS
- `cloud/COSTOS-CHECKLIST.md` - Análisis de costos
- `cloud/PERMISOS-REQUERIDOS.md` - Permisos IAM

#### Optimizaciones
- Cache headers optimizados (assets: 1 año, HTML: no-cache)
- Lazy loading de imágenes
- Code splitting automático con Vite
- Tree-shaking de imports no usados
- Minificación de JS y CSS
- SVG para iconografía (menor peso)
- Tailwind CSS purge en producción

#### Seguridad
- HTTPS obligatorio (redirect HTTP → HTTPS)
- Certificado SSL/TLS con renovación automática
- Headers de seguridad configurados
- Política de bucket S3 restrictiva
- Usuario IAM con permisos mínimos necesarios

### Fixed
- 🐛 Configuración incorrecta de CloudFront origin (ahora usa S3 website endpoint)
- 🐛 DNS CNAME apuntando a dominio CloudFront incorrecto
- 🐛 Overlap de nodos en animación de arquitectura
- 🐛 Panel de monitoreo bloqueando visualización
- 🐛 Logo en header sin enlace clickeable

### Changed
- 📝 Actualizadas todas las URLs de producción en documentación
- 📝 Reorganizada estructura de documentación cloud/
- 🎨 Rediseñado componente DygsomArchitectureAnimation con mapa mundial
- 🎨 Reposicionado panel de monitoreo (derecha → izquierda)
- ⚡ Mejorado espaciado entre nodos de arquitectura

### Removed
- 🗑️ Archivos de troubleshooting temporales
- 🗑️ Scripts de diagnóstico de red (ya no necesarios)
- 🗑️ Documentos de recreación de CloudFront (completado)
- 🗑️ Assets por defecto de React no utilizados
- 🗑️ Políticas IAM duplicadas

---

## Próximas Versiones Planificadas

### [1.1.0] - Próximamente
**Fecha estimada:** Diciembre 2025

#### Planned
- [ ] Integración con Google Analytics
- [ ] Formulario de contacto funcional
- [ ] Blog section con posts dinámicos
- [ ] Modo oscuro/claro toggle
- [ ] Animaciones adicionales en scroll
- [ ] Optimización de imágenes WebP
- [ ] Implementación de tests E2E
- [ ] CI/CD con GitHub Actions
- [ ] Monitoreo con CloudWatch

### [1.2.0] - Q1 2026
#### Planned
- [ ] Internacionalización (ES/EN)
- [ ] Portal de clientes
- [ ] Integración con CRM
- [ ] Dashboard de métricas en tiempo real
- [ ] Chat widget con soporte

---

## Notas de Versiones

### Versionado Semántico
Usamos [SemVer](https://semver.org/) para versionar:

- **MAJOR** (X.0.0): Cambios incompatibles con versiones anteriores
- **MINOR** (1.X.0): Nueva funcionalidad compatible con versiones anteriores
- **PATCH** (1.0.X): Bug fixes compatibles con versiones anteriores

### Tipos de Cambios
- **Added**: Nuevas funcionalidades
- **Changed**: Cambios en funcionalidades existentes
- **Deprecated**: Funcionalidades que se eliminarán pronto
- **Removed**: Funcionalidades eliminadas
- **Fixed**: Bug fixes
- **Security**: Fixes de seguridad

---

**Mantenido por:** Equipo DYGSOM  
**Última actualización:** 23 de Noviembre, 2025
