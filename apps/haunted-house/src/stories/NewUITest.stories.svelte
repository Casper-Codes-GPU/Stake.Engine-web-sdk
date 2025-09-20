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
	import HauntedHouseUIControl from '../components/ui/HauntedHouseUIControl.svelte';
	import HauntedHouseUIControlIntegrated from '../components/ui/HauntedHouseUIControlIntegrated.svelte';

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
				<!-- Botón Central de Spin - como estaba antes -->
				<Container
					interactive={true}
					cursor="pointer"
					onclick={() => console.log('🎰 Spin button clicked!')}
				>
					<!-- Círculo de fondo -->
					<Sprite key="UI_SPIN_CIRCLE" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.4} />
					<!-- Ícono de spin encima -->
					<Sprite key="UI_SPIN_ICON" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.25} />
				</Container>

				<!-- Botón Disminuir Apuesta (Izquierda) -->
				<Container
					x={-270} y={0}
					interactive={true}
					cursor="pointer"
					onclick={() => console.log('➖ Decrease bet clicked!')}
				>
					<Sprite key="UI_BET_SQUARE_MINUS" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.25} />
					<Sprite key="UI_MINUS_ICON" x={-40} y={-2} anchor={{ x: 0.5, y: 0.5 }} scale={0.12} />
				</Container>

				<!-- Botón Aumentar Apuesta (Derecha) -->
				<Container
					x={270} y={0}
					interactive={true}
					cursor="pointer"
					onclick={() => console.log('➕ Increase bet clicked!')}
				>
					<Sprite key="UI_BET_SQUARE_PLUS" x={0} y={0} anchor={{ x: 0.5, y: 0.5 }} scale={0.25} />
					<Sprite key="UI_PLUS_ICON" x={40} y={1} anchor={{ x: 0.5, y: 0.5 }} scale={0.12} />
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

			<!-- Size variations con nuevos espaciados -->
			<HauntedHouseUIControl
				x={200}
				y={150}
				scale={0.7}
				onspin={() => console.log('Small control spin')}
				onincreaseBet={() => console.log('Small control +')}
				ondecreaseBet={() => console.log('Small control -')}
			/>

			<HauntedHouseUIControl
				x={600}
				y={450}
				scale={1.3}
				onspin={() => console.log('Large control spin')}
				onincreaseBet={() => console.log('Large control +')}
				ondecreaseBet={() => console.log('Large control -')}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Debug Asset Loading">
	{#snippet template()}
		<script>
			import { onMount } from 'svelte';

			onMount(() => {
				console.log('🔍 Debug: Assets object:', assets);
				console.log('🔍 Debug: UI_INTEGRATED_CONTROLS:', assets.UI_INTEGRATED_CONTROLS);
			});
		</script>

		<StoryPixiApp {assets}>
			<!-- Test if the integrated asset loads correctly -->
			<div style="position: absolute; top: 10px; left: 10px; color: white; font-size: 16px; z-index: 1000;">
				Testing UI_INTEGRATED_CONTROLS asset loading
			</div>

			<!-- Test existing working asset first -->
			<Sprite
				key="UI_SPIN_CIRCLE"
				x={300}
				y={200}
				anchor={{ x: 0.5, y: 0.5 }}
				scale={0.4}
			/>

			<!-- Test new integrated asset -->
			<Sprite
				key="UI_INTEGRATED_CONTROLS"
				x={500}
				y={200}
				anchor={{ x: 0.5, y: 0.5 }}
				scale={0.6}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Simple Integrated Test">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<!-- Simple test just showing the sprite directly -->
			<div style="position: absolute; top: 10px; left: 10px; color: white; font-size: 16px; z-index: 1000;">
				Simple Integrated UI Test (Direct Sprite)
			</div>

			<!-- Direct sprite test -->
			<Container x={400} y={300}>
				<Sprite
					key="UI_INTEGRATED_CONTROLS"
					x={0}
					y={0}
					anchor={{ x: 0.5, y: 0.5 }}
					scale={0.8}
					interactive={true}
					cursor="pointer"
					onclick={() => console.log('✅ Integrated UI clicked!')}
				/>
			</Container>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Integrated Design Test">
	{#snippet template()}
		<script>

			let currentBet = 10;
			let isSpinning = false;

			function handleSpin() {
				console.log('🎰 Integrated Design Spinning!');
				isSpinning = true;
				setTimeout(() => {
					isSpinning = false;
					console.log('✅ Integrated Spin completed!');
				}, 2000);
			}

			function handleIncreaseBet() {
				if (currentBet < 100) {
					currentBet += 5;
					console.log('💰 Integrated Bet increased to:', currentBet);
				}
			}

			function handleDecreaseBet() {
				if (currentBet > 5) {
					currentBet -= 5;
					console.log('💰 Integrated Bet decreased to:', currentBet);
				}
			}
		</script>

		<StoryPixiApp {assets}>
			<!-- Current bet display -->
			<div style="position: absolute; top: 10px; left: 10px; color: white; font-size: 18px; z-index: 1000;">
				Integrated Design - Current Bet: ${currentBet}
				{#if isSpinning}
					<br><span style="color: yellow;">🎰 Spinning...</span>
				{/if}
			</div>

			<!-- Test the integrated design with the target image.png -->
			<HauntedHouseUIControlIntegrated
				x={400}
				y={300}
				disabled={isSpinning}
				onspin={handleSpin}
				onincreaseBet={handleIncreaseBet}
				ondecreaseBet={handleDecreaseBet}
			/>

			<!-- Show original vs integrated side by side -->
			<div style="position: absolute; top: 60px; left: 10px; color: white; font-size: 14px; z-index: 1000;">
				Integrated Design (target image.png)
			</div>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Side by Side Comparison">
	{#snippet template()}
		<script>

			function handleAction(source, action) {
				console.log(`${source}: ${action}`);
			}
		</script>

		<StoryPixiApp {assets}>
			<!-- Labels -->
			<div style="position: absolute; top: 10px; left: 150px; color: white; font-size: 16px; z-index: 1000;">
				Original Design
			</div>
			<div style="position: absolute; top: 10px; right: 150px; color: white; font-size: 16px; z-index: 1000;">
				Target Design (image.png)
			</div>

			<!-- Original design (left side) -->
			<HauntedHouseUIControl
				x={200}
				y={300}
				onspin={() => handleAction('Original', 'Spin')}
				onincreaseBet={() => handleAction('Original', 'Increase Bet')}
				ondecreaseBet={() => handleAction('Original', 'Decrease Bet')}
			/>

			<!-- Integrated design (right side) -->
			<HauntedHouseUIControlIntegrated
				x={600}
				y={300}
				onspin={() => handleAction('Integrated', 'Spin')}
				onincreaseBet={() => handleAction('Integrated', 'Increase Bet')}
				ondecreaseBet={() => handleAction('Integrated', 'Decrease Bet')}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>