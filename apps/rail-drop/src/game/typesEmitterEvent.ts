import type { BookEventOfType } from './typesBookEvent';

export type EmitterEventDrop = {
	type: 'drop';
	data: BookEventOfType<'drop'>;
};

export type EmitterEventFinalWin = {
	type: 'finalWin';
	data: BookEventOfType<'finalWin'>;
};

export type EmitterEventReset = { type: 'reset' };

export type EmitterEventGame =
	| EmitterEventDrop
	| EmitterEventFinalWin
	| EmitterEventReset;
