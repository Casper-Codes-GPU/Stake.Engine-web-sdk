import { setup, createActor, fromPromise } from 'xstate';
// import { inspect } from '@xstate/inspect';

import type { IntermediateMachines } from './types';
import { context, type Context } from './machineContext';
import {
	STATE_RENDERING,
	STATE_IDLE,
	STATE_BET,
	STATE_AUTOBET,
	STATE_RESUME_BET,
	STATE_FORCE_RESULT,
	STATE_END,
	STATE_REPLAY,
	STATE_RENDERED,
} from './constants';
import { stateUrlDerived } from 'state-shared';

type GameType = 'replay' | 'regular';

// states
const stateRendering = {
	on: {
		RENDERED: {
			target: 'rendered',
		},
	},
};

const stateRendered = {
	invoke: {
		src: 'checkGameType' as const,
		onDone: [
			{
				target: 'replay',
				guard: ({ event }: { event: { output: GameType } }) => event.output === 'replay',
			},
			{
				target: 'idle',
				guard: ({ event }: { event: { output: GameType } }) => event.output === 'regular',
			}
		],
	},
};

const stateIdle = {
	on: {
		FORCE_RESULT: {
			target: 'forceResult',
		},
		RESUME_BET: {
			target: 'resumeBet',
		},
		BET: {
			target: 'bet',
		},
		AUTO_BET: {
			target: 'autoBet',
		},
	},
};

const stateForceResult = {
	invoke: {
		id: 'forceResult',
		src: 'forceResult' as const,
		onDone: 'idle',
	},
};

const stateResumeBet = {
	invoke: {
		id: 'resumeBet',
		src: 'resumeBet' as const,
		onDone: 'idle',
	},
};

const stateBet = {
	invoke: {
		id: 'bet',
		src: 'bet' as const,
		onDone: 'idle',
	},
};

const stateAutoBet = {
	invoke: {
		id: 'autoBet',
		src: 'autoBet' as const,
		onDone: 'idle',
	},
};

const stateReplay = {
	invoke: {
		id: 'betReplay',
		src: 'betReplay' as const,
		onDone: 'end',
	},
};

const stateEnd = {
	type: 'final' as const,
};

const createGameActor = (intermediateMachines: IntermediateMachines) => {
	// machine
	const gameMachine = setup({
		types: {} as {
			context: Context;
		},
		actors: {
			bet: intermediateMachines.bet,
			autoBet: intermediateMachines.autoBet,
			resumeBet: intermediateMachines.resumeBet,
			forceResult: intermediateMachines.forceResult,
			betReplay: intermediateMachines.betReplay,
			checkGameType: fromPromise<GameType>(async () => 
				stateUrlDerived.replay() ? 'replay' : 'regular'
			),
		},
	}).createMachine({
		context,
		initial: 'rendering',
		states: {
			[STATE_RENDERING]: stateRendering,
			[STATE_RENDERED]: stateRendered,
			[STATE_IDLE]: stateIdle, // Note: No intermediateMachines.idle exists
			[STATE_BET]: stateBet,
			[STATE_AUTOBET]: stateAutoBet,
			[STATE_RESUME_BET]: stateResumeBet,
			[STATE_FORCE_RESULT]: stateForceResult,
			[STATE_REPLAY]: stateReplay,
			[STATE_END]: stateEnd,
		},
	});

	// create game actor
	const gameActor = createActor(gameMachine);

	return gameActor;
};

export { createGameActor };
