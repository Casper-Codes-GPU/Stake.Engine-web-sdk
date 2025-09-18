<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'UI Test/New Custom UI',
		tags: ['autodocs'],
	});
</script>

<script lang="ts">
	import { StoryPixiApp } from 'components-storybook';
	import { Sprite, Container } from 'pixi-svelte';

	import assets from '../game/assets';
</script>

<Story name="Individual Assets Test">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<!-- Test individual assets first -->
			<Container x={200} y={200}>
				<!-- Spin Circle Base (larger) -->
				<Sprite key="UI_SPIN_CIRCLE" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.4} />

				<!-- Spin Icon (proportional to circle) -->
				<Sprite key="UI_SPIN_ICON" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.25} />
			</Container>

			<!-- Test bet buttons separately -->
			<Container x={400} y={200}>
				<!-- Minus Button (smaller) -->
				<Container x={-80} y={0}>
					<Sprite key="UI_BET_SQUARE_MINUS" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.25} />
					<Sprite key="UI_MINUS_ICON" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.12} />
				</Container>

				<!-- Plus Button (smaller) -->
				<Container x={80} y={0}>
					<Sprite key="UI_BET_SQUARE_PLUS" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.25} />
					<Sprite key="UI_PLUS_ICON" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.12} />
				</Container>
			</Container>

			<!-- Test complete layout with proper proportions -->
			<Container x={600} y={300}>
				<!-- Background circle (large) -->
				<Sprite key="UI_SPIN_CIRCLE" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.4} />

				<!-- Spin icon centered (proportional) -->
				<Sprite key="UI_SPIN_ICON" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.25} />

				<!-- Left bet button (smaller) -->
				<Container x={-120} y={0}>
					<Sprite key="UI_BET_SQUARE_MINUS" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.25} />
					<Sprite key="UI_MINUS_ICON" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.12} />
				</Container>

				<!-- Right bet button (smaller) -->
				<Container x={120} y={0}>
					<Sprite key="UI_BET_SQUARE_PLUS" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.25} />
					<Sprite key="UI_PLUS_ICON" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.12} />
				</Container>
			</Container>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Interactive Layout Test">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<Container x={400} y={300}>
				<!-- Main UI Container -->
				<Container
					interactive={true}
					cursor="pointer"
					onclick={() => console.log('Spin button clicked!')}
				>
					<!-- Background circle (large) -->
					<Sprite key="UI_SPIN_CIRCLE" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.4} />
					<!-- Spin icon (proportional) -->
					<Sprite key="UI_SPIN_ICON" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.25} />
				</Container>

				<!-- Decrease bet button -->
				<Container
					x={-120} y={0}
					interactive={true}
					cursor="pointer"
					onclick={() => console.log('Decrease bet clicked!')}
				>
					<Sprite key="UI_BET_SQUARE_MINUS" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.25} />
					<Sprite key="UI_MINUS_ICON" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.12} />
				</Container>

				<!-- Increase bet button -->
				<Container
					x={120} y={0}
					interactive={true}
					cursor="pointer"
					onclick={() => console.log('Increase bet clicked!')}
				>
					<Sprite key="UI_BET_SQUARE_PLUS" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.25} />
					<Sprite key="UI_PLUS_ICON" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.12} />
				</Container>
			</Container>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Composite Component Test">
	{#snippet template()}
		<script>
			import HauntedHouseUIControl from '../components/ui/HauntedHouseUIControl.svelte';

			let currentBet = 10;
			let isSpinning = false;

			function handleSpin() {
				console.log('🎰 Spinning!');
				isSpinning = true;
				setTimeout(() => {
					isSpinning = false;
					console.log('✅ Spin completed!');
				}, 2000);
			}

			function handleIncreaseBet() {
				if (currentBet < 100) {
					currentBet += 5;
					console.log('💰 Bet increased to:', currentBet);
				}
			}

			function handleDecreaseBet() {
				if (currentBet > 5) {
					currentBet -= 5;
					console.log('💰 Bet decreased to:', currentBet);
				}
			}
		</script>

		<StoryPixiApp {assets}>
			<!-- Current bet display -->
			<div style="position: absolute; top: 10px; left: 10px; color: white; font-size: 18px; z-index: 1000;">
				Current Bet: ${currentBet}
				{#if isSpinning}
					<br><span style="color: yellow;">🎰 Spinning...</span>
				{/if}
			</div>

			<!-- Main UI Control -->
			<HauntedHouseUIControl
				x={400}
				y={300}
				disabled={isSpinning}
				onspin={handleSpin}
				onincreaseBet={handleIncreaseBet}
				ondecreaseBet={handleDecreaseBet}
			/>

			<!-- Size variations -->
			<HauntedHouseUIControl
				x={200}
				y={150}
				scale={0.7}
				buttonSpacing={100}
				onspin={() => console.log('Small control spin')}
				onincreaseBet={() => console.log('Small control +')}
				ondecreaseBet={() => console.log('Small control -')}
			/>

			<HauntedHouseUIControl
				x={600}
				y={450}
				scale={1.3}
				buttonSpacing={140}
				onspin={() => console.log('Large control spin')}
				onincreaseBet={() => console.log('Large control +')}
				ondecreaseBet={() => console.log('Large control -')}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>