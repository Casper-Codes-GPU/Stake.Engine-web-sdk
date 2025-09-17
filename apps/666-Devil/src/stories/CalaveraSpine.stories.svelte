<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	
	import { SpineProvider, SpineTrack } from 'pixi-svelte';
	import { StoryPixiApp } from 'components-storybook';
	
	const { Story } = defineMeta({
		tags: ['autodocs'],
		title: 'Spines/CalaveraSpine (L1 Symbol)',
		component: SpineProvider,
		args: {
			x: 400,
			y: 300,
			scale: 0.8,
			anchor: { x: 0.5, y: 0.5 },
		},
		argTypes: {
			scale: {
				control: { type: 'range', min: 0.1, max: 2, step: 0.1 }
			},
		}
	});
</script>

<script lang="ts">
	import assets from '../game/assets';
</script>

<Story name="Calavera Animation">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.8); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">💀 Calavera Spine Animation (L1)</h3>
				<p style="margin: 0;">Skull shaking/trembling animation for wins.</p>
				<p style="margin: 5px 0 0 0;">Animation: "animtion0" (trembling loop)</p>
			</div>
			
			<SpineProvider 
				{...args}
				key="calaveraSpine"
			>
				<SpineTrack 
					trackIndex={0} 
					animationName="animtion0" 
					loop={true}
				/>
			</SpineProvider>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="L1 Symbol Test">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.8); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🎮 L1 Symbol Test</h3>
				<p style="margin: 0;">Testing L1 symbol with calavera animation</p>
			</div>
			
			<!-- Using L1 asset directly -->
			<SpineProvider
				key="L1"
				x={400} 
				y={300} 
				scale={0.7} 
				anchor={{ x: 0.5, y: 0.5 }}
			>
				<SpineTrack 
					trackIndex={0} 
					animationName="animtion0" 
					loop={true}
				/>
			</SpineProvider>
		</StoryPixiApp>
	{/snippet}
</Story>