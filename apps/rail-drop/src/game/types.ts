import type config from './config';

export type BetMode = keyof typeof config.betModes;
export type GameType = keyof typeof config.paddingReels;
export type RiskLevel = 'low' | 'medium' | 'high';
export type Zone = 1 | 2 | 3;
export type BallDirection = 'L' | 'R';

export type GamePhase = 'idle' | 'rolling' | 'dropping' | 'bouncing' | 'landed';
