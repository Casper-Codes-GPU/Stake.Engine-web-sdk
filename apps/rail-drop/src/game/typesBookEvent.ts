import type { BetType } from 'rgs-requests';
import type { RiskLevel, Zone, BallDirection } from './types';

// Server resolves zone, path through pins, and final multiplier.
type BookEventDrop = {
	index: number;
	type: 'drop';
	zone: Zone;
	riskLevel: RiskLevel;
	path: BallDirection[]; // length === zone.rows, one L/R per pin row
	slotIndex: number;     // 0..zone.rows (= number of R's in path)
	multiplier: number;
};

type BookEventFinalWin = {
	index: number;
	type: 'finalWin';
	amount: number; // in cents (bet × multiplier)
};

type BookEventCreateBonusSnapshot = {
	index: number;
	type: 'createBonusSnapshot';
	bookEvents: BookEvent[];
};

export type BookEvent =
	| BookEventDrop
	| BookEventFinalWin
	| BookEventCreateBonusSnapshot;

export type Bet = BetType<BookEvent>;
export type BookEventOfType<T> = Extract<BookEvent, { type: T }>;
export type BookEventContext = { bookEvents: BookEvent[] };
