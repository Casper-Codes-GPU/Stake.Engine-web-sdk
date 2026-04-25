import { createSound } from 'utils-sound';

export type MusicName =
	| 'bgm_main'
	| 'bgm_winlevel_big'
	| 'bgm_winlevel_superwin'
	| 'bgm_winlevel_mega'
	| 'bgm_winlevel_epic'
	| 'bgm_winlevel_max';

export type SoundEffectName =
	| 'sfx_ball_roll'
	| 'sfx_ball_drop'
	| 'sfx_pin_hit'
	| 'sfx_slot_land'
	| 'sfx_big_win';

export type SoundName = MusicName | SoundEffectName;

const sound = createSound<SoundName>();
export { sound };
