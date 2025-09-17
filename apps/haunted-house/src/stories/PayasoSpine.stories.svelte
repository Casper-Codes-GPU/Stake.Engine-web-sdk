<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	
	import { SpineProvider, SpineTrack } from 'pixi-svelte';
	import { StoryPixiApp } from 'components-storybook';
	
	const { Story } = defineMeta({
		tags: ['autodocs'],
		title: 'Spines/PayasoSpine (Dragon Bones Converted)',
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

<Story name="Converted Dragon Bones Animation">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.8); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🐉 Dragon Bones → Spine Conversion Test</h3>
				<p style="margin: 0;">Simple rotation animation converted from Dragon Bones format.</p>
				<p style="margin: 5px 0 0 0;">Animation: "payaso-wobble" (0.5s loop)</p>
			</div>
			
			<SpineProvider 
				{...args}
				key="payasoSpine"
			>
				<SpineTrack 
					trackIndex={0} 
					animationName="payaso-wobble" 
					loop={true}
				/>
			</SpineProvider>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Animation Controls">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.8); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🎮 Animation Controls</h3>
				<p style="margin: 0;">Testing different playback modes</p>
			</div>
			
			<!-- Loop version -->
			<SpineProvider
				key="payasoSpine"
				x={250} 
				y={200} 
				scale={0.6} 
				anchor={{ x: 0.5, y: 0.5 }}
			>
				<SpineTrack 
					trackIndex={0} 
					animationName="payaso-wobble" 
					loop={true}
				/>
			</SpineProvider>
			
			<!-- Single play version -->
			<SpineProvider
				key="payasoSpine"
				x={550} 
				y={200} 
				scale={0.6} 
				anchor={{ x: 0.5, y: 0.5 }}
			>
				<SpineTrack 
					trackIndex={0} 
					animationName="payaso-wobble" 
					loop={false}
				/>
			</SpineProvider>
			
			<!-- Static version (no animation) -->
			<SpineProvider
				key="payasoSpine"
				x={400} 
				y={400} 
				scale={0.6} 
				anchor={{ x: 0.5, y: 0.5 }}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>