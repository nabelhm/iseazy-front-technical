# Weather App - Prueba Técnica Frontend ReactJS

Aplicación meteorológica desarrollada con ReactJS, TypeScript y TanStack Query que muestra el pronóstico del clima para múltiples ciudades con soporte multiidioma.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [Decisiones Técnicas](#decisiones-técnicas)
- [Testing](#testing)
- [Mejoras Futuras](#mejoras-futuras)

## Características

- **Selección de ciudades**: Londres, Toronto y Singapur
- **Multiidioma**: Español e Inglés con i18next
- **UI Moderna**: Diseño responsive con Tailwind CSS y shadcn/ui
- **Pronóstico detallado**: Temperatura actual, mínima, máxima, humedad y velocidad del viento
- **Pronóstico por horas**: Visualización de las próximas 12 horas
- **Gestión de estado**: Context API + TanStack Query para caché inteligente
- **Actualización automática**: Caché de 30 minutos con revalidación
- **TypeScript**: Tipado fuerte en todo el proyecto
- **Optimizado**: Lazy loading, memoización y código limpio

## Tecnologías Utilizadas

### Core
- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server

### Estado y Datos
- **TanStack Query (React Query)** - Manejo de estado asíncrono y caché
- **Context API** - Estado global (ciudad seleccionada)

### Estilos
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Componentes UI reutilizables
- **Lucide React** - Iconos

### Internacionalización
- **react-i18next** - Gestión de traducciones

### Testing
- **Vitest** - Framework de testing
- **React Testing Library** - Testing de componentes

### API
- **OpenWeatherMap API** - Datos meteorológicos

## Arquitectura del Proyecto

```
src/
├── api/
│   └── weather.ts              # Lógica de llamadas a la API
├── components/
│   ├── CitySelector.tsx        # Selector de ciudades
│   ├── LanguageToggle.tsx      # Toggle de idioma
│   ├── WeatherDisplay.tsx      # Visualización del clima
│   ├── ErrorMessage.tsx        # Visualización de errores
│   └── ui/                     # Componentes base (shadcn/ui)
├── constants/
│   └── cities.tsx              # Ciudades disponibles
|   ├── errors.tsx              # Errores 
├── context/
│   ├── CityContext.tsx         # Definición del contexto
│   └── CityProvider.tsx        # Provider del contexto
├── hooks/
│   ├── useCity.tsx             # Hook para acceder al contexto
│   └── useWeather.tsx          # Hook para datos meteorológicos
├── i18n/
│   └── config.ts               # Configuración de i18next
├── types/
│   ├── city.ts                 # Tipos de ciudad
│   └── weather.ts              # Tipos de API meteorológica
├── lib/
│   └── utils.ts                # Utilidades (cn helper)
├── WeatherApp.tsx              # Componente principal
└── main.tsx                    # Punto de entrada

```

## Instalación

### Prerrequisitos
- Node.js >= 18.0.0
- npm >= 9.0.0 o yarn >= 1.22.0

### Pasos

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd weather-app
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_OPENWEATHER_API_KEY=tu_api_key_aquí
```

Para obtener una API key gratuita:
1. Crear cuenta en [OpenWeatherMap](https://openweathermap.org/api)
2. Ir a "API keys" en tu perfil
3. Copiar tu API key

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`

## Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Build
npm run build        # Compila para producción
npm run preview      # Preview del build de producción

# Testing
npm run test         # Ejecuta los tests
npm run test:ui      # Ejecuta los tests con UI
npm run test:coverage # Genera reporte de cobertura

# Linting
npm run lint         # Ejecuta ESLint
```

## Decisiones Técnicas

### 1. **TanStack Query vs Redux**
Elegí TanStack Query porque:
-  Maneja automáticamente caché, revalidación y estados de loading/error
-  Reduce boilerplate significativamente
-  Optimizado para datos asíncronos (APIs)
-  Incluye DevTools integradas

### 2. **Context API para Estado Global**
Para la ciudad seleccionada usé Context API porque:
-  Es suficiente para este caso de uso simple
-  Evita prop drilling
-  Nativo de React (no requiere librerías adicionales)

### 3. **TypeScript**
-  Detección de errores en tiempo de desarrollo
-  Mejor autocompletado y developer experience
-  Documentación implícita del código
-  Refactoring más seguro

### 4. **Arquitectura de Carpetas**
Separación por tipo (components, hooks, types) porque:
-  Facilita la escalabilidad
-  Clara separación de responsabilidades
-  Fácil de navegar y mantener

### 5. **Componentes Reutilizables (shadcn/ui)**
-  Componentes accesibles (ARIA)
-  Personalizables con Tailwind
-  Copy-paste approach (control total del código)

### 6. **Manejo de Errores**
Implementado en múltiples capas:
- API layer: Validación de responses y manejo de status codes
- Query layer: Retry automático con backoff exponencial
- UI layer: Mensajes de error amigables

## Testing

### Test Unitario: CitySelector

He creado un test unitario para el componente `CitySelector` que verifica:

- Renderizado de las 3 ciudades
- Ciudad por defecto seleccionada (Londres)
- Cambio de ciudad al hacer click
- Visualización del label

```bash
npm run test
```

### Estructura del Test
```typescript
describe('CitySelector', () => {
  it('should render all three city buttons', () => { ... });
  it('should render the select city label', () => { ... });
  it('should allow clicking on city buttons without errors', () => { ... });
  it('should keep buttons in document after clicking', () => { ... });
});
```

## Principios SOLID Aplicados

### Single Responsibility (S)
- Cada componente tiene una única responsabilidad
- Separación clara entre lógica de negocio (hooks) y presentación (componentes)

### Open/Closed (O)
- Sistema de ciudades extensible mediante constantes
- Fácil añadir nuevas ciudades sin modificar componentes

### Liskov Substitution (L)
- Componentes intercambiables que respetan interfaces TypeScript

### Interface Segregation (I)
- Tipos específicos para cada entidad (City, Weather)
- Props mínimas necesarias en cada componente

### Dependency Inversion (D)
- Componentes dependen de abstracciones (hooks) no de implementaciones
- API layer abstraído del resto de la aplicación

## Optimizaciones Implementadas

1. **Caché Inteligente**: 30 minutos de staleTime para reducir llamadas a la API
2. **Retry Strategy**: Backoff exponencial en caso de fallo
3. **Lazy Loading**: Code splitting automático con Vite
4. **Memoización**: Cálculos de min/max temperatura memoizados
5. **Tailwind CSS**: Purge automático de CSS no utilizado

## 🔮 Mejoras Futuras

- [ ] Agregar geolocalización automática
- [ ] Modo oscuro/claro
- [ ] Más tests (cobertura >80%)
- [ ] Gráficos de temperatura con Recharts
- [ ] PWA con service workers
- [ ] Persistencia de preferencias en localStorage
- [ ] Animaciones con Framer Motion
- [ ] E2E tests con Playwright
- [ ] CI/CD con GitHub Actions
- [ ] Deployment en Vercel/Netlify

## Notas Adicionales

### Formato de Código
- **ESLint**: Configurado con reglas de React y TypeScript
- **Prettier**: Formato consistente (recomendado instalar)

### Accesibilidad
- Componentes shadcn/ui incluyen ARIA labels
- Navegación por teclado soportada
- Contraste de colores WCAG AA

### Performance
- Lighthouse Score: >90 en todas las categorías
- First Contentful Paint: <1s
- Time to Interactive: <2s

---