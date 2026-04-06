# Match 5 — Teoría de Color

## Paleta principal

| Token           | Hex       | Uso                                                  |
| --------------- | --------- | ---------------------------------------------------- |
| `primary`       | `#002f23` | Fondo principal de la app (verde oscuro profundo)     |
| `secondary`     | `#005138` | Tarjetas, contenedores, superficies elevadas          |
| `input`         | `#004130` | Fondo de inputs y campos de texto                     |
| `accent`        | `#7ac34a` | Color de acción: botones, enlaces, íconos activos     |
| `accent-light`  | `#97e86a` | Hover/active del accent, efectos de brillo            |
| `text-light`    | `#e6f1dc` | Texto principal sobre fondos oscuros                  |
| `alternate`     | `#57a66f` | Texto secundario, datos complementarios (hora, lugar) |
| `button-text`   | `#002f23` | Texto dentro de botones accent (contraste máximo)     |
| `inactive`      | `#6a9486` | Elementos deshabilitados, placeholders del nav        |

## Filosofía

La paleta se basa en **tonos de verde oscuro** inspirados en el césped de una cancha de fútbol. La idea es transmitir:

- **Profundidad y seriedad** con los fondos oscuros (`primary`, `secondary`, `input`), que forman una jerarquía de capas: fondo → tarjeta → input.
- **Energía y acción** con el `accent` verde lima, que contrasta fuertemente contra los fondos oscuros y atrae la atención hacia botones, CTAs y datos relevantes.
- **Legibilidad** con `text-light`, un blanco verdoso que se integra naturalmente en la paleta sin ser un blanco puro agresivo.

## Jerarquía de fondo (capas)

```
primary (#002f23)     ← Fondo base (más oscuro)
  └─ secondary (#005138)  ← Tarjetas, modales, cards
       └─ input (#004130)    ← Campos de texto, inputs interactivos
```

Cada capa es un verde ligeramente más claro, creando profundidad sutil sin romper la armonía monocromática.

## Uso del accent

El accent (`#7ac34a`) se usa exclusivamente para elementos interactivos y datos destacados:

- **Botones principales** — Fondo accent, texto `button-text` (que es el mismo `primary` para máximo contraste)
- **Links y CTAs** — Texto accent
- **Badges y tags** — Con opacidad (`bg-accent/15 text-accent`)
- **Initials/avatars** — Texto accent sobre fondo `secondary`
- **Indicadores de estado** — Unread count, puntos de notificación

## Tags contextuales (fuera de paleta)

Para diferenciar categorías semánticas se usan colores de Tailwind con opacidades bajas, manteniendo la armonía:

| Categoría      | Color            | Ejemplo                          |
| -------------- | ---------------- | -------------------------------- |
| Recreativo     | `green-400/10`   | Tag verde suave                  |
| Competitivo    | `orange-400/10`  | Tag naranja suave                |
| Flexible       | `sky-400/10`     | Tag celeste suave                |
| Rango de edad  | `violet-400/10`  | Tag violeta suave                |

Estos colores se usan solo en backgrounds con opacidad 10-15%, nunca como fondos sólidos, para no competir con el accent.

## Tipografía

- **Fuente:** Poppins (Google Fonts)
- **Pesos usados:** 400 (normal), 600 (semibold), 700 (bold)
- El font-family está configurado como `sans` default en Tailwind, por lo que aplica en toda la app sin necesidad de clases adicionales.
