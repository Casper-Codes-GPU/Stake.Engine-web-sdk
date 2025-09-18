# Guía de Storybook para Haunted House

Este README explica cómo usar Storybook para desarrollo y testing de componentes en el juego Haunted House.

## ¿Qué es Storybook?

Storybook es un entorno de desarrollo aislado para componentes UI que permite:
- Desarrollar componentes de forma independiente
- Probar diferentes estados y props de componentes
- Documentar componentes visualmente
- Testing manual de interacciones

## Ejecutar Storybook para Haunted House

### Prerequisitos

- Node.js 22.16.0 o superior
- pnpm 10.5.0 o superior

### Instrucciones

```bash
# Desde la raíz del proyecto
cd web-sdk

# Instalar dependencias (solo la primera vez)
pnpm install

# Ejecutar Storybook para haunted-house
pnpm run storybook --filter=haunted-house
```

El comando anterior abre Storybook en `http://localhost:6001`

**¡No necesitas configurar nada adicional!** Todo está ya preparado en el proyecto.

### Comandos Alternativos

```bash
# Ejecutar directamente desde el directorio del juego
cd web-sdk/apps/haunted-house
pnpm storybook
```

## Dependencia cross-env

### ¿Por qué está incluida?

La dependencia `cross-env` resuelve las diferencias entre sistemas operativos para variables de entorno:

**Sin cross-env:**
- Windows: `set PUBLIC_CHROMATIC=true && storybook dev`
- macOS/Linux: `PUBLIC_CHROMATIC=true storybook dev`

**Con cross-env (funciona en todos los OS):**
```bash
cross-env PUBLIC_CHROMATIC=true storybook dev
```

### Compatibilidad

- ✅ **Windows**: Funciona automáticamente
- ✅ **macOS/Linux**: Funciona automáticamente
- ✅ **Equipos mixtos**: Todos pueden usar el mismo comando

## ¿Qué es PUBLIC_CHROMATIC?

`PUBLIC_CHROMATIC=true` es una variable que **desactiva las llamadas reales a la API** del juego:

- **Con `PUBLIC_CHROMATIC=true`**: Storybook funciona sin backend, solo imprime logs en consola
- **Sin esta variable**: Requiere que el servidor RGS (backend) esté funcionando

Esta configuración permite que Storybook sea completamente independiente para desarrollo de componentes.

## Desarrollar con Storybook

### Estructura de archivos

```
web-sdk/apps/haunted-house/
├── src/
│   ├── lib/
│   │   └── components/     # Componentes del juego
│   └── stories/           # Archivos .stories.svelte
└── package.json           # Configuración del proyecto
```

### Crear nuevas historias

1. Crea archivos `.stories.svelte` en `src/stories/`
2. Importa los componentes que quieres testear
3. Define diferentes estados/props para probar
4. Storybook detectará automáticamente las nuevas historias

## Troubleshooting

### Puerto 6001 ocupado

**Solución**: Cambiar el puerto en el script de package.json:
```json
"storybook": "cross-env PUBLIC_CHROMATIC=true storybook dev -p 6002 public"
```

### Error: "cross-env no encontrado"

**Causa**: Las dependencias no están instaladas

**Solución**:
```bash
cd web-sdk
pnpm install
```