# CANON v0.1 — Escuela de Repostería en el Árbol

## PRINCIPIOS INMUTABLES DURANTE SPRINTS
- No menú convencional; la navegación ocurre por pisos (Subir / Bajar)
- El árbol es el centro del mundo: Exterior → Recepción → Biblioteca → Cocinas
- No es videojuego; es un sitio exploratorio gráfico
- Estilo visual: pixel art con sensibilidad Ghibli (verde, madera, luz cálida)
- NPCs aparecen ocasionalmente; no persiguen al usuario, no bloquean navegación
- Clases y recetas avanzadas son premium; acceso restringido

## ARQUITECTURA FIJA DEL MVP
- Frontend: Vite + escenas por piso
- Backend: Supabase (auth, BD, storage)
- Roles: básico (guest, user, premium, chef, admin)
- Recetas: públicas / privadas / premium
- Premium: inicialmente solo placeholder (aún sin pagos)

## REGLAS DE TRABAJO
- Cambios grandes solo al cerrar sprint
- Antes de cambiar canon: crear nuevo sprint o sub-sprint
- Cada entrega actualiza `project_snapshot.json`
