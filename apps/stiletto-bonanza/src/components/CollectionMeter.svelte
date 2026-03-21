<script lang="ts" module>
	export type EmitterEventCollectionMeter =
		| { type: 'collectionMeterShow' }
		| { type: 'collectionMeterHide' }
		| { type: 'collectionMeterUpdate'; count: number };
</script>

<script lang="ts">
	import { MainContainer } from 'components-layout';
	import { FadeContainer } from 'components-pixi';
	import { Container, BitmapText, Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { SYMBOL_SIZE } from '../game/constants';

	const context = getContext();

	// Milestones from game config: 3, 6, 10
	const MILESTONES = [3, 6, 10];
	const MAX_COUNT = 10;

	let show = $state(false);
	let count = $state(0);

	const panelWidth = $derived(SYMBOL_SIZE * 2.2);
	const panelHeight = $derived(SYMBOL_SIZE * 0.8);

	const position = $derived({
		x:
			context.stateGameDerived.boardLayout().x +
			context.stateGameDerived.boardLayout().width * 0.5 +
			SYMBOL_SIZE * 0.2,
		y:
			context.stateGameDerived.boardLayout().y -
			context.stateGameDerived.boardLayout().height * 0.5,
	});

	const fontSize = SYMBOL_SIZE * 0.22;
	const barWidth = $derived(panelWidth * 0.85);
	const filledWidth = $derived((count / MAX_COUNT) * barWidth);

	context.eventEmitter.subscribeOnMount({
		collectionMeterShow: () => (show = true),
		collectionMeterHide: () => (show = false),
		collectionMeterUpdate: (emitterEvent) => {
			count = emitterEvent.count;
		},
	});
</script>

<MainContainer>
	<FadeContainer {show} {...position}>
		<Container>
			<!-- Background panel -->
			<Container>
				<!-- Track background -->
				<Container
					x={panelWidth * 0.075}
					y={panelHeight * 0.55}
				>
					<!-- Filled bar -->
					<Container>
						<BitmapText
							text={`PRIZES: ${count} / ${MAX_COUNT}`}
							x={panelWidth * 0.5}
							y={0}
							anchor={{ x: 0.5, y: 1 }}
							style={{ fontFamily: 'gold', fontSize, wordWrap: false }}
						/>
					</Container>
				</Container>

				<!-- Milestone markers -->
				{#each MILESTONES as milestone}
					<BitmapText
						text={`${milestone}`}
						x={panelWidth * 0.075 + (milestone / MAX_COUNT) * barWidth}
						y={panelHeight * 0.3}
						anchor={{ x: 0.5, y: 0.5 }}
						style={{
							fontFamily: 'gold',
							fontSize: fontSize * 0.8,
							fill: count >= milestone ? 0xffd700 : 0xaaaaaa,
						}}
					/>
				{/each}
			</Container>
		</Container>
	</FadeContainer>
</MainContainer>
