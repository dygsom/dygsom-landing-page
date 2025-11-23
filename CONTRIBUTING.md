# Guía de Contribución

Guía para desarrolladores que trabajen en el proyecto DYGSOM Landing Page.

## 📋 Tabla de Contenidos

- [Configuración Inicial](#configuración-inicial)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Estándares de Código](#estándares-de-código)
- [Estructura de Commits](#estructura-de-commits)
- [Testing](#testing)
- [Deploy](#deploy)

## 🚀 Configuración Inicial

### Prerequisitos

- **Node.js**: v18 o superior
- **npm**: v9 o superior
- **Git**: Última versión
- **AWS CLI**: Configurado con profile `dygsom-dev`
- **Editor**: VS Code (recomendado)

### Setup del Proyecto

```bash
# 1. Clonar repositorio
git clone https://github.com/dygsom/dygsom-landing-page.git
cd dygsom-landing-page

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.development .env

# 4. Iniciar servidor de desarrollo
npm run dev
```

### Extensiones VS Code Recomendadas

- **ESLint** - Linting
- **Prettier** - Formateo de código
- **Tailwind CSS IntelliSense** - Autocomplete Tailwind
- **TypeScript Vue Plugin** - TypeScript support
- **Auto Rename Tag** - Rename HTML tags
- **Path Intellisense** - Autocomplete paths

## 🔄 Flujo de Trabajo

### 1. Crear Feature Branch

```bash
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/descripcion-del-fix
```

### 2. Desarrollo Local

```bash
# Iniciar dev server
npm run dev

# En otra terminal, watch de tipos
npm run type-check -- --watch
```

### 3. Commits Frecuentes

```bash
git add .
git commit -m "feat: descripción clara del cambio"
```

### 4. Build y Test Local

```bash
# Build de producción
npm run build

# Preview del build
npm run preview

# Verificar que no hay errores de TypeScript
npm run type-check

# Lint
npm run lint
```

### 5. Push y Merge

```bash
git push origin feature/nombre-descriptivo
# Crear Pull Request en GitHub
# Después de review y aprobación, merge a main
```

### 6. Deploy a Producción

```bash
# Asegurarse de estar en main actualizado
git checkout main
git pull origin main

# Deploy
.\cloud\deploy-s3.ps1  # Windows
./cloud/deploy-s3.sh   # Unix
```

## 📝 Estándares de Código

### TypeScript

```typescript
// ✅ BUENO: Interfaces para props
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

// ✅ BUENO: Componente funcional tipado
const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick }) => {
  return <button className={`btn-${variant}`} onClick={onClick}>{children}</button>;
};

// ❌ MALO: Props sin tipar
const Button = ({ children, variant, onClick }) => { ... };
```

### Naming Conventions

```typescript
// Componentes: PascalCase
const HeroSection = () => { ... };
const FeatureCard = () => { ... };

// Variables y funciones: camelCase
const isLoading = true;
const handleClick = () => { ... };

// Constantes: UPPER_SNAKE_CASE
const API_URL = "https://api.dygsom.pe";
const MAX_RETRIES = 3;

// Archivos de componentes: PascalCase.tsx
// HeroSection.tsx
// FeatureCard.tsx

// Archivos de utilities: camelCase.ts
// formatDate.ts
// apiClient.ts
```

### Tailwind CSS

```tsx
// ✅ BUENO: Classes ordenadas lógicamente
<div className="
  flex items-center justify-between
  w-full max-w-7xl
  px-4 py-6
  bg-dygsom-dark
  border-b border-gray-800
">
  ...
</div>

// ❌ MALO: Classes desordenadas
<div className="bg-dygsom-dark flex py-6 border-b w-full px-4 items-center max-w-7xl border-gray-800 justify-between">
```

**Orden recomendado:**
1. Layout (flex, grid, block)
2. Position (absolute, relative)
3. Sizing (w-, h-, max-w-)
4. Spacing (m-, p-)
5. Typography (text-, font-)
6. Backgrounds (bg-)
7. Borders (border-)
8. Effects (shadow-, opacity-)
9. Transitions (transition-, duration-)

### Componentes

```tsx
// ✅ BUENO: Componente simple y reutilizable
interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, icon }) => {
  return (
    <div className="p-6 bg-slate-800 rounded-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

// ❌ MALO: Componente con lógica hardcodeada
export const Card = () => {
  return (
    <div className="p-6 bg-slate-800 rounded-lg">
      <FaShield />
      <h3>Security</h3>
      <p>We keep your data safe</p>
    </div>
  );
};
```

### Imports

```typescript
// ✅ BUENO: Imports organizados
// 1. React/External libraries
import React, { useState, useEffect } from 'react';
import { FaShield, FaRocket } from 'react-icons/fa';

// 2. Internal components
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

// 3. Types
import type { UserData } from '@/types';

// 4. Styles (si no usas Tailwind inline)
import './styles.css';

// ❌ MALO: Imports desordenados
import { Card } from '../ui/Card';
import React from 'react';
import './styles.css';
import { FaShield } from 'react-icons/fa';
```

## 📦 Estructura de Commits

Usamos **Conventional Commits** para mensajes claros y consistentes.

### Formato

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- **feat**: Nueva funcionalidad
- **fix**: Bug fix
- **docs**: Cambios en documentación
- **style**: Cambios de formato (espacios, comas, etc.)
- **refactor**: Refactorización de código
- **perf**: Mejoras de performance
- **test**: Agregar o modificar tests
- **chore**: Cambios en build, configs, etc.

### Ejemplos

```bash
# Feature nueva
git commit -m "feat(hero): agregar botón de demo interactivo"

# Bug fix
git commit -m "fix(header): corregir navegación en mobile"

# Documentación
git commit -m "docs(readme): actualizar instrucciones de deploy"

# Refactor
git commit -m "refactor(button): simplificar lógica de variantes"

# Performance
git commit -m "perf(images): lazy load para team photos"

# Chore
git commit -m "chore(deps): actualizar React a v18.2.0"
```

### Scope (opcional)

El scope identifica qué parte del código se modificó:

- `hero` - HeroSection
- `header` - Header component
- `footer` - Footer component
- `pricing` - PricingSection
- `team` - TeamSection
- `deploy` - Scripts de deploy
- `docs` - Documentación
- `config` - Configuraciones (vite, tailwind, etc.)

## 🧪 Testing

### Testing Manual (Actual)

```bash
# 1. Verificar en desarrollo
npm run dev
# Abrir http://localhost:5173

# 2. Verificar build de producción
npm run build
npm run preview

# 3. Verificar diferentes viewports
# - Desktop (1920x1080)
# - Tablet (768x1024)
# - Mobile (375x667)

# 4. Verificar navegadores
# - Chrome
# - Firefox
# - Safari (si tienes macOS)
# - Edge
```

### Checklist de Testing

- [ ] Página carga sin errores
- [ ] Logo clickeable lleva a inicio
- [ ] Navegación smooth scroll funciona
- [ ] Todos los botones CTA funcionan
- [ ] Animación de arquitectura se reproduce
- [ ] Formularios validan correctamente
- [ ] Imágenes cargan correctamente
- [ ] Responsive en mobile, tablet y desktop
- [ ] No hay console errors
- [ ] Performance Lighthouse > 90

### Testing Automatizado (Futuro)

```bash
# Unit tests (cuando se implementen)
npm run test

# E2E tests (cuando se implementen)
npm run test:e2e
```

## 🚢 Deploy

### Pre-Deploy Checklist

- [ ] `git status` está limpio (no uncommitted changes)
- [ ] Estás en branch `main`
- [ ] Build local exitoso (`npm run build`)
- [ ] No hay errores de TypeScript (`npm run type-check`)
- [ ] No hay errores de ESLint (`npm run lint`)
- [ ] Preview local se ve correcto (`npm run preview`)

### Deploy a Producción

```bash
# Windows
.\cloud\deploy-s3.ps1

# Linux/macOS
./cloud/deploy-s3.sh
```

### Post-Deploy Verification

```bash
# 1. Verificar URL producción
curl -I https://www.dygsom.pe

# 2. Verificar CloudFront
curl -I https://d3rskao5nrdvou.cloudfront.net

# 3. Abrir en navegador
# https://www.dygsom.pe
```

### Rollback (si es necesario)

```bash
# 1. Volver a commit anterior
git revert HEAD
git push origin main

# 2. Re-deploy
.\cloud\deploy-s3.ps1
```

## 🐛 Debugging

### Errores Comunes

#### Build Falla

```bash
# Limpiar y reinstalar
rm -rf node_modules dist
npm install
npm run build
```

#### TypeScript Errors

```bash
# Verificar tipos
npm run type-check

# Ver errores detallados
npx tsc --noEmit
```

#### Deploy Falla

```bash
# Verificar AWS CLI
aws sts get-caller-identity --profile dygsom-dev

# Verificar permisos S3
aws s3 ls s3://dygsom-landing-page-dev --profile dygsom-dev
```

### Herramientas de Debug

```typescript
// Console logs (remover antes de commit)
console.log('Debug:', variable);

// React DevTools
// Instalar extensión: https://react.dev/learn/react-developer-tools

// Lighthouse (Performance)
// Chrome DevTools > Lighthouse tab
```

## 📚 Recursos Adicionales

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [AWS S3 Static Website](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🤝 Código de Conducta

- Ser respetuoso con otros desarrolladores
- Hacer code reviews constructivas
- Documentar cambios significativos
- Mantener el código limpio y legible
- Seguir los estándares del proyecto
- Preguntar cuando tengas dudas

## 📞 Contacto

Si tienes preguntas o necesitas ayuda:

- **Email**: dev@dygsom.pe
- **Slack**: #dygsom-dev (interno)
- **GitHub Issues**: Para bugs y features

---

**Happy Coding! 🚀**

*Última actualización: 23 de Noviembre, 2025*
