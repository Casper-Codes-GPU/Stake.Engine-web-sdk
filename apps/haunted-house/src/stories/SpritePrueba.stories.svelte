<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { AnimatedSprite } from 'pixi-svelte';
	import { StoryPixiApp } from 'components-storybook';

	const { Story } = defineMeta({
		tags: ['autodocs'],
		title: 'Sprites/SpritePrueba',
		component: AnimatedSprite,
		args: {
			x: 400,
			y: 300,
			scale: 2,
			anchor: { x: 0.5, y: 0.5 },
			play: true,
			loop: true,
			animationSpeed: 0.2,
		},
		argTypes: {
			animationSpeed: {
				control: { type: 'range', min: 0.01, max: 2, step: 0.01 }
			},
			scale: {
				control: { type: 'range', min: 0.5, max: 4, step: 0.1 }
			},
			play: {
				control: { type: 'boolean' }
			},
			loop: {
				control: { type: 'boolean' }
			}
		}
	});
</script>

<script lang="ts">
	import { Sprite } from 'pixi-svelte';
	import assets from '../game/assets';
	
	// Los nombres de los frames en el JSON
	const frameNames = [
		'spritePrueba:RunRight01.png',
		'spritePrueba:RunRight02.png', 
		'spritePrueba:RunRight03.png',
		'spritePrueba:RunRight04.png'
	];
	
	// Working frame names (same as key format)
	const frameNamesWorking = [
		'RunRight01.png',
		'RunRight02.png', 
		'RunRight03.png',
		'RunRight04.png'
	];
</script>

<Story name="Animated">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<AnimatedSprite {...args} textures={frameNamesWorking} />
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Different Speeds">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<!-- Slow -->
			<AnimatedSprite 
				textures={frameNamesWorking}
				x={200} 
				y={300} 
				scale={1.5} 
				anchor={{ x: 0.5, y: 0.5 }}
				play={true} 
				loop={true} 
				animationSpeed={0.1} 
			/>
			
			<!-- Normal -->
			<AnimatedSprite 
				textures={frameNamesWorking}
				x={400} 
				y={300} 
				scale={1.5} 
				anchor={{ x: 0.5, y: 0.5 }}
				play={true} 
				loop={true} 
				animationSpeed={0.2} 
			/>
			
			<!-- Fast -->
			<AnimatedSprite 
				textures={frameNamesWorking}
				x={600} 
				y={300} 
				scale={1.5} 
				anchor={{ x: 0.5, y: 0.5 }}
				play={true} 
				loop={true} 
				animationSpeed={0.4} 
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Test Key-based Sprites">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<!-- Test using key like in LoadingScreen -->
			<Sprite 
				key="RunRight01.png"
				x={200} 
				y={200} 
				scale={2} 
				anchor={{ x: 0.5, y: 0.5 }}
			/>
			
			<Sprite 
				key="RunRight02.png"
				x={350} 
				y={200} 
				scale={2} 
				anchor={{ x: 0.5, y: 0.5 }}
			/>
			
			<Sprite 
				key="RunRight03.png"
				x={500} 
				y={200} 
				scale={2} 
				anchor={{ x: 0.5, y: 0.5 }}
			/>
			
			<Sprite 
				key="RunRight04.png"
				x={650} 
				y={200} 
				scale={2} 
				anchor={{ x: 0.5, y: 0.5 }}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Debug Info">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<!-- This will show in console if assets are loaded -->
			{console.log('Assets loaded:', Object.keys(assets))}
			{console.log('Frame names:', frameNames)}
			
			<AnimatedSprite 
				textures={frameNames}
				x={400} 
				y={300} 
				scale={2} 
				anchor={{ x: 0.5, y: 0.5 }}
				play={true} 
				loop={true} 
				animationSpeed={0.2} 
			/>
		</StoryPixiApp>
	{/snippet}
</Story>