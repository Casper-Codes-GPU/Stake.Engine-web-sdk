<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'DEBUG/MODE_BASE_Diagnostic',
	});
</script>

<script lang="ts">
	import {
		StoryGameTemplate,
		StoryLocale,
		type TemplateArgs,
		templateArgs,
	} from 'components-storybook';

	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	import { playBet } from '../game/utils';
	import books from './data/base_books';

	// Comprehensive diagnostic logging
	console.log('=== DIAGNOSTIC STORY START ===');

	// Check all imports
	console.log('📦 IMPORTS CHECK:');
	console.log('- StoryGameTemplate:', typeof StoryGameTemplate);
	console.log('- StoryLocale:', typeof StoryLocale);
	console.log('- Game component:', typeof Game);
	console.log('- setContext function:', typeof setContext);
	console.log('- playBet function:', typeof playBet);
	console.log('- books array:', Array.isArray(books), 'length:', books?.length);

	// Check context dependencies
	console.log('📦 CONTEXT DEPENDENCIES:');
	try {
		setContext();
		console.log('✅ setContext executed without errors');
	} catch (error) {
		console.error('❌ setContext failed:', error);
	}

	// Check first book structure
	if (books && books.length > 0) {
		console.log('📦 FIRST BOOK STRUCTURE:');
		const firstBook = books[0];
		console.log('- Book keys:', Object.keys(firstBook));
		console.log('- Events count:', firstBook.events?.length || 0);
		console.log('- First event:', firstBook.events?.[0]);
		console.log('- First event type:', firstBook.events?.[0]?.type);
		console.log('- First event board:', firstBook.events?.[0]?.board ? 'present' : 'missing');
	}
</script>

<!-- Game Component Only Test -->
<Story
	name="Game Component Only"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			console.log('🧪 DIAGNOSTIC: Minimal action - no playBet call');
		},
	})}
>
	{#snippet template(args)}
		<div style="background: #f0f0f0; padding: 20px; border: 2px solid blue;">
			<h2>🧪 DIAGNOSTIC: Game Component Test</h2>
			<p>This story only renders the Game component without calling playBet</p>

			<StoryGameTemplate
				skipLoadingScreen={args.skipLoadingScreen}
				action={args.action}
			>
				<StoryLocale lang="en">
					<div style="border: 1px solid green; padding: 10px;">
						<p>✅ About to render Game component...</p>
						<Game />
						<p>✅ Game component rendered successfully</p>
					</div>
				</StoryLocale>
			</StoryGameTemplate>
		</div>
	{/snippet}
</Story>

<!-- PlayBet Test -->
<Story
	name="PlayBet Minimal Test"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			try {
				console.log('🧪 DIAGNOSTIC: Testing playBet with first book');
				const testBook = books[0];
				console.log('🧪 Test book:', testBook);

				const payload = { ...testBook, state: testBook.events };
				console.log('🧪 PlayBet payload prepared:', Object.keys(payload));

				await playBet(payload);
				console.log('✅ DIAGNOSTIC: playBet completed without errors');
			} catch (error) {
				console.error('❌ DIAGNOSTIC: playBet failed:', error);
				throw error;
			}
		},
	})}
>
	{#snippet template(args)}
		<div style="background: #fff3cd; padding: 20px; border: 2px solid orange;">
			<h2>🧪 DIAGNOSTIC: PlayBet Test</h2>
			<p>This story tests playBet function with the first book</p>

			<StoryGameTemplate
				skipLoadingScreen={args.skipLoadingScreen}
				action={args.action}
			>
				<StoryLocale lang="en">
					<div style="border: 1px solid orange; padding: 10px;">
						<Game />
					</div>
				</StoryLocale>
			</StoryGameTemplate>
		</div>
	{/snippet}
</Story>

<!-- Symbol Loading Test -->
<Story name="Symbol Loading Test">
	{#snippet template()}
		<div style="background: #d1ecf1; padding: 20px; border: 2px solid teal;">
			<h2>🧪 DIAGNOSTIC: Symbol Loading Test</h2>
			<p>This story tests symbol and asset configurations</p>
			<p>Check console for detailed symbol analysis</p>

			<button onclick={() => {
				console.log('🧪 DIAGNOSTIC: Testing symbol configurations');

				// Test symbol constants
				import('../game/constants').then(constants => {
					console.log('🧪 SYMBOL_INFO_MAP keys:', Object.keys(constants.SYMBOL_INFO_MAP));
					console.log('🧪 HIGH_SYMBOLS:', constants.HIGH_SYMBOLS);

					// Check each symbol has required properties
					Object.entries(constants.SYMBOL_INFO_MAP).forEach(([symbol, info]) => {
						console.log(`🧪 Symbol ${symbol}:`, {
							hasWin: !!info.win,
							hasStatic: !!info.static,
							winType: info.win?.type,
							winAssetKey: info.win?.assetKey
						});
					});
				});

				// Test asset loading
				import('../game/assets').then(assets => {
					console.log('🧪 Assets keys count:', Object.keys(assets.default).length);
					console.log('🧪 Sprite animation assets:', Object.keys(assets.default).filter(k => k.includes('_ANIMATION')));
				});
			}}>
				🔍 Run Symbol Analysis
			</button>
		</div>
	{/snippet}
</Story>