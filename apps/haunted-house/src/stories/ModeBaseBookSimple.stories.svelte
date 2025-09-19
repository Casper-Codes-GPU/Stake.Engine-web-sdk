<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'MODE_BASE_SIMPLE/test',
	});
</script>

<script lang="ts">
	import { StoryGameTemplate, type TemplateArgs, templateArgs } from 'components-storybook';

	// Simple test - no game imports yet
	console.log('Simple MODE_BASE test initializing...');
</script>

<Story
	name="simple_test"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			console.log('🎮 Simple test action running...');
			return { success: true };
		},
	})}
>
	{#snippet template(args)}
		<StoryGameTemplate {...args}>
			{#snippet children()}
				<div style="color: white; text-align: center; padding: 50px;">
					<h1>Test Simple - No Game Component</h1>
					<p>If you see this, the basic story structure works</p>
				</div>
			{/snippet}
		</StoryGameTemplate>
	{/snippet}
</Story>