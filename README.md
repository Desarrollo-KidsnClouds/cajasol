# Dashboard Cajasol × Kids&Clouds

Panel web ejecutivo del proyecto de patrocinio entre **Fundación Cajasol** y **Kids&Clouds**: objetivos, plan de fases, logros comerciales, cobertura territorial en Andalucía, impacto mediático y formación al sector educativo.

La web es **100 % estática**: no hay base de datos, ni login, ni panel de administración. Todo el contenido vive en archivos del repositorio. Se edita el código o se sustituyen archivos en `public/` y se publica con un **push** a GitHub; Vercel despliega automáticamente en ~1 minuto.

**Producción:** [fundacion-cajasol.vercel.app](https://fundacion-cajasol.vercel.app/)

---

## Cómo publicar cambios

```bash
git add .
git commit -m "Describe el cambio"
git push 
```

Vercel detecta el push y actualiza la web en producción. No hace falta ningún paso adicional.

### Ejemplo: actualizar centros implantados

1. Abrir `src/components/ConversionFunnel.astro`
2. Localizar el array `stages` y cambiar el valor de «Implantados»
3. Guardar y publicar:

```bash
git add .
git commit -m "Actualiza centros implantados"
git push 
```

---

## Cómo está construido

| Tecnología | Rol en el proyecto |
|---|---|
| **[Astro 6](https://astro.build)** | Genera HTML estático. Cada sección es un componente `.astro` independiente. |
| **[Tailwind CSS 4](https://tailwindcss.com)** | Estilos mediante clases utilitarias. |
| **JavaScript inline** | Tema claro/oscuro, navegación, mapa interactivo, lightbox. |
| **[Vercel](https://vercel.com)** | Hosting conectado a GitHub. Cada push a `main` despliega solo. |

**Repositorio:** [github.com/Desarrollo-KidsnClouds/knc_app](https://github.com/Desarrollo-KidsnClouds/cajasol)

---

## Estructura del proyecto

```
Cajasol/
├── src/
│   ├── pages/
│   │   └── index.astro          # Orden de las secciones en la página
│   ├── layouts/
│   │   └── Layout.astro         # HTML base, fuentes, barra inferior móvil
│   ├── components/              # Una sección = un archivo .astro
│   │   ├── Header.astro
│   │   ├── MobileBottomNav.astro
│   │   ├── Hero.astro           # Objetivos (#inicio)
│   │   ├── PresentationVisuals.astro  # Plan / fases (#presentacion)
│   │   ├── ConversionFunnel.astro     # Logros (#embudo)
│   │   ├── FamilyImpact.astro
│   │   ├── Map.astro            # Mapa (#cobertura)
│   │   ├── ImpactSpotlight.astro
│   │   ├── AlliesEcosystem.astro      # Impacto (#repercusion)
│   │   ├── EducationalTraining.astro  # Formación (#formacion)
│   │   ├── Testimonials.astro
│   │   ├── Footer.astro
│   │   └── AppScripts.astro     # JS global
│   ├── data/
│   │   └── navigation.ts        # Enlaces del menú
│   └── styles/
│       ├── global.css
│       └── theme.css
│
└── public/                      # Imágenes, PDFs y SVG (sustituir sin tocar código)
```

**Regla práctica**

- Texto, números o diseño de una sección → `src/components/`
- Imagen o PDF → `public/` (mismo nombre de archivo)
- Orden de secciones → `src/pages/index.astro`
- Menú de navegación → `src/data/navigation.ts`

---

## Orden de las secciones

| Orden | Componente | Ancla | Menú |
|---|---|---|---|
| 1 | `Hero` | `#inicio` | Objetivos |
| 2 | `PresentationVisuals` | `#presentacion` | Plan |
| 3 | `ConversionFunnel` | `#embudo` | Logros |
| 4 | `FamilyImpact` | — | — |
| 5 | `Map` | `#cobertura` | Mapa |
| 6 | `ImpactSpotlight` | — | — |
| 7 | `AlliesEcosystem` | `#repercusion` | Impacto |
| 8 | `EducationalTraining` | `#formacion` | — |
| 9 | `Testimonials` | — | — |
| 10 | `Footer` | — | — |

---

## Guía de contenido: qué archivo tocar

| Quiero cambiar… | Archivo |
|---|---|
| KPIs del inicio (centros, familias, badges) | `src/components/Hero.astro` |
| Fases Q1–Q4 y timeline del plan | `src/components/PresentationVisuals.astro` |
| Embudo «Del contacto a la implantación» | `src/components/ConversionFunnel.astro` |
| Impacto en familias | `src/components/FamilyImpact.astro` |
| Mapa y provincias | `src/components/Map.astro` |
| Convenio ACES y estadísticas | `src/components/AlliesEcosystem.astro` |
| Webinars y formación | `src/components/EducationalTraining.astro` |
| Repercusión mediática | `src/components/Testimonials.astro` |
| Pie de página y contacto | `src/components/Footer.astro` |
| Menú superior e inferior (móvil) | `src/data/navigation.ts` |
| PDF «Ver presentación» | `public/Cajasol_mkt.pdf` |
| Nota de prensa descargable | `public/Cajasol nota de prensa.docx` |
| Logos | `public/logo_web_nuevo.png`, `public/Logo_Fundación_Cajasol.png` |

---

## Notas útiles

- **No hay CMS:** busca el texto o número en el editor y cámbialo directamente en el `.astro` correspondiente.
- **Imágenes y PDFs:** sustituye el archivo en `public/` manteniendo el mismo nombre.
- **Menú móvil:** los iconos y enlaces se definen en `src/data/navigation.ts`.

---

## Resumen

```
Editar archivo  →  git add .  →  git commit  →  git push  →  Vercel publica
```
