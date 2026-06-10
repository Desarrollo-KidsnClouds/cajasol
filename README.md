# Dashboard Cajasol × Kids&Clouds

Panel web ejecutivo que muestra en tiempo real el avance del proyecto Kids&Clouds con Fundación Cajasol: centros firmados, alumnos, familias beneficiadas y fases del proyecto.

---

## ¿Cómo está construido? (Stack técnico)

Piénsalo como una web normal, pero generada de forma inteligente:

- **Astro** → Es el "motor" que construye la web. Genera páginas HTML estáticas (sin servidor, sin base de datos). Cada sección de la web es un fichero `.astro` independiente.
- **Tailwind CSS** → Sistema de estilos. En lugar de escribir CSS tradicional, se usan clases directamente en el HTML (`text-xl`, `bg-amber-500`, etc.).
- **Vercel** → La plataforma donde está publicada la web. Cada vez que se sube un cambio a GitHub, Vercel lo despliega automáticamente en ~1 minuto.

> **Importante:** Esta web es 100% estática. No hay base de datos, no hay servidor, no hay login. Todo el contenido está escrito directamente en los archivos de código.

---

## ¿Dónde está cada cosa? (Estructura de archivos)

```
cajasol/
│
├── src/components/          ← AQUÍ están todas las secciones de la web
│   ├── Hero.astro               → Cabecera: KPIs, badges, presentación
│   ├── PresentationVisuals.astro → Sección FASES (timeline Q1-Q4)
│   ├── ConversionFunnel.astro   → Embudo "Del contacto a la implantación"
│   ├── Map.astro                → Mapa de Andalucía + alumnos + familias
│   ├── AlliesEcosystem.astro    → Convenio con ACES
│   ├── Testimonials.astro       → Repercusión mediática (3 cards)
│   ├── Header.astro             → Barra de navegación superior
│   ├── Footer.astro             → Pie de página
│   └── AppScripts.astro         → Código JS: tema oscuro/claro, mapa, lightbox
│
├── src/pages/index.astro    ← AQUÍ se decide el ORDEN de las secciones
│
├── src/styles/
│   ├── global.css           ← Estilos generales: animaciones, espaciado
│   └── theme.css            ← Colores y tipografía del proyecto
│
└── public/                  ← Archivos que se sirven directamente (imágenes, PDFs)
    ├── imagen.png               → Foto del timeline de FASES
    ├── andalusia-interactive.svg → El mapa SVG de Andalucía
    ├── Cajasol_mkt.pdf
    └── Alianza_knc.pdf
```

**Regla simple:** si algo se ve en la web, está en `src/components/`. Si es una imagen o PDF, está en `public/`.

---

## ¿Cómo arrancar en local? (Para ver la web en tu ordenador)

Necesitas tener **Node.js** instalado (es gratis, se descarga en [nodejs.org](https://nodejs.org)).

```bash
# Paso 1: Instalar las dependencias del proyecto (solo la primera vez)
npm install

# Paso 2: Arrancar el servidor de desarrollo
npm run dev
# → Abre el navegador en: http://localhost:4321
```

Mientras el servidor está corriendo, cualquier cambio que hagas en el código se refleja al instante en el navegador sin recargar.

```bash
# Otros comandos útiles:
npm run build      # Genera la versión final de producción (carpeta /dist)
npm run preview    # Previsualiza esa versión final en local
```



## Repositorio y despliegue en la cuenta de empresa



---



### Paso 1 — Subir el código al repositorio

Abre una terminal en la carpeta del proyecto y ejecuta estos comandos uno a uno:

```bash
# Inicializar Git en la carpeta (solo si no está ya inicializado)
git init

# Apuntar al repositorio de empresa 
git remote add origin https://github.com/Desarrollo-KidsnClouds/knc_app.git

# Añadir todos los archivos
git add .

# Crear el primer commit (instantánea del proyecto)
git commit -m "primer commit"

# Subir el código a GitHub
git push -u origin main
```

> Si Git te pide usuario y contraseña de GitHub, introduce los de la cuenta de empresa. Si falla la autenticación, GitHub recomienda usar un **Personal Access Token** en lugar de contraseña: puedes crearlo en *GitHub → Settings → Developer settings → Personal access tokens*.

Cuando termine, entra en [github.com/Desarrollo-KidsnClouds/knc_app](https://github.com/Desarrollo-KidsnClouds/knc_app) y verás todos los archivos del proyecto ahí.

---

### Paso 2 — Conectar Vercel al repositorio

Vercel es quien toma el código de GitHub y lo convierte en una web pública automáticamente.

1. Entrar en [vercel.com](https://vercel.com) con la cuenta de empresa
2. Pulsar **"Add New Project"**
3. En la sección *Import Git Repository*, seleccionar **GitHub** y autorizar el acceso a la organización/empresa
4. Buscar y seleccionar el repositorio `cajasol`
5. Vercel detecta que es un proyecto Astro solo. Confirmar la configuración:
   - Framework Preset: **Astro**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Pulsar **"Deploy"**

Vercel tardará ~1 minuto en construir y publicar la web. Al terminar te dará una URL del estilo `cajasol.vercel.app`. **La web ya está publicada.**

A partir de ahora, cada `git push` que hagas actualizará la web automáticamente.

---

### Paso 3 —  Enlazar desde WordPress con el plugin Redirection

El objetivo es que la web sea accesible en `kidsandclouds.es/cajasol`. Para conseguirlo sin tocar el dominio principal ni la web de WordPress:

1. En WordPress, instalar el plugin gratuito **"Redirection"** (si no lo tienes ya)
2. Ir a **Herramientas → Redirection → Añadir nueva**
3. Rellenar:
   - **URL de origen:** `/cajasol`
   - **URL de destino:** la URL de Vercel donde está publicado el dashboard *(ej: `https://cajasol.vercel.app`)*
4. Tipo de redirección: **301 (Permanente)** → así Google no penaliza el posicionamiento
5. Guardar → funciona al instante

A partir de ese momento, cualquiera que entre a `kidsandclouds.es/cajasol` será redirigido automáticamente al dashboard.

> No requiere tocar DNS, no afecta al resto del sitio WordPress y se puede deshacer en cualquier momento desde el mismo plugin.

---

## ¿Cómo actualizar los datos? (Guía de contenido)

Todo se cambia editando los archivos `.astro` correspondientes. No hay formularios ni panel de administración.

| Qué quiero cambiar | Abro este archivo |
|---|---|
| Número de centros, familias, KPIs del inicio | `src/components/Hero.astro` |
| Las fases Q1, Q2, Q3, Q4 y la línea de progreso | `src/components/PresentationVisuals.astro` |
| El embudo "Del contacto a la implantación" | `src/components/ConversionFunnel.astro` |
| El mapa, alumnos por provincia, barra de familias | `src/components/Map.astro` |
| El convenio ACES y sus estadísticas | `src/components/AlliesEcosystem.astro` |
| Las cards de repercusión mediática | `src/components/Testimonials.astro` |
| La imagen de la sección FASES | Reemplazar `public/imagen.png` (mismo nombre) |
| Los PDFs descargables | Reemplazar los archivos en `public/` (mismo nombre) |

**Ejemplo práctico** — Actualizar el número de centros implantados:
1. Abrir `src/components/ConversionFunnel.astro`
2. Buscar el número y cambiarlo
3. Guardar y hacer push:
```bash
git add .
git commit -m "actualiza centros implantados"
git push origin main
```
Vercel publica el cambio automáticamente.
