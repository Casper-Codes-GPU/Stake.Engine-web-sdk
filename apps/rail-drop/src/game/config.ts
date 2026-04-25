export default {
	providerName: 'sample_provider',
	gameName: 'Rail Drop',
	gameID: 'rail_drop',
	rtp: 0.99,
	numReels: 0,
	numRows: [] as number[],
	betModes: {
		base: {
			cost: 1.0,
			feature: true,
			buyBonus: false,
			rtp: 0.99,
			max_win: 1000,
		},
	},
	symbols: {} as Record<string, never>,
	paddingReels: {
		basegame: '',
	} as const,
};
