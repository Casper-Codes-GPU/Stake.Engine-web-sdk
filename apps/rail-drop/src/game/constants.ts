import type { RiskLevel } from './types';

export const RAIL_Y = 90;
export const RAIL_START_X = 60;
export const BALL_R = 11;
export const SLOT_HEIGHT = 48;

// Zone geometry: 3 plinko boards hanging below the rail.
// Zone 1 (near, 8 rows): conservative multipliers.
// Zone 2 (mid, 12 rows): higher variance.
// Zone 3 (far, 16 rows): extreme multipliers.
export const ZONES = {
	1: { rows: 8,  centerX: 280,  boardTopY: 150, slotWidth: 34, rowHeight: 46, pinRadius: 5 },
	2: { rows: 12, centerX: 780,  boardTopY: 150, slotWidth: 28, rowHeight: 40, pinRadius: 4 },
	3: { rows: 16, centerX: 1310, boardTopY: 150, slotWidth: 22, rowHeight: 35, pinRadius: 3 },
} as const;

// Real Stake Plinko multipliers (symmetric, ~99% RTP per zone).
// Indexed by [rows][riskLevel][slotIndex 0..rows].
export const MULTIPLIERS: Record<8 | 12 | 16, Record<RiskLevel, number[]>> = {
	8: {
		low:    [5.6, 2.1, 1.1, 1.0, 0.5, 1.0, 1.1, 2.1, 5.6],
		medium: [13,  3,   1.3, 0.7, 0.4, 0.7, 1.3, 3,   13 ],
		high:   [29,  4,   1.5, 0.3, 0.2, 0.3, 1.5, 4,   29 ],
	},
	12: {
		low:    [10,  3,  1.6, 1.4, 1.1, 1.0, 0.5, 1.0, 1.1, 1.4, 1.6, 3,  10 ],
		medium: [33,  11, 4,   2,   1.1, 0.6, 0.3, 0.6, 1.1, 2,   4,   11, 33 ],
		high:   [170, 24, 8.1, 2,   0.7, 0.2, 0.2, 0.2, 0.7, 2,   8.1, 24, 170],
	},
	16: {
		low:    [16,   9,   2,  1.4, 1.4, 1.2, 1.1, 1.0, 0.5, 1.0, 1.1, 1.2, 1.4, 1.4, 2,  9,   16  ],
		medium: [110,  41,  10, 5,   3,   1.5, 1.0, 0.5, 0.3, 0.5, 1.0, 1.5, 3,   5,   10, 41,  110 ],
		high:   [1000, 130, 26, 9,   4,   2,   0.2, 0.2, 0.2, 0.2, 0.2, 2,   4,   9,   26, 130, 1000],
	},
};

// Slot color by multiplier value (symmetric: edges = hot, center = cool).
export function slotColor(mult: number): string {
	if (mult >= 100) return '#e53935';
	if (mult >= 20)  return '#e64a19';
	if (mult >= 10)  return '#f57c00';
	if (mult >= 5)   return '#f9a825';
	if (mult >= 2)   return '#558b2f';
	if (mult >= 1)   return '#00695c';
	if (mult >= 0.5) return '#1565c0';
	return '#4527a0';
}

// Ball roll duration per zone (ms).
export const ROLL_DURATION: Record<1 | 2 | 3, number> = {
	1: 700,
	2: 1100,
	3: 1500,
};

export const DROP_DURATION = 280;
export const BOUNCE_DURATION = 130;
export const BOUNCE_PAUSE = 25;
export const WIN_DISPLAY_MS = 2800;
