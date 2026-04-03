# Match 5 — Roadmap de Desarrollo

## Estado actual del proyecto

Match 5 es una app para organizar partidos de fútbol 5 (y variantes) en la zona de Sarandí/Avellaneda. Actualmente cuenta con:

- ✅ Registro de usuario (UI)
- ✅ Home con partidos próximos y cercanos
- ✅ Mapa interactivo con marcadores (Leaflet)
- ✅ Vista detalle de partido con cancha 2D y formaciones
- ✅ Unirse a un partido / cambiar posición
- ✅ Perfiles de jugadores con rating y reseñas
- ✅ Mi Perfil con datos personales y estadísticas
- ✅ Crear partido (formulario UI)
- ✅ Navegación inferior (Home, Mapa, Chat, Perfil)

---

## Próximos pasos

### 1. Modal de puntuación de jugadores ⭐
Después de que un partido finalice, permitir calificar a los compañeros en base a su actitud y convivencia.

- Modal que aparece al terminar un partido (o desde el historial)
- Lista de jugadores del partido con selector de estrellas (1-5)
- Las estrellas miden **compañerismo y actitud** (buena onda, correcciones constructivas, respeto, atención al grupo), NO habilidad futbolística
- Comentario opcional por jugador
- Botón de enviar que guarde las reseñas
- Animación de confirmación al puntuar

### 2. Chat entre jugadores 💬
El tab de Chat en la navbar aún no tiene pantalla.

- Lista de conversaciones (por partido o directas)
- Chat grupal por partido para coordinar antes de jugar
- Mensajes con timestamp y avatar del remitente
- Notificación de mensajes no leídos (badge en navbar)
- Posibilidad de chat directo entre dos jugadores

### 3. Notificaciones 🔔
Mantener a los jugadores informados.

- Notificación cuando alguien se une a tu partido
- Recordatorio antes de que empiece un partido (1-2 hs antes)
- Aviso cuando te califican o te dejan una reseña
- Pantalla de centro de notificaciones o badge en navbar

### 4. Historial de partidos 📋
Registro de partidos jugados.

- Sección en Mi Perfil o pantalla dedicada
- Lista de partidos pasados con fecha, cancha y resultado
- Detalle del partido pasado mostrando equipos y puntuaciones
- Filtros por fecha o cancha

### 5. Editar perfil ✏️
El botón de editar ya existe en Mi Perfil pero no hace nada aún.

- Formulario para cambiar nombre, posición, teléfono, foto
- Subir foto de perfil (o elegir avatar)
- Cambiar contraseña
- Validaciones de campos

### 6. Flujo completo de creación de partido ⚽
El formulario de crear partido no persiste ni se conecta con la data.

- Al crear, agregar el partido a la lista y al mapa
- Selector de ubicación en mapa (pick point)
- Elegir tipo de partido (5v5, 6v6, 7v7, etc.)
- Definir si es público o privado (con código de invitación)
- Estado del partido: abierto, lleno, en curso, finalizado

### 7. Sistema de autenticación real 🔐
Reemplazar mocks por auth genuina.

- Login / Registro con backend (JWT o sesiones)
- Persistir sesión del usuario
- Proteger rutas privadas (redirect a /register si no logueado)
- Recuperar contraseña

### 8. Backend y persistencia 🗄️
Actualmente toda la data es mock.

- API REST o GraphQL para partidos, usuarios, reseñas
- Base de datos (PostgreSQL / MongoDB)
- Endpoints: CRUD partidos, unirse/salir, calificar, chat
- WebSockets para chat en tiempo real y actualizaciones del partido

### 9. Mejoras en el mapa 🗺️
Llevar el mapa al siguiente nivel.

- Geolocalización del usuario (mostrar "Estás acá")
- Filtrar partidos por distancia, horario o disponibilidad
- Marcadores custom con colores según estado (abierto/lleno/en curso)
- Cluster de marcadores cuando hay muchos en la misma zona
- Botón "Cómo llegar" que abra Google Maps/Waze

### 10. Invitaciones y compartir 📤
Facilitar que los jugadores inviten amigos.

- Compartir un partido por WhatsApp / link
- Código de invitación para partidos privados
- Invitar jugadores favoritos directamente desde su perfil
- Deep links que abran la app en el partido correcto

### 11. Sistema de reputación y niveles 🏆
Gamificación para incentivar el buen juego.

- Niveles basados en partidos jugados (Principiante → Leyenda)
- Badges por logros (primer gol, 10 partidos, mejor puntuación)
- Ranking de jugadores por zona
- Indicador de confiabilidad (no falta a los partidos)

### 12. Mejoras de UX 🎨
Pulir la experiencia general.

- Pull-to-refresh en Home
- Skeleton loaders mientras carga la data
- Empty states con ilustraciones (sin partidos, sin reseñas)
- Transiciones entre pantallas (page transitions)
- Dark/light mode toggle
- Onboarding para nuevos usuarios (slides explicativos)

### 13. Filtro y rango de edad por partido 🎂
Permitir que cada partido defina un rango de edad para que los jugadores se encuentren con gente de su generación.

**¿Por qué?**
Un jugador de 18 quiere jugar con gente de su edad (ej: 18-25), y uno de 35 prefiere su rango (ej: 30-50). Esto mejora la experiencia y reduce conflictos de intensidad/ritmo de juego.

**Modelo de datos:**
- `User`: agregar campo `birthDate` (fecha de nacimiento), se calcula la edad dinámicamente
- `MatchData`: agregar `ageRange?: { min: number; max: number }` (opcional — si no se define, el partido es "Libre" / todas las edades)

**Flujo propuesto:**
1. **Crear partido** — Al crear, opción de definir rango de edad con presets rápidos:
   - Sub-20 (15-20), Jóvenes (18-25), Adultos (25-35), Veteranos (30-50), Libre (sin límite)
   - También permitir rango custom (sliders min/max)
2. **Unirse a un partido** — Si el jugador está fuera del rango:
   - Soft block: aviso "Este partido es para 18-25 años. ¿Querés unirte igual?" (el creador decide si acepta)
   - O hard block configurable por el creador del partido
3. **Home / Mapa / Listados** — Filtro por compatibilidad de edad:
   - Toggle "Mostrar solo partidos para mi edad" (default ON)
   - Badge en la card del partido: "18-25" o "Libre"
4. **Perfil** — Mostrar edad (calculada desde birthDate), no editable directamente

**Consideraciones:**
- La edad se calcula desde `birthDate`, nunca se guarda un número estático
- El rango es propiedad del partido, no del usuario (un jugador de 28 puede crear un partido "25-35" o uno "Libre")
- Los presets son sugerencias, el creador siempre puede ajustar el rango
- En el mapa, los marcadores podrían usar colores/iconos distintos para partidos dentro o fuera de tu rango
- Tolerancia: considerar ±1-2 años de margen para no ser demasiado estricto

**Implementación por fases:**
- **Fase 1 (UI mock):** Agregar `birthDate` al usuario mock, selector de rango en CreateGame, badge en GameCard
- **Fase 2 (Filtros):** Filtro en Home y Mapa, lógica de compatibilidad
- **Fase 3 (Restricciones):** Soft/hard block al unirse, configuración del creador

### 14. Intensidad de partido (nivel de juego) 🔥
Permitir que cada partido y cada jugador definan su estilo de juego preferido para emparejar expectativas y evitar conflictos.

**¿Por qué?**
No todos buscan lo mismo al jugar. Hay gente que viene a pasarla bien y gente que quiere competir. Cuando se mezclan sin aviso, surgen conflictos: "es muy malo", "no corre", "se lo toma muy en serio". La solución no es medir habilidad (eso ya lo hacen las estrellas), sino emparejar **expectativas de intensidad**.

**Modelo de datos:**
- `User`: agregar campo `playStyle: "recreational" | "competitive" | "mixed"` (preferencia personal)
- `MatchData`: agregar `intensity?: "recreational" | "competitive" | "mixed"` (definido por el creador)

**Las 3 categorías:**
| Intensidad | Emoji | Descripción | Mensaje al jugador |
|------------|-------|-------------|-------------------|
| Recreativo | ⚽ | Para disfrutar, sin presión | "Vengo a pasarla bien" |
| Competitivo | 🔥 | Para jugar en serio, ganar importa | "Vengo a competir" |
| Mixto | ⚡ | Flexible, se adapta al grupo | "Me adapto al partido" |

**Flujo propuesto:**
1. **Registro / Perfil** — El jugador elige su estilo de juego preferido (se puede cambiar cuando quiera)
2. **Crear partido** — Al crear, elegir intensidad del partido con las 3 opciones (default: Mixto)
3. **Unirse a un partido** — Si la preferencia del jugador no coincide con la intensidad del partido:
   - Info sutil: ícono + tooltip "Este partido es competitivo, ¿te copa?"
   - Sin bloqueo: cualquiera puede unirse, pero sabe qué esperar
4. **Home / Mapa / Listados** — Badge de intensidad en cada card del partido
   - Filtro opcional: "Mostrar solo partidos que matchean con mi estilo"
5. **Perfil público** — Mostrar el estilo de juego del jugador junto a su posición

**Diferencia clave con el sistema de rating (⭐):**
- Las **estrellas** miden **actitud y convivencia**: si es buen compañero, si corrige constructivamente, si tiene buena onda, si es atento con el grupo → reputación social
- La **intensidad** es lo que **vos buscás** antes de jugar → expectativa de ritmo/competitividad
- Un jugador puede tener 5⭐ (excelente persona) y preferir Recreativo
- Un jugador puede tener 3⭐ (a veces se calienta) y preferir Competitivo
- Las estrellas NO miden habilidad futbolística — un jugador técnicamente limitado puede tener 5⭐ si es un gran compañero

**Consideraciones:**
- No es un juicio de valor — Recreativo no es "peor" que Competitivo
- El estilo es del jugador pero la intensidad es del partido (un jugador Competitivo puede crear un partido Recreativo)
- A futuro, se puede combinar con el rango de edad para filtros más precisos (ej: "Jóvenes + Competitivo")
- Posibilidad de que el creador marque "Solo jugadores afines" (soft filter)
- En el mapa, los marcadores podrían tener el emoji de intensidad

**Implementación por fases:**
- **Fase 1 (UI mock):** Agregar `playStyle` al usuario, selector en CreateGame, badge en GameCard, mostrar en perfil
- **Fase 2 (Filtros):** Filtro combinado con edad en Home y Mapa
- **Fase 3 (Matching inteligente):** Sugerencias de partidos basadas en edad + intensidad + ubicación

---

## Prioridad sugerida

| Prioridad | Feature | Razón |
|-----------|---------|-------|
| 🔴 Alta | Modal de puntuación | Core de la app — la reputación mejora la experiencia |
| 🔴 Alta | Chat grupal por partido | Esencial para coordinarse |
| 🔴 Alta | Flujo completo de crear partido | Sin esto no hay contenido real |
| 🟡 Media | Historial de partidos | Complementa el perfil y las stats |
| 🟡 Media | Editar perfil | Necesario antes de ir a producción |
| 🟡 Media | Mejoras en el mapa | Diferenciador clave de la app |
| 🟡 Media | Notificaciones | Retención de usuarios |
| 🔵 Baja | Backend y auth | Cuando se quiera salir de prototipo |
| 🔵 Baja | Invitaciones y compartir | Growth — después de tener el core sólido |
| 🔵 Baja | Sistema de niveles | Nice-to-have, gamificación |
| 🔵 Baja | Mejoras de UX | Iterativo, se puede ir haciendo de a poco |
| 🟡 Media | Filtro por rango de edad | Diferenciador de experiencia — evita fricciones entre generaciones |
| 🟡 Media | Intensidad de partido | Emparejar expectativas — evita "es muy malo" / "se lo toma muy en serio" |
