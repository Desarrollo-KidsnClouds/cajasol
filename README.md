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

---

## ¿Cómo se publica? (Despliegue en Vercel)

El flujo es siempre el mismo, tres comandos:

```bash
git add .
git commit -m "descripción de lo que has cambiado"
git push origin main
```

En cuanto subes el código a GitHub (`git push`), **Vercel lo detecta automáticamente y publica la nueva versión** en la web en aproximadamente 1 minuto. No hay que hacer nada más.

La web no necesita ninguna contraseña ni clave secreta para funcionar.

---

## ¿Cómo pasarlo a la cuenta de la empresa? (Migración)

Ahora mismo el proyecto está en una cuenta personal. Para pasarlo a la empresa:

**Paso 1 — Mover el código a GitHub de empresa**
```bash
git remote remove origin
git remote add origin https://github.com/TU-EMPRESA/cajasol.git
git push -u origin main
```

**Paso 2 — Conectar Vercel a ese nuevo repositorio**
1. Entrar en [vercel.com](https://vercel.com) con la cuenta de empresa
2. `Add New Project` → `Import Git Repository` → seleccionar `cajasol`
3. Configuración (Vercel lo detecta solo, pero por si acaso):
   - Framework: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Pulsar **Deploy** → listo

**Paso 3 — Enlazar desde WordPress con el plugin Redirection**

La forma más sencilla si ya tienes una web en WordPress. No hay que tocar DNS ni configurar nada técnico.

1. En WordPress, instalar el plugin gratuito **"Redirection"** (si no lo tienes ya)
2. Ir a **Herramientas → Redirection → Añadir nueva**
3. Rellenar:
   - **URL de origen:** `/cajasol` *(o la ruta que quieras, ej: `/dashboard`)*
   - **URL de destino:** la URL de Vercel donde está el dashboard *(ej: `https://cajasol.vercel.app`)*
4. Tipo de redirección: **301 (Permanente)** → así Google no penaliza el posicionamiento
5. Guardar → funciona al instante

Con esto, cualquiera que entre a `tuweb.es/cajasol` será redirigido automáticamente al dashboard.

> Esta es la opción más rápida. No requiere tocar DNS, no afecta a nada del sitio WordPress actual y se puede deshacer en cualquier momento desde el mismo plugin.

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
