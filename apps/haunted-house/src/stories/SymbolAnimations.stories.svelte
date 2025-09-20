<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { SpriteSheet } from 'pixi-svelte';
	import { StoryPixiApp } from 'components-storybook';

	const { Story } = defineMeta({
		tags: ['autodocs'],
		title: 'Sprites/SymbolAnimations',
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
	console.log('=== SYMBOL ANIMATIONS OVERVIEW ===');
	console.log('H1_ANIMATION in assets:', 'H1_ANIMATION' in assets);
	console.log('H2_ANIMATION in assets:', 'H2_ANIMATION' in assets);
	console.log('H3_ANIMATION in assets:', 'H3_ANIMATION' in assets);
	console.log('H4_ANIMATION in assets:', 'H4_ANIMATION' in assets);
	console.log('H5_ANIMATION in assets:', 'H5_ANIMATION' in assets);
	console.log('L1_ANIMATION in assets:', 'L1_ANIMATION' in assets);
	console.log('L2_ANIMATION in assets:', 'L2_ANIMATION' in assets);
	console.log('L3_ANIMATION in assets:', 'L3_ANIMATION' in assets);
	console.log('L4_ANIMATION in assets:', 'L4_ANIMATION' in assets);
	console.log('S_ANIMATION in assets:', 'S_ANIMATION' in assets);
	console.log('W_ANIMATION in assets:', 'W_ANIMATION' in assets);
</script>

<!-- HIGH VALUE SYMBOLS -->
<Story name="H1 Calabaza (Pumpkin)">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(255,140,0,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🎃 H1 - Calabaza (Pumpkin)</h3>
				<p style="margin: 0;">High value symbol sprite animation</p>
				<p style="margin: 5px 0 0 0; font-size: 12px;">SpriteSheet format from symbolAnimations</p>
			</div>

			<SpriteSheet
				key="H1_ANIMATION"
				{...args}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="H2 Lobo (Wolf)">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(139,69,19,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🐺 H2 - Lobo (Wolf)</h3>
				<p style="margin: 0;">High value symbol sprite animation</p>
				<p style="margin: 5px 0 0 0; font-size: 12px;">SpriteSheet format from symbolAnimations</p>
			</div>

			<SpriteSheet
				key="H2_ANIMATION"
				{...args}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="H3 Demonio (Demon)">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(128,0,0,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">👹 H3 - Demonio (Demon)</h3>
				<p style="margin: 0;">High value symbol sprite animation</p>
				<p style="margin: 5px 0 0 0; font-size: 12px;">SpriteSheet format from symbolAnimations</p>
			</div>

			<SpriteSheet
				key="H3_ANIMATION"
				{...args}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="H4 Vampiro (Vampire)">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(75,0,130,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🧛 H4 - Vampiro (Vampire)</h3>
				<p style="margin: 0;">High value symbol sprite animation</p>
				<p style="margin: 5px 0 0 0; font-size: 12px;">SpriteSheet format from symbolAnimations</p>
			</div>

			<SpriteSheet
				key="H4_ANIMATION"
				{...args}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="H5 Momia (Mummy)">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(184,134,11,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🧟 H5 - Momia (Mummy)</h3>
				<p style="margin: 0;">High value symbol sprite animation</p>
				<p style="margin: 5px 0 0 0; font-size: 12px;">SpriteSheet format from symbolAnimations</p>
			</div>

			<SpriteSheet
				key="H5_ANIMATION"
				{...args}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<!-- LOW VALUE SYMBOLS -->
<Story name="L1 Calavera (Skull)">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(105,105,105,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">💀 L1 - Calavera (Skull)</h3>
				<p style="margin: 0;">Low value symbol sprite animation</p>
				<p style="margin: 5px 0 0 0; font-size: 12px;">SpriteSheet format from symbolAnimations</p>
			</div>

			<SpriteSheet
				key="L1_ANIMATION"
				{...args}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="L2 Eddie">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(70,130,180,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🎸 L2 - Eddie</h3>
				<p style="margin: 0;">Low value symbol sprite animation</p>
				<p style="margin: 5px 0 0 0; font-size: 12px;">SpriteSheet format from symbolAnimations</p>
			</div>

			<SpriteSheet
				key="L2_ANIMATION"
				{...args}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="L3 Payaso (Clown)">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(255,20,147,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🤡 L3 - Payaso (Clown)</h3>
				<p style="margin: 0;">Low value symbol sprite animation</p>
				<p style="margin: 5px 0 0 0; font-size: 12px;">SpriteSheet format from symbolAnimations</p>
			</div>

			<SpriteSheet
				key="L3_ANIMATION"
				{...args}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="L4 Mujer (Woman)">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(220,20,60,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">👩 L4 - Mujer (Woman)</h3>
				<p style="margin: 0;">Low value symbol sprite animation</p>
				<p style="margin: 5px 0 0 0; font-size: 12px;">SpriteSheet format from symbolAnimations</p>
			</div>

			<SpriteSheet
				key="L4_ANIMATION"
				{...args}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<!-- SPECIAL SYMBOLS -->
<Story name="S Scatter (Cuchillo)">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(255,215,0,0.9); color: black; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🔪 S - Scatter (Cuchillo)</h3>
				<p style="margin: 0;">Special scatter symbol animation</p>
				<p style="margin: 5px 0 0 0; font-size: 12px;">SpriteSheet format from symbolAnimations</p>
			</div>

			<SpriteSheet
				key="S_ANIMATION"
				{...args}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="W Wild">
	{#snippet template(args)}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(50,205,50,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🃏 W - Wild</h3>
				<p style="margin: 0;">Special wild symbol animation</p>
				<p style="margin: 5px 0 0 0; font-size: 12px;">SpriteSheet format from symbolAnimations</p>
			</div>

			<SpriteSheet
				key="W_ANIMATION"
				{...args}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<!-- GRID VIEWS -->
<Story name="All High Value Symbols Grid">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(25,25,112,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">👑 High Value Symbols (H1-H5)</h3>
				<p style="margin: 0;">All premium symbol animations playing simultaneously</p>
			</div>

			<!-- First row: H1, H2, H3 -->
			<SpriteSheet key="H1_ANIMATION" x={150} y={200} scale={0.25} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.12} />
			<SpriteSheet key="H2_ANIMATION" x={300} y={200} scale={0.25} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.12} />
			<SpriteSheet key="H3_ANIMATION" x={450} y={200} scale={0.25} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.12} />

			<!-- Second row: H4, H5 -->
			<SpriteSheet key="H4_ANIMATION" x={225} y={350} scale={0.25} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.12} />
			<SpriteSheet key="H5_ANIMATION" x={375} y={350} scale={0.25} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.12} />
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="All Low Value Symbols Grid">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(105,105,105,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">💰 Low Value Symbols (L1-L4)</h3>
				<p style="margin: 0;">All standard symbol animations playing simultaneously</p>
			</div>

			<!-- Row: L1, L2, L3, L4 -->
			<SpriteSheet key="L1_ANIMATION" x={150} y={275} scale={0.25} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.12} />
			<SpriteSheet key="L2_ANIMATION" x={275} y={275} scale={0.25} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.12} />
			<SpriteSheet key="L3_ANIMATION" x={400} y={275} scale={0.25} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.12} />
			<SpriteSheet key="L4_ANIMATION" x={525} y={275} scale={0.25} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.12} />
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Special Symbols (Scatter + Wild)">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(255,165,0,0.9); color: black; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">⭐ Special Symbols</h3>
				<p style="margin: 0;">Scatter (S) and Wild (W) animations</p>
			</div>

			<!-- Left: Scatter, Right: Wild -->
			<SpriteSheet key="S_ANIMATION" x={250} y={275} scale={0.35} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.15} />
			<SpriteSheet key="W_ANIMATION" x={450} y={275} scale={0.35} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.15} />
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Complete Symbol Set Overview">
	{#snippet template()}
		<StoryPixiApp {assets}>
			<div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.9); color: white; padding: 15px; z-index: 1000; border-radius: 5px;">
				<h3 style="margin: 0 0 10px 0;">🎮 Complete Haunted House Symbol Set</h3>
				<p style="margin: 0;">All 11 symbol animations (H1-H5, L1-L4, S, W)</p>
				<p style="margin: 5px 0 0 0; font-size: 12px;">Replace spine animations with sprite-based system</p>
			</div>

			<!-- Top row: High value symbols H1-H5 -->
			<SpriteSheet key="H1_ANIMATION" x={100} y={150} scale={0.2} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.1} />
			<SpriteSheet key="H2_ANIMATION" x={200} y={150} scale={0.2} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.1} />
			<SpriteSheet key="H3_ANIMATION" x={300} y={150} scale={0.2} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.1} />
			<SpriteSheet key="H4_ANIMATION" x={400} y={150} scale={0.2} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.1} />
			<SpriteSheet key="H5_ANIMATION" x={500} y={150} scale={0.2} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.1} />

			<!-- Middle row: Low value symbols L1-L4 -->
			<SpriteSheet key="L1_ANIMATION" x={150} y={275} scale={0.2} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.1} />
			<SpriteSheet key="L2_ANIMATION" x={250} y={275} scale={0.2} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.1} />
			<SpriteSheet key="L3_ANIMATION" x={350} y={275} scale={0.2} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.1} />
			<SpriteSheet key="L4_ANIMATION" x={450} y={275} scale={0.2} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.1} />

			<!-- Bottom row: Special symbols S, W -->
			<SpriteSheet key="S_ANIMATION" x={250} y={400} scale={0.2} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.1} />
			<SpriteSheet key="W_ANIMATION" x={350} y={400} scale={0.2} anchor={{ x: 0.5, y: 0.5 }} play={true} loop={true} animationSpeed={0.1} />
		</StoryPixiApp>
	{/snippet}
</Story>