<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import BaseContent from './BaseContent.svelte';
	import BaseScrollable from './BaseScrollable.svelte';

	type Props = {
		children: Snippet;
	};

	const props: Props = $props();
</script>

{#if stateModal.modal?.name === 'gameRules'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<BaseContent maxWidth="100%">
			<BaseScrollable type="column">
				<h2>Game Rules</h2>
				<ol>
					<li>Each player takes turns in a clockwise order.</li>
					<li>On your turn, roll the dice and move your piece accordingly.</li>
					<li>If you land on a special tile, follow the instructions on that tile.</li>
					<li>The first player to reach the finish line wins the game.</li>
					<li>If you cannot make a valid move, your turn is skipped.</li>
				</ol>
				{@render props.children()}
			</BaseScrollable>
		</BaseContent>
	</Popup>
{/if}
