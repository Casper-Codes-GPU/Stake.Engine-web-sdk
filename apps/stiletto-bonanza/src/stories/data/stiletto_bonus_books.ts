/**
 * Stiletto Bonanza — sample bonus books for Storybook testing.
 *
 * Board layout: 5 reels × 5 rows. Visible rows = 1, 2, 3.
 *   row 0 = top padding (NOT rendered/animated)
 *   rows 1-3 = visible window
 *   row 4 = bottom padding (NOT rendered/animated)
 *
 * ALL symbol positions in winInfo and freeSpinTrigger MUST use rows 1-3.
 *
 * Amount units: amount / 100 = dollars displayed.
 *   e.g. amount: 300 = $3.00, amount: 650 = $6.50
 */

export default [
	// Book 1: Free spin with 3 prize ladies, hits first milestone (3 prizes → +5 spins)
	{
		id: 1,
		payoutMultiplier: 8.5,
		events: [
			{
				index: 0,
				type: 'freeSpinTrigger',
				totalFs: 10,
				positions: [
					{ reel: 0, row: 1 },
					{ reel: 2, row: 2 },
					{ reel: 4, row: 3 },
				],
			},
			// Free spin 1: H2 wins on reels 0-2 (row 1), Prize Ladies on reels 1,2,4
			{
				index: 1,
				type: 'reveal',
				board: [
					[{ name: 'L2' }, { name: 'H2' }, { name: 'L1' }, { name: 'L3' }, { name: 'H3' }], // reel 0: H2 at row 1
					[{ name: 'L1' }, { name: 'H2' }, { name: 'P' }, { name: 'L4' }, { name: 'L1' }],  // reel 1: H2 at row 1, P at row 2
					[{ name: 'L4' }, { name: 'H2' }, { name: 'L1' }, { name: 'P' }, { name: 'L4' }],  // reel 2: H2 at row 1, P at row 3
					[{ name: 'H1' }, { name: 'L3' }, { name: 'L1' }, { name: 'H4' }, { name: 'L2' }], // reel 3: no P
					[{ name: 'L3' }, { name: 'P' }, { name: 'H4' }, { name: 'L1' }, { name: 'H1' }],  // reel 4: P at row 1
				],
				paddingPositions: [10, 20, 30, 40, 50],
				gameType: 'freegame',
				anticipation: [0, 0, 0, 0, 0],
			},
			{
				index: 2,
				type: 'winInfo',
				totalWin: 300,
				wins: [
					{
						symbol: 'H2',
						kind: 3,
						win: 300,
						positions: [
							{ reel: 0, row: 1 }, // row 1 = top visible row ✓
							{ reel: 1, row: 1 }, // row 1 = top visible row ✓
							{ reel: 2, row: 1 }, // row 1 = top visible row ✓
						],
						meta: { lineIndex: 1, multiplier: 1, winWithoutMult: 300, globalMult: 1, lineMultiplier: 1 },
					},
				],
			},
			{
				index: 3,
				type: 'collectPrize',
				prizes: [
					{ reel: 1, row: 2, value: 100 }, // P at reel 1, row 2 ✓ ($1.00)
					{ reel: 2, row: 3, value: 200 }, // P at reel 2, row 3 ✓ ($2.00)
					{ reel: 4, row: 1, value: 50 },  // P at reel 4, row 1 ✓ ($0.50)
				],
				totalPrizeWin: 350,
				collectionCount: 3,
			},
			{
				index: 4,
				type: 'milestoneReached',
				milestone: 3,
				extraSpins: 5,
				totalFreeSpins: 15,
			},
			{
				index: 5,
				type: 'updateFreeSpin',
				amount: 0,
				total: 15,
			},
			{
				index: 6,
				type: 'setTotalWin',
				amount: 650,
			},
			// Free spin 2 (no prizes, no win)
			{
				index: 7,
				type: 'reveal',
				board: [
					[{ name: 'L1' }, { name: 'H4' }, { name: 'L2' }, { name: 'H1' }, { name: 'L3' }],
					[{ name: 'H3' }, { name: 'L3' }, { name: 'H2' }, { name: 'L2' }, { name: 'H4' }],
					[{ name: 'L4' }, { name: 'H1' }, { name: 'L5' }, { name: 'H3' }, { name: 'L1' }],
					[{ name: 'H2' }, { name: 'L4' }, { name: 'H4' }, { name: 'L1' }, { name: 'H2' }],
					[{ name: 'L2' }, { name: 'H3' }, { name: 'L3' }, { name: 'H1' }, { name: 'L4' }],
				],
				paddingPositions: [15, 25, 35, 45, 55],
				gameType: 'freegame',
				anticipation: [0, 0, 0, 0, 0],
			},
			{
				index: 8,
				type: 'updateFreeSpin',
				amount: 1,
				total: 15,
			},
			{
				index: 9,
				type: 'setTotalWin',
				amount: 650,
			},
			{
				index: 10,
				type: 'freeSpinEnd',
				amount: 650,
				winLevel: 2,
			},
			{
				index: 11,
				type: 'setTotalWin',
				amount: 650,
			},
			{
				index: 12,
				type: 'finalWin',
				amount: 650,
			},
		],
		criteria: 'freegame',
		baseGameWins: 0,
		freeGameWins: 650,
	},
	// Book 2: Big win — 6 prize ladies, two milestones hit (3 → +5, 6 → +5)
	{
		id: 2,
		payoutMultiplier: 25.0,
		events: [
			{
				index: 0,
				type: 'freeSpinTrigger',
				totalFs: 10,
				positions: [
					{ reel: 1, row: 2 },
					{ reel: 2, row: 1 },
					{ reel: 3, row: 3 },
				],
			},
			// Free spin 1: 6 Prize Ladies, no line win
			{
				index: 1,
				type: 'reveal',
				board: [
					[{ name: 'L1' }, { name: 'P' }, { name: 'P' }, { name: 'L3' }, { name: 'H2' }], // reel 0: P at rows 1,2
					[{ name: 'H2' }, { name: 'P' }, { name: 'L4' }, { name: 'P' }, { name: 'L1' }], // reel 1: P at rows 1,3
					[{ name: 'L1' }, { name: 'H3' }, { name: 'H1' }, { name: 'P' }, { name: 'H4' }], // reel 2: P at row 3
					[{ name: 'H4' }, { name: 'L2' }, { name: 'P' }, { name: 'H3' }, { name: 'H4' }], // reel 3: P at row 2
					[{ name: 'L3' }, { name: 'H4' }, { name: 'L2' }, { name: 'L4' }, { name: 'H1' }], // reel 4: no P
				],
				paddingPositions: [5, 15, 25, 35, 45],
				gameType: 'freegame',
				anticipation: [0, 0, 0, 0, 0],
			},
			{
				index: 2,
				type: 'collectPrize',
				prizes: [
					{ reel: 0, row: 1, value: 200 }, // row 1 ✓ ($2.00)
					{ reel: 0, row: 2, value: 100 }, // row 2 ✓ ($1.00)
					{ reel: 1, row: 1, value: 500 }, // row 1 ✓ ($5.00)
					{ reel: 1, row: 3, value: 100 }, // row 3 ✓ ($1.00)
					{ reel: 2, row: 3, value: 200 }, // row 3 ✓ ($2.00)
					{ reel: 3, row: 2, value: 50 },  // row 2 ✓ ($0.50)
				],
				totalPrizeWin: 1150,
				collectionCount: 6,
			},
			{
				index: 3,
				type: 'milestoneReached',
				milestone: 3,
				extraSpins: 5,
				totalFreeSpins: 15,
			},
			{
				index: 4,
				type: 'milestoneReached',
				milestone: 6,
				extraSpins: 5,
				totalFreeSpins: 20,
			},
			{
				index: 5,
				type: 'updateFreeSpin',
				amount: 0,
				total: 20,
			},
			{
				index: 6,
				type: 'setTotalWin',
				amount: 1150,
			},
			{
				index: 7,
				type: 'freeSpinEnd',
				amount: 2500,
				winLevel: 4,
			},
			{
				index: 8,
				type: 'setTotalWin',
				amount: 2500,
			},
			{
				index: 9,
				type: 'finalWin',
				amount: 2500,
			},
		],
		criteria: 'freegame',
		baseGameWins: 0,
		freeGameWins: 2500,
	},
];
