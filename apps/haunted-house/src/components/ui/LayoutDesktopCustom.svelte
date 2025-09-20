<script lang="ts">
	import { stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle, anchorToPivot } from 'pixi-svelte';

	import { DESKTOP_BASE_SIZE, DESKTOP_BACKGROUND_WIDTH_LIST } from 'components-ui-pixi/src/constants';
	import { getContext } from 'components-ui-pixi/src/context';
	import type { LayoutUiProps } from 'components-ui-pixi/src/types';

	const props: LayoutUiProps = $props();
	const context = getContext();
</script>

<Container x={20}>
	{@render props.gameName()}
</Container>

<Container x={context.stateLayoutDerived.canvasSizes().width - 20}>
	{@render props.logo()}
</Container>

<MainContainer standard alignVertical="bottom">
	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
		y={context.stateLayoutDerived.mainLayoutStandard().height - DESKTOP_BASE_SIZE - 10}
		pivot={anchorToPivot({
			anchor: { x: 0.5, y: 0 },
			sizes: {
				height: DESKTOP_BASE_SIZE,
				width: DESKTOP_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0),
			},
		})}
	>
		<Container y={DESKTOP_BASE_SIZE * 0.5 - 160} x={900 - 500} scale={0.8}>
			{@render props.amountBalance({ stacked: true })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5 - 160} x={900} scale={0.8}>
			{@render props.amountWin({ stacked: true })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.4 + 1} x={1525} scale={0.6}>
			{@render props.amountBet({ stacked: true })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={220} scale={0.8}>
			{@render props.buttonMenu({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={220 + 150} scale={0.8}>
			{@render props.buttonBuyBonus({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={160 + 150 * 4} scale={0.8}>
			{@render props.buttonAutoSpin({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={160 + 150 * 5} scale={0.8}>
			{@render props.buttonBet({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={160 + 150 * 6} scale={0.8}>
			{@render props.buttonTurbo({ anchor: 0.5 })}
		</Container>

		<!-- REMOVED: Original increase/decrease buttons for haunted house game -->
		<!-- The custom HauntedHouseUIControl is rendered separately in Game.svelte -->
	</Container>
</MainContainer>

{#if stateUi.menuOpen}
	<Rectangle
		eventMode="static"
		cursor="pointer"
		alpha={0.5}
		anchor={0.5}
		backgroundColor={BLACK}
		width={context.stateLayoutDerived.canvasSizes().width}
		height={context.stateLayoutDerived.canvasSizes().height}
		x={context.stateLayoutDerived.canvasSizes().width * 0.5}
		y={context.stateLayoutDerived.canvasSizes().height * 0.5}
		onpointerup={() => (stateUi.menuOpen = false)}
	/>

	<MainContainer standard alignVertical="bottom">
		<Container
			x={298}
			y={context.stateLayoutDerived.mainLayoutStandard().height - DESKTOP_BASE_SIZE - 10}
		>
			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 3}>
				{@render props.buttonPayTable({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 2}>
				{@render props.buttonGameRules({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 1}>
				{@render props.buttonSettings({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150}>
				{@render props.buttonSoundSwitch({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5}>
				{@render props.buttonMenuClose({ anchor: 0.5 })}
			</Container>
		</Container>
	</MainContainer>
{/if}