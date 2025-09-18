<script lang="ts">
	import { Container, Sprite } from 'pixi-svelte';
	import { createEventDispatcher } from 'svelte';

	// Props
	export let x: number = 0;
	export let y: number = 0;
	export let scale: number = 1;
	export let spinCircleScale: number = 0.4;      // Círculo principal más grande
	export let spinIconScale: number = 0.25;       // Ícono de spin proporcional al círculo
	export let betSquareScale: number = 0.25;      // Cuadrados laterales más pequeños
	export let betIconScale: number = 0.12;        // Íconos + y - más pequeños
	export let buttonSpacing: number = 120;        // Más espaciado por el tamaño mayor del círculo
	export let disabled: boolean = false;

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		spin: void;
		increaseBet: void;
		decreaseBet: void;
	}>();

	// Button states
	let spinHover = false;
	let increaseHover = false;
	let decreaseHover = false;

	// Event handlers
	function handleSpin() {
		if (!disabled) {
			dispatch('spin');
		}
	}

	function handleIncreaseBet() {
		if (!disabled) {
			dispatch('increaseBet');
		}
	}

	function handleDecreaseBet() {
		if (!disabled) {
			dispatch('decreaseBet');
		}
	}
</script>

<Container {x} {y} {scale}>
	<!-- Spin Button (Center) -->
	<Container
		interactive={!disabled}
		cursor={disabled ? 'default' : 'pointer'}
		onclick={handleSpin}
		onpointerenter={() => (spinHover = true)}
		onpointerleave={() => (spinHover = false)}
		scale={spinHover && !disabled ? 1.05 : 1}
		alpha={disabled ? 0.5 : 1}
	>
		<!-- Spin circle background -->
		<Sprite
			key="UI_SPIN_CIRCLE"
			x={0}
			y={0}
			anchor={{ x: 0.5, y: 0.5 }}
			scale={spinCircleScale}
		/>

		<!-- Spin icon -->
		<Sprite
			key="UI_SPIN_ICON"
			x={0}
			y={0}
			anchor={{ x: 0.5, y: 0.5 }}
			scale={spinIconScale}
		/>
	</Container>

	<!-- Decrease Bet Button (Left) -->
	<Container
		x={-buttonSpacing}
		y={0}
		interactive={!disabled}
		cursor={disabled ? 'default' : 'pointer'}
		onclick={handleDecreaseBet}
		onpointerenter={() => (decreaseHover = true)}
		onpointerleave={() => (decreaseHover = false)}
		scale={decreaseHover && !disabled ? 1.05 : 1}
		alpha={disabled ? 0.5 : 1}
	>
		<!-- Square background -->
		<Sprite
			key="UI_BET_SQUARE_MINUS"
			x={0}
			y={0}
			anchor={{ x: 0.5, y: 0.5 }}
			scale={betSquareScale}
		/>

		<!-- Minus icon -->
		<Sprite
			key="UI_MINUS_ICON"
			x={0}
			y={0}
			anchor={{ x: 0.5, y: 0.5 }}
			scale={betIconScale}
		/>
	</Container>

	<!-- Increase Bet Button (Right) -->
	<Container
		x={buttonSpacing}
		y={0}
		interactive={!disabled}
		cursor={disabled ? 'default' : 'pointer'}
		onclick={handleIncreaseBet}
		onpointerenter={() => (increaseHover = true)}
		onpointerleave={() => (increaseHover = false)}
		scale={increaseHover && !disabled ? 1.05 : 1}
		alpha={disabled ? 0.5 : 1}
	>
		<!-- Square background -->
		<Sprite
			key="UI_BET_SQUARE_PLUS"
			x={0}
			y={0}
			anchor={{ x: 0.5, y: 0.5 }}
			scale={betSquareScale}
		/>

		<!-- Plus icon -->
		<Sprite
			key="UI_PLUS_ICON"
			x={0}
			y={0}
			anchor={{ x: 0.5, y: 0.5 }}
			scale={betIconScale}
		/>
	</Container>
</Container>