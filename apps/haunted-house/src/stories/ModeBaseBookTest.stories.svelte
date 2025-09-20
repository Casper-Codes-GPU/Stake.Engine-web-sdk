<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'MODE_BASE_TEST/book',
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

	// Import Game component - using static imports
	import Game from '../components/Game.svelte';
	import { getContext } from '../game/context';
	import { playBet } from '../game/utils';
	import baseBooks from './data/base_books';

	console.log('✅ All components imported successfully');
	console.log('✅ Books imported successfully, count:', baseBooks?.length || 0);
	console.log('MODE_BASE_TEST story initialized');
</script>

<Story
	name="import_test"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			console.log('🎮 Testing imports in action...');
			return { success: true };
		},
	})}
>
	{#snippet template(args)}
		<StoryGameTemplate {...args}>
			{#snippet children()}
				<div style="color: white; text-align: center; padding: 50px;">
					<h1>Import Test</h1>
					<p>Check console for import results</p>
				</div>
			{/snippet}
		</StoryGameTemplate>
	{/snippet}
</Story>