import { createIntermediateMachineBet } from './createIntermediateMachineBet';
import { createIntermediateMachineAutoBet } from './createIntermediateMachineAutoBet';
import { createIntermediateMachineResumeBet } from './createIntermediateMachineResumeBet';
import { createIntermediateMachineForceResult } from './createIntermediateMachineForceResult';

import type { PrimaryMachines } from './types';

const createIntermediateMachines = ({
	forceGame,
	resumeGame,
	newGame,
	playGame,
	endGame,
	replayGame,
}: PrimaryMachines) => {
	const bet = createIntermediateMachineBet({ newGame, playGame, endGame });
	const autoBet = createIntermediateMachineAutoBet({ bet });
	const resumeBet = createIntermediateMachineResumeBet({ resumeGame, playGame, endGame });
	const forceResult = createIntermediateMachineForceResult({ forceGame, playGame, endGame });
	const betReplay = createIntermediateMachineBet({ newGame: replayGame, playGame, endGame });

	return {
		bet,
		autoBet,
		resumeBet,
		forceResult,
		betReplay,
	};
};

export { createIntermediateMachines };
