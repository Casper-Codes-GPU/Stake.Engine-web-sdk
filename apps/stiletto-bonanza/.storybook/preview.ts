import { preview } from 'config-storybook';

// ─── Mock RGS API for Storybook development ──────────────────────────────────
// The BET button calls the real RGS server (which doesn't exist in Storybook).
// We intercept fetch calls and return local book data instead.
//
// Board layout: 5 reels × 5 rows. Visible rows = 1, 2, 3.
//   row 0 = top padding (NOT visible), row 4 = bottom padding (NOT visible).
// All symbol positions for win/scatter animations MUST be in rows 1–3.
//
// Amount units: amount / 100 = dollars displayed. (e.g. 300 = $3.00)
//
// Balance timing:
//   /wallet/play  → returns balance AFTER bet deduction (before payout)
//   /wallet/end-round → returns balance AFTER payout is added

const API_AMOUNT_MULTIPLIER = 1000000; // 1 dollar = 1,000,000 in API

// ─── Mock state ───────────────────────────────────────────────────────────────
let mockBalance = 1000 * API_AMOUNT_MULTIPLIER; // $1,000 start
let pendingPayout = 0; // payout held until /wallet/end-round

// ─── Board definitions ────────────────────────────────────────────────────────
// Board A: 3 Prize Ladies visible + H2 line win on row 1 (reels 0-2)
const BOARD_A = [
	[{ name: 'L2' }, { name: 'H2' }, { name: 'L1' }, { name: 'L3' }, { name: 'H3' }], // reel 0: H2 row 1
	[{ name: 'L1' }, { name: 'H2' }, { name: 'P' },  { name: 'L4' }, { name: 'L1' }], // reel 1: H2 row 1, P row 2
	[{ name: 'L4' }, { name: 'H2' }, { name: 'L1' }, { name: 'P' },  { name: 'L4' }], // reel 2: H2 row 1, P row 3
	[{ name: 'H1' }, { name: 'L3' }, { name: 'L1' }, { name: 'H4' }, { name: 'L2' }], // reel 3: no P
	[{ name: 'L3' }, { name: 'P' },  { name: 'H4' }, { name: 'L1' }, { name: 'H1' }], // reel 4: P row 1
];

// Board B: no prizes, no win
const BOARD_B = [
	[{ name: 'L1' }, { name: 'H4' }, { name: 'L2' }, { name: 'H1' }, { name: 'L3' }],
	[{ name: 'H3' }, { name: 'L3' }, { name: 'H2' }, { name: 'L2' }, { name: 'H4' }],
	[{ name: 'L4' }, { name: 'H1' }, { name: 'L5' }, { name: 'H3' }, { name: 'L1' }],
	[{ name: 'H2' }, { name: 'L4' }, { name: 'H4' }, { name: 'L1' }, { name: 'H2' }],
	[{ name: 'L2' }, { name: 'H3' }, { name: 'L3' }, { name: 'H1' }, { name: 'L4' }],
];

// ─── Free spin event generator ────────────────────────────────────────────────
// Generates all bonus spin events to be embedded in the scatter base response.
// betDisplay = (betAmount / API_AMOUNT_MULTIPLIER) * 100  (e.g. $1 bet → 100)
// Returns: { events, totalWin } where totalWin is in display units.
const generateFreeSpinEvents = (startIdx: number, betDisplay: number) => {
	const BASE_SPINS = 10;
	const MILESTONE_SPINS = 5;
	const TOTAL_SPINS = BASE_SPINS + MILESTONE_SPINS; // 15

	const events: unknown[] = [];
	let idx = startIdx;
	let totalWin = 0;

	// ── Spin 1: Board A with H2 win + 3 Prize Ladies + Milestone ──────────────
	const spinWin = betDisplay * 3; // 3× H2 line win
	const prizeWin = Math.round(betDisplay * 3.5); // 1× + 2× + 0.5× prize ladies
	totalWin += spinWin + prizeWin;

	events.push({
		index: idx++, type: 'reveal', board: BOARD_A,
		paddingPositions: [10, 20, 30, 40, 50], gameType: 'freegame', anticipation: [0, 0, 0, 0, 0],
	});
	events.push({
		index: idx++, type: 'winInfo', totalWin: spinWin,
		wins: [{
			symbol: 'H2', kind: 3, win: spinWin,
			positions: [{ reel: 0, row: 1 }, { reel: 1, row: 1 }, { reel: 2, row: 1 }],
			meta: { lineIndex: 1, multiplier: 1, winWithoutMult: spinWin, globalMult: 1, lineMultiplier: 1 },
		}],
	});
	events.push({
		index: idx++, type: 'collectPrize',
		prizes: [
			{ reel: 1, row: 2, value: betDisplay },
			{ reel: 2, row: 3, value: betDisplay * 2 },
			{ reel: 4, row: 1, value: Math.round(betDisplay * 0.5) },
		],
		totalPrizeWin: prizeWin, collectionCount: 3,
	});
	events.push({
		index: idx++, type: 'milestoneReached',
		milestone: 3, extraSpins: MILESTONE_SPINS, totalFreeSpins: TOTAL_SPINS,
	});
	events.push({ index: idx++, type: 'updateFreeSpin', amount: 1, total: TOTAL_SPINS });
	events.push({ index: idx++, type: 'setTotalWin', amount: totalWin });

	// ── Spins 2 to TOTAL_SPINS: Board B, no prizes ────────────────────────────
	for (let i = 2; i <= TOTAL_SPINS; i++) {
		events.push({
			index: idx++, type: 'reveal', board: BOARD_B,
			paddingPositions: [15, 25, 35, 45, 55], gameType: 'freegame', anticipation: [0, 0, 0, 0, 0],
		});
		events.push({ index: idx++, type: 'updateFreeSpin', amount: i, total: TOTAL_SPINS });
		events.push({ index: idx++, type: 'setTotalWin', amount: totalWin });
	}

	// ── End of free spins ─────────────────────────────────────────────────────
	const winLevel = totalWin > betDisplay * 10 ? 3 : totalWin > 0 ? 2 : 1;
	events.push({ index: idx++, type: 'freeSpinEnd', amount: totalWin, winLevel });
	events.push({ index: idx++, type: 'setTotalWin', amount: totalWin });
	events.push({ index: idx++, type: 'finalWin', amount: totalWin });

	return { events, totalWin };
};

// ─── Base game book templates ─────────────────────────────────────────────────
// NOTE: The scatter book (index 2) events are generated dynamically per-bet,
//       so only the reusable board events are stored here as a template.
const SCATTER_REVEAL_EVENT = {
	index: 0, type: 'reveal',
	board: [
		[{ name: 'L2' }, { name: 'S', scatter: true }, { name: 'H2' }, { name: 'L3' }, { name: 'H3' }], // S row 1
		[{ name: 'H1' }, { name: 'L5' }, { name: 'S', scatter: true }, { name: 'H3' }, { name: 'L4' }], // S row 2
		[{ name: 'L3' }, { name: 'H4' }, { name: 'L1' }, { name: 'S', scatter: true }, { name: 'L4' }], // S row 3
		[{ name: 'H4' }, { name: 'H3' }, { name: 'L4' }, { name: 'L5' }, { name: 'L1' }],
		[{ name: 'H3' }, { name: 'L3' }, { name: 'H2' }, { name: 'H1' }, { name: 'H1' }],
	],
	paddingPositions: [10, 20, 30, 40, 50],
	gameType: 'basegame', anticipation: [0, 0, 0, 0, 0],
};

const mockBaseBooks = [
	// Book 0: No win
	{
		isScatter: false,
		payoutMultiplier: 0,
		events: [
			{
				index: 0, type: 'reveal',
				board: [
					[{ name: 'L2' }, { name: 'L1' }, { name: 'H2' }, { name: 'L3' }, { name: 'H3' }],
					[{ name: 'H1' }, { name: 'L5' }, { name: 'L2' }, { name: 'H3' }, { name: 'L4' }],
					[{ name: 'L3' }, { name: 'H4' }, { name: 'L1' }, { name: 'H4' }, { name: 'L4' }],
					[{ name: 'H4' }, { name: 'H3' }, { name: 'L4' }, { name: 'L5' }, { name: 'L1' }],
					[{ name: 'H3' }, { name: 'L3' }, { name: 'H2' }, { name: 'H1' }, { name: 'H1' }],
				],
				paddingPositions: [10, 20, 30, 40, 50],
				gameType: 'basegame', anticipation: [0, 0, 0, 0, 0],
			},
			{ index: 1, type: 'setTotalWin', amount: 0 },
			{ index: 2, type: 'finalWin', amount: 0 },
		],
	},
	// Book 1: 3× H1 line win — H1 in row 1 on reels 0-2
	{
		isScatter: false,
		payoutMultiplier: 3,
		events: [
			{
				index: 0, type: 'reveal',
				board: [
					[{ name: 'L2' }, { name: 'H1' }, { name: 'H2' }, { name: 'L3' }, { name: 'H3' }], // H1 row 1
					[{ name: 'L5' }, { name: 'H1' }, { name: 'L2' }, { name: 'H3' }, { name: 'L4' }], // H1 row 1
					[{ name: 'H4' }, { name: 'H1' }, { name: 'L1' }, { name: 'H4' }, { name: 'L4' }], // H1 row 1
					[{ name: 'L2' }, { name: 'H3' }, { name: 'L4' }, { name: 'L5' }, { name: 'L1' }],
					[{ name: 'L3' }, { name: 'L3' }, { name: 'H2' }, { name: 'H2' }, { name: 'H1' }],
				],
				paddingPositions: [5, 15, 25, 35, 45],
				gameType: 'basegame', anticipation: [0, 0, 0, 0, 0],
			},
			{
				index: 1, type: 'winInfo', totalWin: 300,
				wins: [{
					symbol: 'H1', kind: 3, win: 300,
					positions: [{ reel: 0, row: 1 }, { reel: 1, row: 1 }, { reel: 2, row: 1 }],
					meta: { lineIndex: 1, multiplier: 1, winWithoutMult: 300, globalMult: 1, lineMultiplier: 1 },
				}],
			},
			{ index: 2, type: 'setWin', amount: 300, winLevel: 2 },
			{ index: 3, type: 'setTotalWin', amount: 300 },
			{ index: 4, type: 'finalWin', amount: 300 },
		],
	},
	// Book 2: 3 scatters → free spins (events built dynamically in handler)
	{ isScatter: true, payoutMultiplier: 0, events: [] },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const randomBook = <T>(books: T[]) => books[Math.floor(Math.random() * books.length)];

const mockResponse = (body: unknown) =>
	new Response(JSON.stringify(body), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});

// ─── Fetch interceptor ────────────────────────────────────────────────────────
const originalFetch = window.fetch.bind(window);

window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
	const url =
		typeof input === 'string'
			? input
			: input instanceof URL
				? input.href
				: (input as Request).url;

	// /wallet/play — main spin request
	if (url.includes('/wallet/play')) {
		let mode = 'BASE';
		let betAmount = 0;
		try {
			const body = JSON.parse((init?.body as string) ?? '{}');
			mode = body.mode ?? 'BASE';
			betAmount = body.amount ?? 0;
		} catch { /* ignore */ }

		// Deduct bet from balance immediately (payout held for end-round)
		mockBalance = Math.max(0, mockBalance - betAmount);

		const book = randomBook(mockBaseBooks);

		if (book.isScatter) {
			// Build scatter response with all 15 free spins embedded
			const betDisplay = Math.round((betAmount / API_AMOUNT_MULTIPLIER) * 100);
			const { events: bonusEvents, totalWin } = generateFreeSpinEvents(2, betDisplay);
			const scatterEvents = [
				SCATTER_REVEAL_EVENT,
				{ index: 1, type: 'freeSpinTrigger', totalFs: 10, positions: [{ reel: 0, row: 1 }, { reel: 1, row: 2 }, { reel: 2, row: 3 }] },
				...bonusEvents,
			];
			// Hold payout until end-round
			pendingPayout = Math.round((totalWin / 100) * API_AMOUNT_MULTIPLIER);

			return mockResponse({
				balance: { amount: mockBalance, currency: 'USD' },
				round: {
					roundID: Math.floor(Math.random() * 1_000_000),
					payoutMultiplier: betDisplay > 0 ? totalWin / betDisplay : 0,
					active: false,
					state: scatterEvents,
					mode,
					event: '0',
					amount: betAmount,
					payout: pendingPayout,
				},
			});
		}

		// Regular base book (no win or line win)
		const payout = Math.round(book.payoutMultiplier * betAmount);
		pendingPayout = payout;

		return mockResponse({
			balance: { amount: mockBalance, currency: 'USD' },
			round: {
				roundID: Math.floor(Math.random() * 1_000_000),
				payoutMultiplier: book.payoutMultiplier,
				active: false,
				state: book.events,
				mode,
				event: '0',
				amount: betAmount,
				payout,
			},
		});
	}

	// /wallet/end-round — add pending payout to balance after win animations
	if (url.includes('/wallet/end-round')) {
		mockBalance += pendingPayout;
		pendingPayout = 0;
		return mockResponse({ balance: { amount: mockBalance, currency: 'USD' } });
	}

	// /wallet/authenticate — on game init, reset all state
	if (url.includes('/wallet/authenticate')) {
		mockBalance = 1000 * API_AMOUNT_MULTIPLIER;
		pendingPayout = 0;
		return mockResponse({
			balance: { amount: mockBalance, currency: 'USD' },
			config: {
				betLevels: [1, 2, 5, 10, 20, 50, 100],
				betModes: {
					BASE: { mode: 'BASE', costMultiplier: 1, feature: false },
					BONUS: { mode: 'BONUS', costMultiplier: 100, feature: true },
				},
				defaultBetLevel: 10,
				jurisdiction: {
					socialCasino: false, disabledFullscreen: false, disabledTurbo: false,
					disabledSuperTurbo: false, disabledAutoplay: false, disabledSlamstop: false,
					disabledSpacebar: false, disabledBuyFeature: false, displayNetPosition: false,
					displayRTP: false, displaySessionTimer: false, minimumRoundDuration: 0,
				},
			},
		});
	}

	// /bet/event — round progress tracking
	if (url.includes('/bet/event')) {
		return mockResponse({ event: '0' });
	}

	return originalFetch(input, init);
};

// ─────────────────────────────────────────────────────────────────────────────

export default preview;
