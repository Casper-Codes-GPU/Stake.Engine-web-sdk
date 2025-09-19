<script lang="ts">
	import { Container, Sprite } from 'pixi-svelte';

	// Props
	interface Props {
		x?: number;
		y?: number;
		scale?: number;
		spinCircleScale?: number;
		spinIconScale?: number;
		betSquareScale?: number;
		betIconScale?: number;
		buttonSpacing?: number;
		disabled?: boolean;
		increaseDisabled?: boolean;
		decreaseDisabled?: boolean;
		onspin?: () => void;
		onincreaseBet?: () => void;
		ondecreaseBet?: () => void;
	}

	let {
		x = 0,
		y = 0,
		scale = 1,
		spinCircleScale = 0.4,
		spinIconScale = 0.25,
		betSquareScale = 0.25,
		betIconScale = 0.12,
		buttonSpacing = 270,
		disabled = false,
		increaseDisabled = false,
		decreaseDisabled = false,
		onspin,
		onincreaseBet,
		ondecreaseBet
	}: Props = $props();

	// Button states
	let spinHover = $state(false);
	let increaseHover = $state(false);
	let decreaseHover = $state(false);

	// Event handlers with improved error handling and logging
	function handleSpin() {
		console.log('Spin button clicked', { disabled, onspin: !!onspin });
		if (!disabled && onspin) {
			try {
				onspin();
			} catch (error) {
				console.error('Error in spin handler:', error);
			}
		}
	}

	function handleIncreaseBet() {
		console.log('Increase bet button clicked', { disabled, increaseDisabled, onincreaseBet: !!onincreaseBet });
		if (!disabled && !increaseDisabled && onincreaseBet) {
			try {
				onincreaseBet();
			} catch (error) {
				console.error('Error in increase bet handler:', error);
			}
		}
	}

	function handleDecreaseBet() {
		console.log('Decrease bet button clicked', { disabled, decreaseDisabled, ondecreaseBet: !!ondecreaseBet });
		if (!disabled && !decreaseDisabled && ondecreaseBet) {
			try {
				ondecreaseBet();
			} catch (error) {
				console.error('Error in decrease bet handler:', error);
			}
		}
	}
</script>

<Container {x} {y} {scale}>
	<!-- Spin Button (Center) -->
	<Container
		interactive={!disabled}
		eventMode="static"
		cursor={disabled ? 'default' : 'pointer'}
		onpointerup={handleSpin}
		onpointerdown={() => console.log('Spin pointer down')}
		onpointerenter={() => {
			console.log('Spin pointer enter');
			spinHover = true;
		}}
		onpointerleave={() => {
			console.log('Spin pointer leave');
			spinHover = false;
		}}
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
		interactive={true}
		eventMode="static"
		cursor={disabled || decreaseDisabled ? 'default' : 'pointer'}
		onpointerup={handleDecreaseBet}
		onpointerdown={() => console.log('Decrease bet pointer down')}
		onpointerenter={() => {
			console.log('Decrease bet pointer enter');
			decreaseHover = true;
		}}
		onpointerleave={() => {
			console.log('Decrease bet pointer leave');
			decreaseHover = false;
		}}
		scale={decreaseHover && !disabled && !decreaseDisabled ? 1.05 : 1}
		alpha={disabled || decreaseDisabled ? 0.5 : 1}
	>
		<!-- Square background -->
		<Sprite
			key="UI_BET_SQUARE_PLUS"
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
		interactive={true}
		eventMode="static"
		cursor={disabled || increaseDisabled ? 'default' : 'pointer'}
		onpointerup={handleIncreaseBet}
		onpointerdown={() => console.log('Increase bet pointer down')}
		onpointerenter={() => {
			console.log('Increase bet pointer enter');
			increaseHover = true;
		}}
		onpointerleave={() => {
			console.log('Increase bet pointer leave');
			increaseHover = false;
		}}
		scale={increaseHover && !disabled && !increaseDisabled ? 1.05 : 1}
		alpha={disabled || increaseDisabled ? 0.5 : 1}
	>
		<!-- Square background -->
		<Sprite
			key="UI_BET_SQUARE_MINUS"
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
