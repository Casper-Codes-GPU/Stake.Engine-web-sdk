<script lang="ts">
	import { Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';

	const context = getContext();

	// Calculate logo position above the board
	const logoLayout = () => ({
		x: context.stateGameDerived.boardLayout().x,
		y: context.stateGameDerived.boardLayout().y - context.stateGameDerived.boardLayout().height * 0.6,
		width: 280,
		height: 180,
	});
</script>

<Sprite
	key="hauntedHouseLogo"
	anchor={0.5}
	x={logoLayout().x}
	y={logoLayout().y}
	width={logoLayout().width}
	height={logoLayout().height}
/>