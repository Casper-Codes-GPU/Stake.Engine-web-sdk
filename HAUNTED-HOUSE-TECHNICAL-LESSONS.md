# Haunted House Game - Technical Lessons Learned

## Custom UI Implementation Guide

Esta documentación registra las lecciones técnicas aprendidas durante la implementación de los botones custom para el juego Haunted House, para evitar errores en futuras implementaciones.

## 1. Implementación de Componentes Custom de PixiJS

### Estructura de Archivos
```
src/components/ui/
├── HauntedHouseUIControl.svelte          # Componente principal de botones custom
├── HauntedHouseUI.svelte                 # UI wrapper que usa layout custom
└── LayoutDesktopCustom.svelte            # Layout sin botones originales
```

### Sintaxis Svelte 5 (CRÍTICO)
```typescript
// ❌ INCORRECTO - Svelte 4 sintaxis
export let x = 0;

// ✅ CORRECTO - Svelte 5 runes sintaxis
interface Props {
    x?: number;
    y?: number;
    onspin?: () => void;
}

let { x = 0, y = 0, onspin }: Props = $props();
```

### Estado Reactivo en Svelte 5
```typescript
// ❌ INCORRECTO - Svelte 4
let hover = false;

// ✅ CORRECTO - Svelte 5 con $state
let hover = $state(false);
```

## 2. Configuración de Eventos PixiJS

### Event Mode (OBLIGATORIO)
```typescript
// ❌ Sin eventMode - los clicks no funcionan
<Container
    interactive={true}
    onpointerup={handleClick}
>

// ✅ Con eventMode="static" - funciona correctamente
<Container
    interactive={true}
    eventMode="static"
    onpointerup={handleClick}
>
```

### Cursor y Estados
```typescript
// Configuración completa de interactividad
<Container
    interactive={!disabled}
    eventMode="static"
    cursor={disabled ? 'default' : 'pointer'}
    onpointerup={handleClick}
    onpointerenter={() => hover = true}
    onpointerleave={() => hover = false}
    scale={hover && !disabled ? 1.05 : 1}
    alpha={disabled ? 0.5 : 1}
>
```

## 3. Asset Mapping y Configuración

### Assets Críticos en `assets.ts`
```typescript
UI_SPIN_CIRCLE: {
    type: 'sprite',
    src: new URL('../../assets/sprites/ui/circuloSpin.png', import.meta.url).href,
},
UI_BET_SQUARE_PLUS: {
    type: 'sprite',
    src: new URL('../../assets/sprites/ui/cuadrado mas.png', import.meta.url).href,
},
UI_BET_SQUARE_MINUS: {
    type: 'sprite',
    src: new URL('../../assets/sprites/ui/cuadrado menos.png', import.meta.url).href,
},
```

### Importación en Storybook
```typescript
// DEBE ser importado en storybook para funcionar
import { ASSET_MAP } from '../game/assets';
```

## 4. Gestión de Estado de Apuestas

### Problema Crítico: Balance en Storybook
```typescript
// ❌ PROBLEMA: stateBet.balanceAmount = 0 en Storybook
// Esto causa que setBetAmount falle por validación

// ✅ SOLUCIÓN: Inicializar balance en onMount
onMount(() => {
    // Set balance for Storybook testing
    if (stateBet.balanceAmount === 0) {
        stateBet.balanceAmount = 10000;
    }
});
```

### Lógica de Incremento/Decremento
```typescript
function handleIncreaseBet() {
    try {
        // Validar datos disponibles
        const biggest = stateConfig.betAmountOptions[stateConfig.betAmountOptions.length - 1];
        const nextBigger = [...stateConfig.betAmountOptions]
            .sort((a, b) => a - b)
            .find((option) => option > stateBet.betAmount);

        const newAmount = nextBigger || biggest;
        stateBetDerived.setBetAmount(newAmount);
    } catch (error) {
        console.error('Error in bet change:', error);
    }
}
```

## 5. Simulación de Spins Aleatorios

### Problema: Eventos Fijos vs Aleatorios
```typescript
// ❌ PROBLEMA: Usar eventos fijos
const revealEvent = {
    type: 'reveal',
    board: [[/* datos fijos */]]
};
await playBookEvent(revealEvent, { bookEvents: [] });

// ✅ SOLUCIÓN: Usar books aleatorios como Action button
import books from '../stories/data/base_books';
import { randomInteger } from 'utils-shared/random';

async function handleSpin() {
    const index = randomInteger({ min: 0, max: books.length - 1 });
    const data = books[index];
    await playBet({ ...data, state: data.events });
}
```

## 6. Layout y Posicionamiento

### Layout Custom vs Standard
```typescript
// En HauntedHouseUI.svelte
const LAYOUT_COMPONENT_MAP = {
    desktop: LayoutDesktopCustom, // Custom sin botones originales
    portrait: LayoutPortrait,     // Standard para otros layouts
    landscape: LayoutLandscape,
    tablet: LayoutTablet,
};
```

### Posicionamiento de Elementos UI
```typescript
// Botones custom - posición fija
<Container x={1000} y={550}>
    <HauntedHouseUIControl ... />
</Container>

// Labels asociados - alineación relativa
<Container y={DESKTOP_BASE_SIZE * 0.4 + 1} x={1525} scale={0.6}>
    {@render props.amountBet({ stacked: true })}
</Container>
```

## 7. Debugging y Troubleshooting

### Logs de Debug Estructurados
```typescript
// Usar emojis y estructura para facilitar debugging
console.log('🎰 CustomSpin called', {
    isIdle: context.stateXstateDerived.isIdle(),
    gameState: context.stateXstate.current?.value
});

console.log('🔍 DEBUG - Starting bet calculation:', {
    currentBetAmount: stateBet.betAmount,
    betOptions: stateConfig.betAmountOptions,
    balanceAmount: stateBet.balanceAmount
});
```

### Validación de Estado
```typescript
// Siempre validar estados críticos antes de actuar
if (!disabled && onspin && context.stateXstateDerived.isIdle()) {
    await onspin();
}
```

## 8. Imports y Dependencias

### Imports Críticos
```typescript
// Componentes PixiJS
import { Container, Sprite } from 'pixi-svelte';

// Utilidades de juego
import { playBet } from '../game/utils';
import { randomInteger } from 'utils-shared/random';

// Estado del juego
import { stateBet, stateBetDerived, stateConfig } from 'state-shared';

// Datos para testing
import books from '../stories/data/base_books';
```

## 9. Errores Comunes a Evitar

### ❌ Errores Frecuentes:
1. **Sintaxis Svelte 4 en proyecto Svelte 5**
2. **Olvidar `eventMode="static"` en containers interactivos**
3. **No inicializar balance en Storybook**
4. **Usar eventos fijos en lugar de books aleatorios**
5. **Mapeo invertido de assets (plus/minus)**
6. **No validar estado antes de ejecutar acciones**

### ✅ Verificaciones Pre-Deploy:
1. **Assets aparecen correctamente en Storybook**
2. **Todos los botones responden a clicks**
3. **Incremento/decremento funciona con balance > 0**
4. **Spin genera resultados variables**
5. **Posicionamiento correcto en diferentes layouts**
6. **Estados disabled funcionan correctamente**

## 10. Testing en Storybook

### Stories Requeridas para Testing
- `NewUITest.stories.svelte` - Testing de componentes custom
- `ModeBaseBook.stories.svelte` - Testing con datos aleatorios
- `ComponentsGame.stories.svelte` - Testing de integración completa

### Validación Visual
- Verificar alineación de elementos
- Comprobar hover states
- Validar disabled states
- Confirmar variedad en resultados de spin

---

## Resumen de Implementación Exitosa

Esta implementación logró:
1. **Reemplazar completamente** los botones originales con custom UI
2. **Mantener toda la funcionalidad** de incremento/decremento de apuestas
3. **Simular spins realistas** con resultados variables incluyendo free spins
4. **Posicionar elementos** de forma coherente con el diseño del juego
5. **Funcionar correctamente** tanto en juego real como en Storybook

La clave del éxito fue entender las diferencias entre Svelte 4/5, la correcta configuración de eventos PixiJS, y la gestión adecuada del estado de apuestas en entornos de testing.