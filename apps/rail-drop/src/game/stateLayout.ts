import { createLayout } from 'utils-layout';

export const { stateLayout, stateLayoutDerived } = createLayout({
	backgroundRatio: {
		normal: 16 / 9,
		portrait: 9 / 16,
	},
	mainSizesMap: {
		desktop:   { width: 1600, height: 900 },
		tablet:    { width: 1200, height: 900 },
		landscape: { width: 1600, height: 900 },
		portrait:  { width: 900,  height: 1600 },
	},
});
