import type { BookEventHandlerMap } from 'utils-book';

import { eventEmitter } from './eventEmitter';
import type { BookEvent, BookEventOfType, BookEventContext } from './typesBookEvent';

export const bookEventHandlerMap: BookEventHandlerMap<BookEvent, BookEventContext> = {
	drop: async (bookEvent: BookEventOfType<'drop'>) => {
		await eventEmitter.broadcastAsync({ type: 'reset' });
		await eventEmitter.broadcastAsync({ type: 'drop', data: bookEvent });
	},
	finalWin: async (bookEvent: BookEventOfType<'finalWin'>) => {
		await eventEmitter.broadcastAsync({ type: 'finalWin', data: bookEvent });
	},
	createBonusSnapshot: async () => {},
};
