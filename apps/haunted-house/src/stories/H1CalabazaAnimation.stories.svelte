<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { SpriteSheet } from 'pixi-svelte';
	import { StoryPixiApp } from 'components-storybook';

	const { Story } = defineMeta({
		tags: ['autodocs'],
		title: 'Sprites/H1CalabazaAnimation',
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
	console.log('=== H1 CALABAZA ANIMATION (20 frames) ===');
	console.log('H1_ANIMATION in assets:', 'H1_ANIMATION' in assets);
	console.log('All assets:', Object.keys(assets));
</script>

<Story name="H1 Calabaza 20 Frames">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(100,0,200,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🎃 H1 Calabaza Animation (20 frames)</h3>
				<p style="margin: 0;">spritesheet.json + spritesheet.png (6.7MB)</p>
				<p style="margin: 5px 0 0 0; font-size: 12px;">PixiJS format from Free Texture Packer</p>
			</div>

			<SpriteSheet
				key="H1_ANIMATION"
				{...args}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Calabaza vs Cofre Comparison">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(100,0,200,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">📊 Symbol Animation Test</h3>
				<p style="margin: 0;">Left: cofresSimple (49 frames, working) | Right: H1 calabaza (20 frames, test)</p>
			</div>

			<!-- cofresSimple (known working reference) -->
			<SpriteSheet
				key="cofresSimple"
				x={250}
				y={300}
				scale={0.35}
				anchor={{ x: 0.5, y: 0.5 }}
				play={true}
				loop={true}
				animationSpeed={0.12}
			/>

			<!-- H1 calabaza (new test) -->
			<SpriteSheet
				key="H1_ANIMATION"
				x={650}
				y={300}
				scale={0.4}
				anchor={{ x: 0.5, y: 0.5 }}
				play={true}
				loop={true}
				animationSpeed={0.15}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="H1 Speed Test">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(100,0,200,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">⚡ H1 Speed Variations</h3>
				<p style="margin: 0;">Fast (0.25) | Normal (0.15) | Slow (0.08)</p>
			</div>

			<!-- Fast animation -->
			<SpriteSheet
				key="H1_ANIMATION"
				x={200}
				y={300}
				scale={0.3}
				anchor={{ x: 0.5, y: 0.5 }}
				play={true}
				loop={true}
				animationSpeed={0.25}
			/>

			<!-- Normal animation -->
			<SpriteSheet
				key="H1_ANIMATION"
				x={400}
				y={300}
				scale={0.3}
				anchor={{ x: 0.5, y: 0.5 }}
				play={true}
				loop={true}
				animationSpeed={0.15}
			/>

			<!-- Slow animation -->
			<SpriteSheet
				key="H1_ANIMATION"
				x={600}
				y={300}
				scale={0.3}
				anchor={{ x: 0.5, y: 0.5 }}
				play={true}
				loop={true}
				animationSpeed={0.08}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>