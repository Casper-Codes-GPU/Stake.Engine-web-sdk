import { setContextEventEmitter, getContextEventEmitter } from 'utils-event-emitter';
import { setContextXstate, getContextXstate } from 'utils-xstate';
import { setContextLayout, getContextLayout } from 'utils-layout';
import { setContextApp, getContextApp } from 'pixi-svelte';

import { eventEmitter, type EmitterEvent } from './eventEmitter';
import { stateXstate, stateXstateDerived } from './stateXstate';
import { stateLayout, stateLayoutDerived } from './stateLayout';
import { stateApp } from './stateApp';

import { stateGame, stateGameDerived } from './stateGame.svelte';
import { i18nDerived } from '../i18n/i18nDerived';

export const setContext = () => {
	try {
		console.log('🔧 setContext: Starting context setup...');

		console.log('🔧 setContext: Setting EventEmitter context...');
		setContextEventEmitter<EmitterEvent>({ eventEmitter });
		console.log('✅ EventEmitter context set');

		console.log('🔧 setContext: Setting XState context...');
		setContextXstate({ stateXstate, stateXstateDerived });
		console.log('✅ XState context set');

		console.log('🔧 setContext: Setting Layout context...');
		setContextLayout({ stateLayout, stateLayoutDerived });
		console.log('✅ Layout context set');

		console.log('🔧 setContext: Setting App context...');
		setContextApp({ stateApp });
		console.log('✅ App context set');

		console.log('✅ setContext: All contexts set successfully');
	} catch (error) {
		console.error('❌ setContext: Failed to set context:', error);
		console.error('setContext error stack:', error?.stack);
		throw error;
	}
};

export const getContext = () => ({
	...getContextEventEmitter<EmitterEvent>(),
	...getContextLayout(),
	...getContextXstate(),
	...getContextApp(),
	stateGame,
	stateGameDerived,
	i18nDerived,
});
