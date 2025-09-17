<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { SpriteSheet } from 'pixi-svelte';
	import { StoryPixiApp } from 'components-storybook';

	const { Story } = defineMeta({
		tags: ['autodocs'],
		title: 'Sprites/CofresSimple',
		component: SpriteSheet,
		args: {
			x: 400,
			y: 300,
			scale: 0.4,
			anchor: { x: 0.5, y: 0.5 },
			play: true,
			loop: true,
			animationSpeed: 0.15,
		},
		argTypes: {
			animationSpeed: {
				control: { type: 'range', min: 0.01, max: 0.5, step: 0.01 }
			},
			scale: {
				control: { type: 'range', min: 0.1, max: 1, step: 0.1 }
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
	import assets from '../game/assets';
	
	// Debug info
	console.log('=== COFRES SIMPLE (49 frames) ===');
	console.log('cofresSimple in assets:', 'cofresSimple' in assets);
	console.log('All assets:', Object.keys(assets));
</script>

<Story name="Cofres 49 Frames">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(0,100,200,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🎁 Cofres Simple (49 frames)</h3>
				<p style="margin: 0;">cofre_madera.json + cofre_madera.png (5.5MB)</p>
				<p style="margin: 5px 0 0 0; font-size: 12px;">Single pack, no multi-pack references</p>
			</div>
			
			<SpriteSheet 
				key="cofresSimple"
				{...args}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Side by Side Test">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(0,100,200,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">📊 Comparison Test</h3>
				<p style="margin: 0;">Left: spritePrueba (4 frames, works) | Right: cofresSimple (49 frames, test)</p>
			</div>
			
			<!-- spritePrueba (known working) -->
			<SpriteSheet 
				key="spritePrueba"
				x={250} 
				y={300} 
				scale={1.2}
				anchor={{ x: 0.5, y: 0.5 }}
				play={true} 
				loop={true} 
				animationSpeed={0.2} 
			/>
			
			<!-- cofresSimple (new test) -->
			<SpriteSheet 
				key="cofresSimple"
				x={650} 
				y={300} 
				scale={0.3}
				anchor={{ x: 0.5, y: 0.5 }}
				play={true} 
				loop={true} 
				animationSpeed={0.12} 
			/>
		</StoryPixiApp>
	{/snippet}
</Story>