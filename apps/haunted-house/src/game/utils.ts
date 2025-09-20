import _ from 'lodash';
import { stateBet } from 'state-shared';
import { createPlayBookUtils } from 'utils-book';
import { createGetEmptyPaddedBoard } from 'utils-slots';

import { SYMBOL_SIZE, REEL_PADDING, SYMBOL_INFO_MAP, BOARD_DIMENSIONS } from './constants';
import { eventEmitter } from './eventEmitter';
import type { Bet, BookEventOfType } from './typesBookEvent';
import { bookEventHandlerMap } from './bookEventHandlerMap';
import type { RawSymbol, SymbolState } from './types';

// general utils
export const { getEmptyBoard } = createGetEmptyPaddedBoard({ reelsDimensions: BOARD_DIMENSIONS });
export const { playBookEvent, playBookEvents } = createPlayBookUtils({ bookEventHandlerMap });
export const playBet = async (bet: Bet) => {
	try {
		console.log('🎮 playBet: Starting bet execution...');
		console.log('🎮 playBet: Bet object:', bet ? Object.keys(bet) : 'no bet');
		console.log('🎮 playBet: Bet state length:', bet?.state?.length || 0);
		console.log('🎮 playBet: Bet ID:', bet?.id);
		console.log('🎮 playBet: Bet payoutMultiplier:', bet?.payoutMultiplier);

		console.log('🎮 playBet: Resetting stateBet.winBookEventAmount to 0...');
		stateBet.winBookEventAmount = 0;
		console.log('✅ stateBet reset');

		console.log('🎮 playBet: Starting playBookEvents...');
		console.log('🎮 playBet: Events to play:', bet.state?.map(e => `${e.index}:${e.type}`) || []);

		await playBookEvents(bet.state);
		console.log('✅ playBookEvents completed');

		console.log('🎮 playBet: Broadcasting stopButtonEnable...');
		eventEmitter.broadcast({ type: 'stopButtonEnable' });
		console.log('✅ stopButtonEnable broadcasted');

		console.log('✅ playBet: Bet execution completed successfully');
	} catch (error) {
		console.error('❌ playBet: Failed to execute bet:', error);
		console.error('playBet error message:', error?.message);
		console.error('playBet error stack:', error?.stack);
		console.error('playBet error name:', error?.name);

		// Additional context
		console.error('playBet context - bet:', bet);
		console.error('playBet context - stateBet:', stateBet);
		console.error('playBet context - eventEmitter:', eventEmitter);

		throw error;
	}
};

// resume bet
const BOOK_EVENT_TYPES_TO_RESERVE_FOR_SNAPSHOT = [
	'updateGlobalMult',
	'freeSpinTrigger',
	'updateFreeSpin',
	'setTotalWin',
];

export const convertTorResumableBet = (lastBetData: Bet) => {
	const resumingIndex = Number(lastBetData.event);
	const bookEventsBeforeResume = lastBetData.state.filter(
		(_, eventIndex) => eventIndex < resumingIndex,
	);
	const bookEventsAfterResume = lastBetData.state.filter(
		(_, eventIndex) => eventIndex >= resumingIndex,
	);

	const bookEventToCreateSnapshot: BookEventOfType<'createBonusSnapshot'> = {
		index: 0,
		type: 'createBonusSnapshot',
		bookEvents: bookEventsBeforeResume.filter((bookEvent) =>
			BOOK_EVENT_TYPES_TO_RESERVE_FOR_SNAPSHOT.includes(bookEvent.type),
		),
	};

	const stateToResume = [bookEventToCreateSnapshot, ...bookEventsAfterResume];

	return { ...lastBetData, state: stateToResume };
};

// other utils
export const getSymbolX = (reelIndex: number) => SYMBOL_SIZE * (reelIndex + REEL_PADDING);
export const getSymbolY = (symbolIndexOfBoard: number) => (symbolIndexOfBoard + 0.5) * SYMBOL_SIZE;

export const getSymbolInfo = ({
	rawSymbol,
	state,
}: {
	rawSymbol: RawSymbol;
	state: SymbolState;
}) => {
	const symbolInfo = SYMBOL_INFO_MAP[rawSymbol.name][state];

	// Debug logging for win animations
	if (state === 'win') {
		console.log(`🎯 getSymbolInfo WIN: ${rawSymbol.name}`, {
			state,
			type: symbolInfo?.type,
			assetKey: symbolInfo?.assetKey,
			sizeRatios: symbolInfo?.sizeRatios,
			symbolExists: rawSymbol.name in SYMBOL_INFO_MAP,
			stateExists: state in (SYMBOL_INFO_MAP[rawSymbol.name] || {})
		});
	}

	return symbolInfo;
};
