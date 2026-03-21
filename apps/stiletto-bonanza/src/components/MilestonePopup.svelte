<script lang="ts" module>
	export type EmitterEventMilestonePopup =
		| { type: 'milestonePopupShow'; milestone: number; extraSpins: number }
		| { type: 'milestonePopupHide' };
</script>

<script lang="ts">
	import { CanvasSizeRectangle } from 'components-layout';
	import { FadeContainer } from 'components-pixi';
	import { waitForResolve } from 'utils-shared/wait';
	import { BitmapText, Container } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { SYMBOL_SIZE } from '../game/constants';
	import PressToContinue from './PressToContinue.svelte';

	const context = getContext();

	let show = $state(false);
	let milestone = $state(0);
	let extraSpins = $state(0);
	let oncomplete = $state(() => {});

	const fontSize = SYMBOL_SIZE * 0.35;
	const subFontSize = SYMBOL_SIZE * 0.25;

	context.eventEmitter.subscribeOnMount({
		milestonePopupShow: async (emitterEvent) => {
			milestone = emitterEvent.milestone;
			extraSpins = emitterEvent.extraSpins;
			show = true;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
		milestonePopupHide: () => (show = false),
	});
</script>

<FadeContainer {show}>
	<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.65} />

	<Container
		x={context.stateLayoutDerived.canvasSizes().width * 0.5}
		y={context.stateLayoutDerived.canvasSizes().height * 0.5}
		pivot={{ x: 0, y: 0 }}
	>
		<BitmapText
			text={`MILESTONE!`}
			anchor={{ x: 0.5, y: 0.5 }}
			y={-fontSize}
			style={{ fontFamily: 'gold', fontSize, wordWrap: false }}
		/>
		<BitmapText
			text={`${milestone} PRIZES COLLECTED`}
			anchor={{ x: 0.5, y: 0.5 }}
			y={0}
			style={{ fontFamily: 'gold', fontSize: subFontSize, wordWrap: false }}
		/>
		<BitmapText
			text={`+${extraSpins} FREE SPINS!`}
			anchor={{ x: 0.5, y: 0.5 }}
			y={subFontSize * 1.5}
			style={{ fontFamily: 'gold', fontSize, wordWrap: false }}
		/>
	</Container>

	<PressToContinue onpress={() => oncomplete()} />
</FadeContainer>
