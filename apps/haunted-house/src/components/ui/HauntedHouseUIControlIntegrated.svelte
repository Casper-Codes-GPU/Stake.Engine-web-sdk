<script lang="ts">
	import { Container, Sprite } from 'pixi-svelte';
	import { createEventDispatcher } from 'svelte';

	// Props
	export let x: number = 0;
	export let y: number = 0;
	export let scale: number = 1;
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

	// Click area dimensions based on the integrated design
	// These coordinates are estimates based on the target image layout
	const centralButtonRadius = 80; // Central circular button area
	const sideButtonWidth = 60;     // Side button areas
	const sideButtonHeight = 60;
	const leftButtonX = -120;       // Left button position
	const rightButtonX = 120;       // Right button position
</script>

<Container {x} {y} {scale} alpha={disabled ? 0.7 : 1}>
	<!-- Integrated background using the target design -->
	<Sprite
		key="UI_INTEGRATED_CONTROLS"
		x={0}
		y={0}
		anchor={{ x: 0.5, y: 0.5 }}
		scale={0.8}
		alpha={1}
	/>

	<!-- Central Spin Button Click Area -->
	<Container
		x={0}
		y={0}
		interactive={!disabled}
		cursor={disabled ? 'default' : 'pointer'}
		onclick={handleSpin}
		onpointerenter={() => (spinHover = true)}
		onpointerleave={() => (spinHover = false)}
		scale={spinHover && !disabled ? 1.05 : 1}
	>
		<!-- Circular clickable area for spin -->
		<Sprite
			key="UI_SPIN_CIRCLE"
			x={0}
			y={0}
			anchor={{ x: 0.5, y: 0.5 }}
			scale={0.4}
			alpha={0.01}
		/>
	</Container>

	<!-- Left click area for decrease bet -->
	<Container
		x={-80}
		y={0}
		interactive={!disabled}
		cursor={disabled ? 'default' : 'pointer'}
		onclick={handleDecreaseBet}
		onpointerenter={() => (decreaseHover = true)}
		onpointerleave={() => (decreaseHover = false)}
		scale={decreaseHover && !disabled ? 1.05 : 1}
	>
		<!-- Square clickable area for minus button -->
		<Sprite
			key="UI_BET_SQUARE_MINUS"
			x={0}
			y={0}
			anchor={{ x: 0.5, y: 0.5 }}
			scale={0.3}
			alpha={0.01}
		/>
	</Container>

	<!-- Right click area for increase bet -->
	<Container
		x={80}
		y={0}
		interactive={!disabled}
		cursor={disabled ? 'default' : 'pointer'}
		onclick={handleIncreaseBet}
		onpointerenter={() => (increaseHover = true)}
		onpointerleave={() => (increaseHover = false)}
		scale={increaseHover && !disabled ? 1.05 : 1}
	>
		<!-- Square clickable area for plus button -->
		<Sprite
			key="UI_BET_SQUARE_PLUS"
			x={0}
			y={0}
			anchor={{ x: 0.5, y: 0.5 }}
			scale={0.3}
			alpha={0.01}
		/>
	</Container>
</Container>