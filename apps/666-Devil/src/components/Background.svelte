<script lang="ts">
	import { Rectangle, Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';

	const context = getContext();
	
	// Calculate background layout to cover full canvas
	const backgroundLayout = () => ({
		x: context.stateLayoutDerived.canvasSizes().width / 2,
		y: context.stateLayoutDerived.canvasSizes().height / 2,
		width: context.stateLayoutDerived.canvasSizes().width,
		height: context.stateLayoutDerived.canvasSizes().height,
	});
</script>

<!-- Black background as fallback -->
<Rectangle {...context.stateLayoutDerived.canvasSizes()} backgroundColor={0x000000} zIndex={-3} />

<!-- 666-Devil background image with infernal flames -->
<Sprite
	key="devilBackground"
	anchor={0.5}
	x={backgroundLayout().x}
	y={backgroundLayout().y}
	width={backgroundLayout().width}
	height={backgroundLayout().height}
	zIndex={-2}
/>