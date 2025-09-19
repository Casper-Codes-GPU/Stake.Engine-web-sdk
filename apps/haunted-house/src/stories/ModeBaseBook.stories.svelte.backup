<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'MODE_BASE/book',
	});
</script>

<script lang="ts">
	import {
		StoryGameTemplate,
		StoryLocale,
		type TemplateArgs,
		templateArgs,
	} from 'components-storybook';
	import { randomInteger } from 'utils-shared/random';

	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	import { playBet } from '../game/utils';
	import books from './data/base_books';

	// Simple initialization logging
	console.log('MODE_BASE story initializing...');
	console.log('Books available:', books?.length || 0);

	// Set context
	setContext();
</script>

<Story
	name="random"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			console.log('🎮 Starting MODE_BASE random book...');

			const index = randomInteger({ min: 0, max: books.length - 1 });
			const data = books[index];

			console.log('📖 Playing book', index, 'with', data.events?.length, 'events');
			console.log('📖 Events:', data.events?.map(e => e.type));

			await playBet({ ...data, state: data.events });

			console.log('✅ Book completed successfully');
		},
	})}
>
	{#snippet template(args)}
		<StoryGameTemplate
			skipLoadingScreen={args.skipLoadingScreen}
			action={args.action}
		>
			<StoryLocale lang="en">
				<Game />
			</StoryLocale>
		</StoryGameTemplate>
	{/snippet}
</Story>