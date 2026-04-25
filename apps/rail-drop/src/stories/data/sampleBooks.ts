/* Sample books for Storybook / manual playback without a live RGS.
 *
 * Mechanics:
 *   Ball rolls along rail, drops into one of 3 plinko zones:
 *     Zone 1: 8 rows  — conservative multipliers
 *     Zone 2: 12 rows — medium variance
 *     Zone 3: 16 rows — extreme multipliers
 *   slotIndex = number of R's in path (0 = leftmost, rows = rightmost)
 *   finalWin.amount is in cents (bet = 100c)
 */

import type { BookEvent } from '../../game/typesBookEvent';

// Zone 1, low risk, center slot → 0.5× (loss) — medium risk
export const bookZone1Loss: BookEvent[] = [
	{ index: 0, type: 'drop', zone: 1, riskLevel: 'medium',
	  path: ['R','L','R','L','R','L','R','L'], slotIndex: 4, multiplier: 0.4 },
	{ index: 1, type: 'finalWin', amount: 40 },
];

// Zone 1, low risk, edge slot → 5.6×
export const bookZone1Edge: BookEvent[] = [
	{ index: 0, type: 'drop', zone: 1, riskLevel: 'low',
	  path: ['L','L','L','L','L','L','L','L'], slotIndex: 0, multiplier: 5.6 },
	{ index: 1, type: 'finalWin', amount: 560 },
];

// Zone 2, medium risk, center → 0.3×
export const bookZone2Center: BookEvent[] = [
	{ index: 0, type: 'drop', zone: 2, riskLevel: 'medium',
	  path: ['R','R','L','R','L','R','L','L','R','L','R','L'], slotIndex: 6, multiplier: 0.3 },
	{ index: 1, type: 'finalWin', amount: 30 },
];

// Zone 2, high risk, left edge → 170×
export const bookZone2BigWin: BookEvent[] = [
	{ index: 0, type: 'drop', zone: 2, riskLevel: 'high',
	  path: ['L','L','L','L','L','L','L','L','L','L','L','L'], slotIndex: 0, multiplier: 170 },
	{ index: 1, type: 'finalWin', amount: 17000 },
];

// Zone 3, medium risk, near-edge → 41×
export const bookZone3MedWin: BookEvent[] = [
	{ index: 0, type: 'drop', zone: 3, riskLevel: 'medium',
	  path: ['L','L','L','L','L','L','L','L','L','L','L','L','L','L','L','R'], slotIndex: 1, multiplier: 41 },
	{ index: 1, type: 'finalWin', amount: 4100 },
];

// Zone 3, high risk, right edge → 1000× (MAX WIN)
export const bookZone3MaxWin: BookEvent[] = [
	{ index: 0, type: 'drop', zone: 3, riskLevel: 'high',
	  path: ['R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R'], slotIndex: 16, multiplier: 1000 },
	{ index: 1, type: 'finalWin', amount: 100000 },
];

export const sampleBooks = {
	zone1Loss:     bookZone1Loss,
	zone1Edge:     bookZone1Edge,
	zone2Center:   bookZone2Center,
	zone2BigWin:   bookZone2BigWin,
	zone3MedWin:   bookZone3MedWin,
	zone3MaxWin:   bookZone3MaxWin,
};
