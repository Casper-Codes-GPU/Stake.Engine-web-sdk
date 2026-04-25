import { createGetWinLevelDataByWinLevelAlias } from 'utils-shared/winLevel';

import type { GamePhase, RiskLevel, Zone } from './types';
import { winLevelMap } from './winLevelMap';

export const stateGame = $state({
	phase: 'idle' as GamePhase,
	riskLevel: 'medium' as RiskLevel,
	activeZone: 0 as 0 | Zone,
	multiplier: 0,
	finalAmount: 0,
});

export const resetGame = () => {
	stateGame.phase = 'idle';
	stateGame.activeZone = 0;
	stateGame.multiplier = 0;
	stateGame.finalAmount = 0;
};

export const { getWinLevelDataByWinLevelAlias } = createGetWinLevelDataByWinLevelAlias({
	winLevelMap,
});

export const stateGameDerived = { getWinLevelDataByWinLevelAlias };
