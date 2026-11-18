# automatch-demo

Rediseño demo de [automatchnl.com](https://automatchnl.com) preparado por AMOXTLI para presentarlo a Robin (AutoMatch). Conserva los textos, colores, tipografía e ilustraciones del sitio original y añade traducción NL / EN / ES, una narrativa de scroll y un planeador de contacto.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **GSAP 3 + ScrollTrigger** para la coreografía de scroll y **Lenis** para el scroll suave
- **Outfit** (fuente original) servida localmente con `@fontsource-variable/outfit`
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
  layout.tsx       metadatos, script previo al primer pintado (modo de intro)
  page.tsx         composición de secciones + JSON-LD
  globals.css      tokens (cuadrícula 8pt) y estilos
  icon.png         favicon original de AutoMatch (+ apple-icon.png)
components/
  LangProvider     idioma (siempre abre en neerlandés) y diccionarios
  PlannerProvider  estado del planeador (persistido en localStorage)
  Header           menú, scroll-spy, menú móvil, CTA fijo en móvil
  Hero             título, ilustración de Robin, "iris" hacia el recorrido
  Drive            "Hoe werkt het?" como recorrido horizontal fijado
  Why · Services · Reviews · Planner · Footer
  Motion           GSAP + ScrollTrigger + Lenis (se cargan tras el primer pintado)
lib/
  i18n.ts          textos NL / EN / ES, reseñas y paquetes
  scroll.ts        estado compartido de movimiento y helpers de scroll
public/img/        ilustraciones de Robin y del globo
```

## Decisiones

- **Rendimiento:** la intro del hero es CSS puro y las librerías de movimiento se importan después del primer pintado y en tiempo ocioso, así no bloquean el LCP. El loader solo aparece en escritorio, una vez por sesión.
- **Accesibilidad:** áreas táctiles de 44 px o más, foco visible, `prefers-reduced-motion` respetado (sin secciones fijadas; el recorrido se apila en vertical).
- **Espaciado:** cuadrícula de 8 pt con ajustes de 4 pt y márgenes laterales de 16 / 24 / 48 px, siguiendo [ehmo/platform-design-skills](https://github.com/ehmo/platform-design-skills) (Apple HIG + WCAG 2.2).
- **SEO:** metadatos, Open Graph y JSON-LD (`LocalBusiness` con los precios reales). Esta demo lleva `noindex` para no competir con el sitio en producción; quitarlo en `app/layout.tsx` al publicar.

## Lighthouse (build de producción, local)

| | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|
| Móvil | 93 | 100 | 100 | 63* |
| Escritorio | 98 | 100 | 100 | 63* |

\* Solo por el `noindex` intencional de la demo; sin él da 100.

## Pendiente para la versión real

- WhatsApp o correo de Robin para que el planeador envíe la solicitud directamente (hoy muestra el mensaje para copiarlo y enlaza al Google Form actual).
- Texto original con errata: "Dit is combinatie…" (falta "de"); se conservó tal cual.
