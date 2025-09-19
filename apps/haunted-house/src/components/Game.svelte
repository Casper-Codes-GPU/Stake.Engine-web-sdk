<script lang="ts">
	import { onMount } from 'svelte';

	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App, Text, REM, Container } from 'pixi-svelte';
	import { stateModal } from 'state-shared';

	import { UiGameName } from 'components-ui-pixi';
	import { GameVersion, Modals } from 'components-ui-html';
	import HauntedHouseUI from './ui/HauntedHouseUI.svelte';

	import { getContext } from '../game/context';
	import { playBet } from '../game/utils';
	import { randomInteger } from 'utils-shared/random';
	import books from '../stories/data/base_books';
	import EnableSound from './EnableSound.svelte';
	import EnableGameActor from './EnableGameActor.svelte';
	import ResumeBet from './ResumeBet.svelte';
	import Sound from './Sound.svelte';
	import Background from './Background.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import BoardFrame from './BoardFrame.svelte';
	import Board from './Board.svelte';
	import Anticipations from './Anticipations.svelte';
	import Win from './Win.svelte';
	import FreeSpinIntro from './FreeSpinIntro.svelte';
	import FreeSpinCounter from './FreeSpinCounter.svelte';
	import FreeSpinOutro from './FreeSpinOutro.svelte';
	import Transition from './Transition.svelte';
	import I18nTest from './I18nTest.svelte';
	import HauntedHouseLogo from './HauntedHouseLogo.svelte';
	import HauntedHouseUIControl from './ui/HauntedHouseUIControl.svelte';
	import { stateBet, stateBetDerived, stateConfig } from 'state-shared';

	const context = getContext();

	onMount(() => {
		context.stateLayout.showLoadingScreen = true;

		// Set a proper balance for Storybook testing
		if (stateBet.balanceAmount === 0) {
			stateBet.balanceAmount = 10000; // Set sufficient balance for testing
			console.log('🔍 DEBUG - Set balance to', stateBet.balanceAmount, 'for testing');
		}
	});

	context.eventEmitter.subscribeOnMount({
		buyBonusConfirm: () => {
			stateModal.modal = { name: 'buyBonusConfirm' };
		},
	});

	// Enhanced custom UI functions - replicated from Action button functionality
	async function handleCustomSpin() {
		console.log('🎰 CustomSpin called', {
			isIdle: context.stateXstateDerived.isIdle(),
			gameState: context.stateXstate.current?.value
		});

		try {
			// Use same random book selection as Action button in Storybook
			console.log('🎰 Total books available:', books.length);
			const index = randomInteger({ min: 0, max: books.length - 1 });
			const data = books[index];
			console.log('🎰 Running random book at index', index, 'of', books.length - 1);
			console.log('🎰 Book data preview:', {
				id: data.id,
				eventCount: data.events?.length,
				payoutMultiplier: data.payoutMultiplier,
				hasFreespins: data.events?.some(e => e.type === 'freeSpinTrigger') || false
			});

			await playBet({ ...data, state: data.events });
			console.log('🎰 Random spin completed successfully');
		} catch (error) {
			console.error('🎰 Error in handleCustomSpin:', error);
		}
	}

	function handleCustomIncreaseBet() {
		console.log('CustomIncreaseBet called', {
			currentBetAmount: stateBet.betAmount,
			betOptions: stateConfig.betAmountOptions,
			isIdle: context.stateXstateDerived.isIdle()
		});

		try {
			context.eventEmitter.broadcast({ type: 'soundPressGeneral' });

			// Find next higher bet amount - DETAILED DEBUG
			console.log('🔍 DEBUG - Starting bet calculation:');
			console.log('  Current bet amount:', stateBet.betAmount);
			console.log('  Raw bet options:', stateConfig.betAmountOptions);

			const biggest = stateConfig.betAmountOptions[stateConfig.betAmountOptions.length - 1];
			console.log('  Biggest option:', biggest);

			const sortedOptions = [...stateConfig.betAmountOptions].sort((a, b) => a - b);
			console.log('  Sorted options:', sortedOptions);

			const nextBigger = sortedOptions.find((option) => {
				console.log(`    Checking option ${option} > ${stateBet.betAmount}:`, option > stateBet.betAmount);
				return option > stateBet.betAmount;
			});
			console.log('  Next bigger found:', nextBigger);

			const newAmount = nextBigger || biggest;
			console.log('  Final new amount:', newAmount);
			console.log('🔍 DEBUG - Calling setBetAmount with:', newAmount);
			console.log('🔍 DEBUG - Before setBetAmount - Balance:', stateBet.balanceAmount);
			console.log('🔍 DEBUG - Before setBetAmount - Bet cost multiplier:', stateBetDerived.activeBetMode()?.costMultiplier);

			stateBetDerived.setBetAmount(newAmount);

			console.log('🔍 DEBUG - After setBetAmount, current bet is:', stateBet.betAmount);
		} catch (error) {
			console.error('Error in handleCustomIncreaseBet:', error);
		}
	}

	function handleCustomDecreaseBet() {
		console.log('CustomDecreaseBet called', {
			currentBetAmount: stateBet.betAmount,
			betOptions: stateConfig.betAmountOptions,
			isIdle: context.stateXstateDerived.isIdle()
		});

		try {
			context.eventEmitter.broadcast({ type: 'soundPressGeneral' });

			// Find next lower bet amount
			const smallest = stateConfig.betAmountOptions[0];
			const nextSmaller = [...stateConfig.betAmountOptions]
				.sort((a, b) => b - a)
				.find((option) => option < stateBet.betAmount);

			const newAmount = nextSmaller || smallest;
			console.log('Setting bet amount to:', newAmount);

			stateBetDerived.setBetAmount(newAmount);
		} catch (error) {
			console.error('Error in handleCustomDecreaseBet:', error);
		}
	}

	// Enhanced state derivations with proper reactivity
	$: gameState = context.stateXstate.current?.value;
	$: isIdle = context.stateXstateDerived.isIdle();
	$: isSpinning = !isIdle;

	$: customIncreaseDisabled = stateBet.betAmount === stateConfig.betAmountOptions[stateConfig.betAmountOptions.length - 1];
	$: customDecreaseDisabled = stateBet.betAmount === stateConfig.betAmountOptions[0];

	// Enhanced positioning that's more responsive
	$: canvasSizes = context.stateLayoutDerived.canvasSizes();
	$: rightCornerX = canvasSizes.width - 200;
	$: rightCornerY = canvasSizes.height - 150;

	// Debug positioning
	$: {
		console.log('Canvas positioning:', {
			canvasSizes,
			rightCornerX,
			rightCornerY
		});
	}

	// Debug state changes
	$: {
		console.log('Game state changed:', {
			gameState,
			isIdle,
			isSpinning,
			betAmount: stateBet.betAmount,
			customIncreaseDisabled,
			customDecreaseDisabled
		});
	}
</script>

<App>
	<EnableSound />
	<EnableHotkey />
	<EnableGameActor />
	<EnablePixiExtension />

	<Background />

	{#if context.stateLayout.showLoadingScreen}
		<LoadingScreen onloaded={() => (context.stateLayout.showLoadingScreen = false)} />
	{:else}
		<ResumeBet />
		<!--
			The reason why <Sound /> is rendered after clicking the loading screen:
			"Autoplay with sound is allowed if: The user has interacted with the domain (click, tap, etc.)."
			Ref: https://developer.chrome.com/blog/autoplay
		-->
		<Sound />

		<MainContainer>
			<BoardFrame />
		</MainContainer>

		<MainContainer>
			<HauntedHouseLogo />
			<Board />
			<Anticipations />
		</MainContainer>

		<HauntedHouseUI>
			{#snippet gameName()}
				<UiGameName name="HAUNTED HOUSE" />
			{/snippet}
			{#snippet logo()}
				<Text
					anchor={{ x: 1, y: 0 }}
					text="ADD YOUR LOGO"
					style={{
						fontFamily: 'proxima-nova',
						fontSize: REM * 1.5,
						fontWeight: '600',
						lineHeight: REM * 2,
						fill: 0xffffff,
					}}
				/>
			{/snippet}
		</HauntedHouseUI>

		<!-- Enhanced Custom Haunted House UI Control with better positioning and state management -->
		<Container
			x={1000}
			y={550}
		>
			<HauntedHouseUIControl
				x={0}
				y={0}
				scale={0.3}
				disabled={false}
				increaseDisabled={customIncreaseDisabled}
				decreaseDisabled={customDecreaseDisabled}
				onspin={handleCustomSpin}
				onincreaseBet={handleCustomIncreaseBet}
				ondecreaseBet={handleCustomDecreaseBet}
			/>
		</Container>

		<Win />
		<FreeSpinIntro />
		{#if ['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType())}
			<FreeSpinCounter />
		{/if}
		<FreeSpinOutro />
		<Transition />

		<I18nTest />
	{/if}
</App>

<Modals>
	{#snippet version()}
		<GameVersion version="0.0.0" />
	{/snippet}
</Modals>
