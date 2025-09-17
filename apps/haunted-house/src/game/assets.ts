export default {
	loader: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/loader/loader.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/loader/loader.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	pressToContinueText: {
		type: 'sprites',
		src: new URL('../../assets/sprites/pressToContinueText/MM_pressanywhere.json', import.meta.url).href,
		preload: true,
	},
	H1: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/calabazaSpine/calabaza.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/calabazaSpine/calabaza.json', import.meta.url).href,
			scale: 2,
		},
	},
	H2: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/loboSpine/lobo.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/loboSpine/lobo.json', import.meta.url).href,
			scale: 2,
		},
	},
	H3: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/demonioSpine/demonio.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/demonioSpine/demonio.json', import.meta.url).href,
			scale: 2,
		},
	},
	H4: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/vampiroSpine/vampiro.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/vampiroSpine/vampiro.json', import.meta.url).href,
			scale: 2,
		},
	},
	H5: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h5.json', import.meta.url).href,
			scale: 2,
		},
	},
	L1: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/calaveraSpine/calaveraSpine.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/calaveraSpine/calaveraSpine.json', import.meta.url).href,
			scale: 2,
		},
	},
	L2: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/eddieCalavera/eddie.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/eddieCalavera/eddie.json', import.meta.url).href,
			scale: 2,
		},
	},
	L3: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/payasoSpine/payaso-spine.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/payasoSpine/payaso-spine.json', import.meta.url).href,
			scale: 2,
		},
	},
	L4: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/mujerSpine/mujer.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/mujerSpine/mujer.json', import.meta.url).href,
			scale: 2,
		},
	},
	M: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols2/symbols2.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols2/M.json', import.meta.url).href,
			scale: 2,
		},
	},
	S: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/cuchiSpine/cuchi.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/cuchiSpine/cuchi.json', import.meta.url).href,
			scale: 2,
		},
	},
	explosion: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols3/symbols3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols3/explosion.json', import.meta.url).href,
			scale: 2,
		},
	},
	W: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/wildSpine/wild.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/wildSpine/wild.json', import.meta.url).href,
			scale: 2,
		},
	},
	reelsFrame: {
		type: 'sprites',
		src: new URL('../../assets/sprites/reelsFrame/reels_frame.json', import.meta.url).href,
	},
	payFrame: {
		type: 'sprite',
		src: new URL('../../assets/sprites/payFrame/payFrame.png', import.meta.url).href,
	},
	anticipation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/anticipation/anticipation.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/anticipation/anticipation.json', import.meta.url).href,
			scale: 2,
		},
	},
	goldFont: {
		type: 'font',
		src: new URL('../../assets/fonts/goldFont/mm_gold.xml', import.meta.url).href,
	},
	goldBlur: {
		type: 'font',
		src: new URL('../../assets/fonts/goldBlur/miningfont_gold_blur.xml', import.meta.url).href,
	},
	silverFont: {
		type: 'font',
		src: new URL('../../assets/fonts/silverFont/mm_silver.xml', import.meta.url).href,
	},
	purpleFont: {
		type: 'font',
		src: new URL('../../assets/fonts/purpleFont/mm_purple.xml', import.meta.url).href,
	},
	bigwin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/bigwin/big_wins.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/bigwin/mm_bigwin.json', import.meta.url).href,
			scale: 2,
		},
	},
	globalMultiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/globalMultiplier/multiframe.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/globalMultiplier/multiframe.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsIntro: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsIntroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsOutroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_total_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	foregroundAnimation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/foregroundAnimation/mm_bg.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/foregroundAnimation/mm_bg.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	foregroundFeatureAnimation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/foregroundFeatureAnimation/mm_bg_feature.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/foregroundFeatureAnimation/mm_bg_feature.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	tumble_multiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_multiplier.json', import.meta.url).href,
			scale: 2,
		},
	},
	tumble_win: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_win.json', import.meta.url).href,
			scale: 2,
		},
	},
	reelhouse: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/reelhouse/reelhouse_glow.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/reelhouse/reelhouse_glow.json', import.meta.url).href,
			scale: 2,
		},
	},
	progressBar: {
		type: 'sprites',
		src: new URL('../../assets/sprites/progressBar/progressBar.json', import.meta.url).href,
		preload: true,
	},
	freeSpins: {
		type: 'sprites',
		src: new URL('../../assets/sprites/freeSpins/freeSpins.json', import.meta.url).href,
	},
	winSmall: {
		type: 'sprites',
		src: new URL('../../assets/sprites/winSmall/MM_Localisation_winsmall.json', import.meta.url).href,
	},
	clusterWin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/clusterWin/clusterpay.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/clusterWin/clusterpay.json', import.meta.url).href,
			scale: 2,
		},
	},
	transition: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/transition/transition.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/transition/transition.json', import.meta.url).href,
			scale: 2,
		},
	},
	symbolsStatic: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsStatic/symbolsStatic.json', import.meta.url).href,
	},
	coins: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/coin/SD2_Coin.json', import.meta.url).href,
	},
	sound: {
		type: 'audio',
		src: new URL('../../assets/audio/sounds.json', import.meta.url).href,
		preload: true,
	},
	hauntedHouseLogo: {
		type: 'sprite',
		src: new URL('../../assets/sprites/logo/Logo2.png', import.meta.url).href,
	},
	hauntedHouseLogoLoader: {
		type: 'sprite',
		src: new URL('../../assets/sprites/logo/HauntedHouseLogo.png', import.meta.url).href,
		preload: true,
	},
	hauntedHouseBackground: {
		type: 'sprite',
		src: new URL('../../assets/sprites/background/haunted-house-bg.png', import.meta.url).href,
		preload: true,
	},
	cofre: {
		type: 'sprite',
		src: new URL('../../assets/sprites/cofresydiamantes/PRUEBA2-0.png', import.meta.url).href,
		preload: true,
	},
	spritePrueba: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/spritePrueba/spritesheet.json', import.meta.url).href,
	},
	cofresSimple: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/cofresydiamantes/cofre_madera.json', import.meta.url).href,
	},
	payasoSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/payasoSpine/payaso-spine.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/payasoSpine/payaso-spine.json', import.meta.url).href,
			scale: 2,
		},
	},
	calaveraSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/calaveraSpine/calaveraSpine.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/calaveraSpine/calaveraSpine.json', import.meta.url).href,
			scale: 2,
		},
	},
	eddieSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/eddieCalavera/eddie.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/eddieCalavera/eddie.json', import.meta.url).href,
			scale: 2,
		},
	},
	mujerSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/mujerSpine/mujer.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/mujerSpine/mujer.json', import.meta.url).href,
			scale: 2,
		},
	},
	calabazaSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/calabazaSpine/calabaza.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/calabazaSpine/calabaza.json', import.meta.url).href,
			scale: 2,
		},
	},
	demonioSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/demonioSpine/demonio.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/demonioSpine/demonio.json', import.meta.url).href,
			scale: 2,
		},
	},
	loboSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/loboSpine/lobo.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/loboSpine/lobo.json', import.meta.url).href,
			scale: 2,
		},
	},
	vampiroSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/vampiroSpine/vampiro.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/vampiroSpine/vampiro.json', import.meta.url).href,
			scale: 2,
		},
	},
	cuchiSpine:{
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbolsSpine/cuchiSpine/cuchi.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbolsSpine/cuchiSpine/cuchi.json', import.meta.url).href,
			scale: 2,
		}
	},
	// Symbol Sprite Animations (New System)
	H1_ANIMATION: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/symbolAnimations/h1-calabaza/spritesheet.json', import.meta.url).href,
	},
	H2_ANIMATION: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/symbolAnimations/h2-lobo/spritesheet.json', import.meta.url).href,
	},
	H3_ANIMATION: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/symbolAnimations/h3-demonio/spritesheet.json', import.meta.url).href,
	},
	H4_ANIMATION: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/symbolAnimations/h4-vampiro/spritesheet.json', import.meta.url).href,
	},
	H5_ANIMATION: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/symbolAnimations/h5-momia/spritesheet.json', import.meta.url).href,
	},
	L1_ANIMATION: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/symbolAnimations/l1-calavera/spritesheet.json', import.meta.url).href,
	},
	L2_ANIMATION: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/symbolAnimations/l2-eddie/spritesheet.json', import.meta.url).href,
	},
	L3_ANIMATION: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/symbolAnimations/l3-payaso/spritesheet.json', import.meta.url).href,
	},
	L4_ANIMATION: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/symbolAnimations/l4-mujer/spritesheet.json', import.meta.url).href,
	},
	S_ANIMATION: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/symbolAnimations/s-scatter/spritesheet.json', import.meta.url).href,
	},
	W_ANIMATION: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/symbolAnimations/w-wild/spritesheet.json', import.meta.url).href,
	},
} as const;
