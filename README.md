# automatch-demo

Rediseño demo de [automatchnl.com](https://automatchnl.com) preparado por AMOXTLI para presentarlo a Robin (AutoMatch). Conserva los textos, colores, tipografía e ilustraciones del sitio original y añade traducción NL / EN / ES, una narrativa de scroll y un planeador de contacto.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **GSAP 3 + ScrollTrigger** para la coreografía de scroll y **Lenis** para el scroll suave
- **Outfit** (fuente original) servida localmente con `next/font/local`
- CSS propio con tokens de diseño (`app/globals.css`); sin framework de componentes

## Scripts

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run start
npm run lint    # comprobación de tipos
```

## Estructura

```
app/
  [lang]/layout.tsx   layout raíz por idioma: <html lang>, metadatos, fuente, script previo al primer pintado
  [lang]/page.tsx     composición de secciones + JSON-LD por idioma
  robots.ts · sitemap.ts · manifest.ts
  icon.png · apple-icon.png   favicon original de AutoMatch
  fonts/              Outfit (variable, OFL) servida con next/font/local
  globals.css         tokens (cuadrícula 8 pt) y estilos
proxy.ts              "/" = neerlandés (rewrite a /nl), /nl → 308 a "/", visitantes con idioma guardado → /en o /es
components/           Header, Hero, Drive, Why, Services, Reviews, Planner, Footer, Motion…
lib/
  i18n.ts             textos NL / EN / ES, reseñas y paquetes
  seo.ts              títulos, descripciones, palabras clave, metadatos y JSON-LD por idioma
  lang-cookie.ts      cookie am-lang (último idioma elegido)
  scroll.ts           estado compartido de movimiento y helpers de scroll
public/og/            imágenes para compartir 1200×630 por idioma
public/icons/         iconos del manifest
```

## Idiomas y URLs

| Idioma | URL | Notas |
|---|---|---|
| Neerlandés | `/` | Idioma por defecto y `x-default`. `/nl` redirige aquí. |
| Inglés | `/en` | |
| Español | `/es` | |

La primera visita siempre abre en neerlandés. Al cambiar de idioma se guarda en la cookie `am-lang` y la URL cambia sin recargar; al volver a `/`, el visitante va a su último idioma. Los buscadores (sin cookie) siempre ven neerlandés en `/`.

## Diseño y rendimiento

- Intro del hero en CSS puro; GSAP, ScrollTrigger y Lenis se importan después del primer pintado y su configuración se arma por etapas. Loader solo en escritorio, una vez por sesión.
- `prefers-reduced-motion`: sin secciones fijadas, el recorrido se apila en vertical.
- Cuadrícula de 8 pt con ajustes de 4 pt, márgenes 16 / 24 / 48 px y áreas táctiles de 44 px o más, siguiendo [ehmo/platform-design-skills](https://github.com/ehmo/platform-design-skills) (Apple HIG + WCAG 2.2).

## SEO

- **Metadatos por idioma** (`lib/seo.ts`): título 53–60 caracteres, descripción 149–158, palabras clave por intención de búsqueda, canonical, `hreflang` (nl, en, es, x-default), Open Graph y Twitter con imagen propia 1200×630.
- **Datos estructurados** (un `@graph` con `@id` estables): `AutomotiveBusiness`, tres `Service` con su `Offer` en EUR, `WebSite` y `WebPage` con `inLanguage`. Solo datos publicados por el cliente; sin valoraciones ni reseñas marcadas (Google no admite reseñas propias del negocio).
- **Rastreo:** `robots.txt`, `sitemap.xml` con alternativas por idioma y `manifest.webmanifest`.
- **Contenido:** un solo `h1` por página, jerarquía `h2`/`h3` sin saltos, `lang` en cada reseña, `alt` en todas las imágenes.
- **Indexación opt-in:** con `SITE_INDEXABLE=true` el sitio se indexa; sin esa variable (previews, demo) va con `noindex` y `robots.txt` bloquea todo. Ver `.env.example`.

## Lighthouse (build de producción local, `SITE_INDEXABLE=true`)

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|
| `/` móvil | 86–89 | 100 | 100 | 100 |
| `/en` móvil | 93 | 100 | 100 | 100 |
| `/es` móvil | 97 | 100 | 100 | 100 |
| `/` escritorio | 98 | 100 | 100 | 100 |

CLS 0 en todas. El rendimiento móvil varía entre corridas por la simulación de red/CPU de Lighthouse; en `/` el LCP es la ilustración de Robin (22 KB, precargada).

## Después de publicar

1. Configurar `NEXT_PUBLIC_SITE_URL` y `SITE_INDEXABLE=true` en producción.
2. Alta en Google Search Console (opcional: `NEXT_PUBLIC_GSC_VERIFICATION`), enviar `sitemap.xml` y pedir indexación de `/`, `/en` y `/es`.
3. Crear o reclamar el perfil de Google Business con el mismo nombre y zona de servicio, y enlazar el sitio.
4. Analítica (GA4 o similar) midiendo la acción principal: envío del planeador y clic en contacto.
5. Pedir reseñas reales en Google a los clientes que ya dieron testimonio.
6. Contenido futuro: una página por servicio y guías para expats (por ejemplo, cómo comprar un auto usado en Países Bajos), cada una con su propio título, descripción y `h1`.

## Pendiente para la versión real

- WhatsApp o correo de Robin para que el planeador envíe la solicitud directamente (hoy muestra el mensaje para copiarlo y enlaza al Google Form actual).
- Texto original con errata: "Dit is combinatie…" (falta "de"); se conservó tal cual.
