<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { SpriteSheet } from 'pixi-svelte';
	import { StoryPixiApp } from 'components-storybook';

	const { Story } = defineMeta({
		tags: ['autodocs'],
		title: 'Sprites/Demogogo Character',
		component: SpriteSheet,
		args: {
			x: 400,
			y: 300,
			scale: 0.8,
			anchor: { x: 0.5, y: 0.5 },
			play: true,
			loop: true,
			animationSpeed: 0.15,
		},
		argTypes: {
			animationSpeed: {
				control: { type: 'range', min: 0.01, max: 1, step: 0.01 }
			},
			scale: {
				control: { type: 'range', min: 0.2, max: 2, step: 0.1 }
			},
			play: {
				control: { type: 'boolean' }
			},
			loop: {
				control: { type: 'boolean' }
			},
			x: {
				control: { type: 'range', min: 0, max: 800, step: 10 }
			},
			y: {
				control: { type: 'range', min: 0, max: 600, step: 10 }
			}
		}
	});
</script>

<script lang="ts">
	import assets from '../game/assets';
</script>

<Story name="Demogogo Character Animation">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.8); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🎭 Demogogo Character</h3>
				<p style="margin: 0;">Personaje animado del juego haunted house</p>
				<p style="margin: 5px 0 0 0; font-size: 12px;">Usa los controles para ajustar velocidad y escala</p>
			</div>

			<SpriteSheet
				key="DEMOGOGO_CHARACTER"
				{...args}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Demogogo Size Comparison">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.8); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">📏 Comparación de Tamaños</h3>
				<p style="margin: 0;">Pequeño (0.3x) - Mediano (0.6x) - Grande (1.0x)</p>
			</div>

			<!-- Pequeño -->
			<SpriteSheet
				key="DEMOGOGO_CHARACTER"
				x={200}
				y={350}
				scale={0.3}
				anchor={{ x: 0.5, y: 0.5 }}
				play={true}
				loop={true}
				animationSpeed={0.15}
			/>

			<!-- Mediano -->
			<SpriteSheet
				key="DEMOGOGO_CHARACTER"
				x={400}
				y={300}
				scale={0.6}
				anchor={{ x: 0.5, y: 0.5 }}
				play={true}
				loop={true}
				animationSpeed={0.15}
			/>

			<!-- Grande -->
			<SpriteSheet
				key="DEMOGOGO_CHARACTER"
				x={650}
				y={300}
				scale={1.0}
				anchor={{ x: 0.5, y: 0.5 }}
				play={true}
				loop={true}
				animationSpeed={0.15}
			/>

			<!-- Labels -->
			<div style="position: absolute; bottom: 100px; left: 170px; color: white; text-align: center; font-size: 14px;">Pequeño<br/>0.3x</div>
			<div style="position: absolute; bottom: 150px; left: 370px; color: white; text-align: center; font-size: 14px;">Mediano<br/>0.6x</div>
			<div style="position: absolute; bottom: 200px; left: 620px; color: white; text-align: center; font-size: 14px;">Grande<br/>1.0x</div>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Demogogo Speed Variations">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.8); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">⚡ Variaciones de Velocidad</h3>
				<p style="margin: 0;">Lento (0.05x) - Normal (0.15x) - Rápido (0.3x)</p>
			</div>

			<!-- Lento -->
			<SpriteSheet
				key="DEMOGOGO_CHARACTER"
				x={200}
				y={300}
				scale={0.7}
				anchor={{ x: 0.5, y: 0.5 }}
				play={true}
				loop={true}
				animationSpeed={0.05}
			/>

			<!-- Normal -->
			<SpriteSheet
				key="DEMOGOGO_CHARACTER"
				x={400}
				y={300}
				scale={0.7}
				anchor={{ x: 0.5, y: 0.5 }}
				play={true}
				loop={true}
				animationSpeed={0.15}
			/>

			<!-- Rápido -->
			<SpriteSheet
				key="DEMOGOGO_CHARACTER"
				x={600}
				y={300}
				scale={0.7}
				anchor={{ x: 0.5, y: 0.5 }}
				play={true}
				loop={true}
				animationSpeed={0.3}
			/>

			<!-- Labels -->
			<div style="position: absolute; bottom: 150px; left: 170px; color: white; text-align: center; font-size: 14px;">Lento<br/>0.05x</div>
			<div style="position: absolute; bottom: 150px; left: 370px; color: white; text-align: center; font-size: 14px;">Normal<br/>0.15x</div>
			<div style="position: absolute; bottom: 150px; left: 570px; color: white; text-align: center; font-size: 14px;">Rápido<br/>0.3x</div>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Demogogo Full Screen">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.8); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🖥️ Pantalla Completa</h3>
				<p style="margin: 0;">Demogogo a escala máxima</p>
			</div>

			<SpriteSheet
				key="DEMOGOGO_CHARACTER"
				x={400}
				y={300}
				scale={1.2}
				anchor={{ x: 0.5, y: 0.5 }}
				play={true}
				loop={true}
				animationSpeed={0.12}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>