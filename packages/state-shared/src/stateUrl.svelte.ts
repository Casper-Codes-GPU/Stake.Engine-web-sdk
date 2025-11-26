import { locales } from 'config-lingui';
import { page } from '$app/state';

export type Language = (typeof locales)[number];

export type Key =
	| 'sessionID'
	| 'rgs_url'
	| 'lang'
	| 'currency'
	| 'device'
	| 'social'
	| 'demo'
	| 'force'
	| 'amount'
	| 'gameMode'
	| 'replay'
	| 'game'
	| 'version'
	| 'mode'
	| 'event'
;

const getUrlSearchParam = (key: Key) => page.url.searchParams.get(key);

const lang = () =>
	getUrlSearchParam('lang') === 'br' ? 'pt' : (getUrlSearchParam('lang') as Language) || 'en';
const sessionID = () => getUrlSearchParam('sessionID') || '';
const rgsUrl = () => getUrlSearchParam('rgs_url') || '';
const force = () => getUrlSearchParam('force') === 'true';
const social = () => getUrlSearchParam('social') === 'true';
const amount = () => getUrlSearchParam('amount') || '';
const gameMode = () => getUrlSearchParam('gameMode') || '';
const replay = () => getUrlSearchParam('replay') === 'true';
const game = () => getUrlSearchParam('game') || '';
const version = () => getUrlSearchParam('version') || '';
const mode = () => getUrlSearchParam('mode') || '';
const event = () => getUrlSearchParam('event') || '';

export const stateUrlDerived = {
	lang,
	sessionID,
	rgsUrl,
	force,
	social,
	amount,
	gameMode,
	replay,
	game,
	version,
	mode,
	event,
};
