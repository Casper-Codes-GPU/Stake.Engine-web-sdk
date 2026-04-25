<script lang="ts">
	import '../app.css';
	import { waitForTimeout } from 'utils-shared/wait';
	import { getContext } from '../game/context';
	import { playBookEvents } from '../game/utils';
	import { sampleBooks } from '../stories/data/sampleBooks';
	import {
		ZONES, MULTIPLIERS, RAIL_Y, RAIL_START_X, BALL_R, SLOT_HEIGHT,
		slotColor, ROLL_DURATION, DROP_DURATION, BOUNCE_DURATION, BOUNCE_PAUSE, WIN_DISPLAY_MS,
	} from '../game/constants';
	import type { RiskLevel, Zone, BallDirection } from '../game/types';
	import EnableGameActor from './EnableGameActor.svelte';

	const context = getContext();

	// ── Animation state ────────────────────────────────────────────────────────
	let phase: 'idle' | 'rolling' | 'dropping' | 'bouncing' | 'landed' = $state('idle');
	let riskLevel: RiskLevel = $state('medium');
	let ballX = $state(RAIL_START_X);
	let ballY = $state(RAIL_Y);
	let ballVisible = $state(false);
	let activeZone: 0 | Zone = $state(0);
	let path: BallDirection[] = $state([]);
	let slotIndex = $state(-1);
	let multiplier = $state(0);
	let finalAmount = $state(0);
	let showWin = $state(false);
	let hitPinRow = $state(-1);

	// ── Animation helpers ──────────────────────────────────────────────────────
	const easeOut = (t: number) => 1 - Math.pow(1 - t, 2);

	const animateTo = async (tx: number, ty: number, ms: number) => {
		const fx = ballX, fy = ballY;
		const steps = Math.max(4, Math.round(ms / 16));
		for (let i = 1; i <= steps; i++) {
			const t = easeOut(i / steps);
			ballX = fx + (tx - fx) * t;
			ballY = fy + (ty - fy) * t;
			await waitForTimeout(ms / steps);
		}
	};

	// ── Event subscriptions ────────────────────────────────────────────────────
	context.eventEmitter.subscribeOnMount({
		reset: () => {
			phase = 'idle';
			ballX = RAIL_START_X;
			ballY = RAIL_Y;
			ballVisible = false;
			activeZone = 0;
			path = [];
			slotIndex = -1;
			multiplier = 0;
			finalAmount = 0;
			showWin = false;
			hitPinRow = -1;
		},

		drop: async ({ data }) => {
			const zone = ZONES[data.zone];
			activeZone = data.zone;
			path = [...data.path];
			riskLevel = data.riskLevel;

			ballX = RAIL_START_X;
			ballY = RAIL_Y;
			ballVisible = true;
			phase = 'rolling';

			// 1. Roll along rail to zone drop-point
			await animateTo(zone.centerX, RAIL_Y, ROLL_DURATION[data.zone]);

			// 2. Fall from rail into board top
			phase = 'dropping';
			await animateTo(zone.centerX, zone.boardTopY, DROP_DURATION);

			// 3. Bounce row by row
			phase = 'bouncing';
			let rCount = 0;
			for (let r = 0; r < zone.rows; r++) {
				hitPinRow = r;
				if (data.path[r] === 'R') rCount++;
				const tx = zone.centerX + (rCount - (r + 1) / 2) * zone.slotWidth;
				const ty = zone.boardTopY + (r + 1) * zone.rowHeight;
				await animateTo(tx, ty, BOUNCE_DURATION);
				await waitForTimeout(BOUNCE_PAUSE);
			}
			hitPinRow = -1;

			// 4. Land in slot
			phase = 'landed';
			slotIndex = data.slotIndex;
			multiplier = data.multiplier;
		},

		finalWin: async ({ data }) => {
			finalAmount = data.amount;
			showWin = true;
			await waitForTimeout(WIN_DISPLAY_MS);
			showWin = false;
		},
	});

	// ── Render helpers ─────────────────────────────────────────────────────────
	type ZoneKey = 1 | 2 | 3;

	function getPins(zk: ZoneKey) {
		const z = ZONES[zk];
		const out: { x: number; y: number; row: number }[] = [];
		for (let r = 0; r < z.rows; r++) {
			for (let c = 0; c <= r; c++) {
				out.push({
					x: z.centerX + (c - r / 2) * z.slotWidth,
					y: z.boardTopY + (r + 0.5) * z.rowHeight,
					row: r,
				});
			}
		}
		return out;
	}

	function getSlots(zk: ZoneKey) {
		const z = ZONES[zk];
		const mults = MULTIPLIERS[z.rows as 8 | 12 | 16][riskLevel];
		const numSlots = z.rows + 1;
		return Array.from({ length: numSlots }, (_, k) => ({
			k,
			x:    z.centerX + (k - z.rows / 2) * z.slotWidth,
			y:    z.boardTopY + z.rows * z.rowHeight,
			mult: mults[k],
		}));
	}

	function fmtMult(m: number, sw: number): string {
		const s = sw < 25;
		if (m >= 1000) return s ? '1K' : '1000';
		if (m >= 10)   return m.toFixed(0);
		return m.toFixed(1);
	}

	function slotFontSize(sw: number): number {
		if (sw >= 32) return 11;
		if (sw >= 26) return 10;
		return 8;
	}

	function multColor(mult: number): string {
		const BY_MULT: [number, string][] = [
			[100, '#ffd740'], [20, '#ff6d00'], [10, '#f57c00'],
			[5, '#f9a825'], [2, '#558b2f'], [1, '#00695c'],
			[0.5, '#1565c0'], [0, '#4527a0'],
		];
		for (const [min, col] of BY_MULT) if (mult >= min) return col;
		return '#4527a0';
	}

	const ZONE_KEYS: ZoneKey[] = [1, 2, 3];
	const RISK_LEVELS: RiskLevel[] = ['low', 'medium', 'high'];
	const RISK_LABELS: Record<RiskLevel, string> = { low: 'LOW', medium: 'MED', high: 'HIGH' };
	const RISK_COLORS: Record<RiskLevel, string> = {
		low: '#27ae60', medium: '#e67e22', high: '#e53935',
	};

	// Dev panel: play sample books directly (bypasses xstate/RGS)
	const isIdle = $derived(phase === 'idle');
	const sampleKeys = Object.keys(sampleBooks) as Array<keyof typeof sampleBooks>;
	const playSample = async (key: keyof typeof sampleBooks) => {
		if (!isIdle) return;
		await playBookEvents(sampleBooks[key]);
	};
</script>

<EnableGameActor />

<div class="scene-wrap">
<svg
	viewBox="0 0 1600 900"
	xmlns="http://www.w3.org/2000/svg"
	style="width:100%;height:100%;display:block;background:#0a0a14"
>
	<defs>
		<!-- Subtle grid background -->
		<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
			<path d="M40 0H0V40" fill="none" stroke="#161628" stroke-width="0.8" />
		</pattern>
		<!-- Ball glow filter -->
		<filter id="ball-glow" x="-60%" y="-60%" width="220%" height="220%">
			<feGaussianBlur stdDeviation="4" result="blur" />
			<feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
		</filter>
		<!-- Slot glow filter -->
		<filter id="slot-glow" x="-20%" y="-20%" width="140%" height="140%">
			<feGaussianBlur stdDeviation="3" result="blur" />
			<feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
		</filter>
		<!-- Win overlay gradient -->
		<radialGradient id="win-glow" cx="50%" cy="50%" r="50%">
			<stop offset="0%"   stop-color="#ffd740" stop-opacity="0.15" />
			<stop offset="100%" stop-color="#ffd740" stop-opacity="0" />
		</radialGradient>
	</defs>

	<!-- Background grid -->
	<rect width="1600" height="900" fill="url(#grid)" />

	<!-- ── Rail ─────────────────────────────────────────────────────────────── -->
	<!-- Rail line -->
	<line x1={RAIL_START_X} y1={RAIL_Y} x2="1555" y2={RAIL_Y}
		stroke="#e0e0e0" stroke-width="3" stroke-linecap="round" />
	<!-- Arrow head -->
	<polygon points="1548,{RAIL_Y - 7} 1560,{RAIL_Y} 1548,{RAIL_Y + 7}"
		fill="#e0e0e0" />
	<!-- Start circle -->
	<circle cx={RAIL_START_X} cy={RAIL_Y} r="10"
		fill="none" stroke="#e0e0e0" stroke-width="2.5" />

	<!-- ── Plinko zones ──────────────────────────────────────────────────────── -->
	{#each ZONE_KEYS as zk}
		{@const z = ZONES[zk]}
		{@const isActive = activeZone === zk}
		{@const bw = (z.rows + 1) * z.slotWidth}
		{@const bh = z.rows * z.rowHeight + SLOT_HEIGHT}
		{@const bx = z.centerX - bw / 2}
		{@const by = z.boardTopY}
		{@const activeSlot = (phase === 'landed' && activeZone === zk) ? slotIndex : -1}

		<!-- Funnel lines from rail to board corners -->
		<line x1={z.centerX} y1={RAIL_Y + 3} x2={bx}      y2={by}
			stroke="#2a2a40" stroke-width="1.2" />
		<line x1={z.centerX} y1={RAIL_Y + 3} x2={bx + bw}  y2={by}
			stroke="#2a2a40" stroke-width="1.2" />

		<!-- Drop indicator on rail -->
		<line x1={z.centerX} y1={RAIL_Y - 10} x2={z.centerX} y2={RAIL_Y + 3}
			stroke={isActive ? '#ffd740' : '#3a3a60'}
			stroke-width={isActive ? 2.5 : 1.5}
			stroke-dasharray={isActive ? '' : '4 3'} />

		<!-- Zone background -->
		<rect
			x={bx - 4} y={by - 2} width={bw + 8} height={bh + 4}
			fill={isActive ? '#14142a' : '#0d0d1e'}
			stroke={isActive ? '#2a2a60' : '#141430'}
			stroke-width="1"
			rx="4"
		/>

		<!-- Zone label -->
		<text x={z.centerX} y={by - 10}
			text-anchor="middle"
			fill={isActive ? '#7070c0' : '#3a3a5a'}
			font-size="11" font-family="monospace" letter-spacing="1"
		>
			{z.rows} ROWS
		</text>

		<!-- Pins -->
		{#each getPins(zk) as pin}
			{@const isHit = isActive && hitPinRow === pin.row}
			<circle
				cx={pin.x} cy={pin.y} r={z.pinRadius}
				fill={isHit ? '#ffffff' : '#4a4a70'}
				opacity={isHit ? 1 : 0.8}
			/>
		{/each}

		<!-- Slots -->
		{#each getSlots(zk) as slot}
			{@const isLanded = activeSlot === slot.k}
			{@const color = slotColor(slot.mult)}
			<rect
				x={slot.x - z.slotWidth / 2 + 1}
				y={slot.y + 2}
				width={z.slotWidth - 2}
				height={SLOT_HEIGHT - 2}
				fill={color}
				opacity={isLanded ? 1 : 0.55}
				rx="2"
				filter={isLanded ? 'url(#slot-glow)' : ''}
			/>
			<text
				x={slot.x}
				y={slot.y + SLOT_HEIGHT / 2 + 4}
				text-anchor="middle"
				fill="white"
				font-size={slotFontSize(z.slotWidth)}
				font-family="monospace"
				font-weight="bold"
				opacity={isLanded ? 1 : 0.75}
			>
				{fmtMult(slot.mult, z.slotWidth)}{z.slotWidth >= 25 ? '×' : ''}
			</text>
		{/each}
	{/each}

	<!-- ── Ball ──────────────────────────────────────────────────────────────── -->
	{#if ballVisible}
		<circle
			cx={ballX}
			cy={ballY}
			r={BALL_R}
			fill="white"
			filter="url(#ball-glow)"
		/>
	{/if}

	<!-- ── Risk level selector ───────────────────────────────────────────────── -->
	<text x="24" y="55" fill="#3a3a5a" font-size="10" font-family="monospace" letter-spacing="1">
		RISK
	</text>
	{#each RISK_LEVELS as level, i}
		{@const isSelected = riskLevel === level}
		{@const btnX = 12 + i * 68}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<g role="button" tabindex={i} onclick={() => { if (phase === 'idle') riskLevel = level; }} style="cursor:{phase === 'idle' ? 'pointer' : 'default'}">
			<rect
				x={btnX} y="60" width="62" height="22" rx="4"
				fill={isSelected ? RISK_COLORS[level] : '#1a1a2e'}
				stroke={isSelected ? RISK_COLORS[level] : '#2a2a50'}
				stroke-width="1"
			/>
			<text
				x={btnX + 31} y="75"
				text-anchor="middle"
				fill={isSelected ? 'white' : '#5a5a7a'}
				font-size="10" font-family="monospace" font-weight="bold"
			>
				{RISK_LABELS[level]}
			</text>
		</g>
	{/each}

	<!-- ── Zone multiplier preview (top-right info) ──────────────────────────── -->
	<text x="1580" y="30" text-anchor="end" fill="#2a2a50" font-size="10" font-family="monospace">
		ZONE ROWS
	</text>
	{#each ZONE_KEYS as zk, i}
		{@const z = ZONES[zk]}
		{@const isActive = activeZone === zk}
		<text
			x="1580" y={48 + i * 16}
			text-anchor="end"
			fill={isActive ? '#7070ff' : '#2a2a50'}
			font-size="10" font-family="monospace"
		>
			Z{zk}  {z.rows}r  [{MULTIPLIERS[z.rows as 8 | 12 | 16][riskLevel][0]}× — {MULTIPLIERS[z.rows as 8 | 12 | 16][riskLevel][Math.floor(z.rows / 2)]}× — {MULTIPLIERS[z.rows as 8 | 12 | 16][riskLevel][z.rows]}×]
		</text>
	{/each}

	<!-- ── Win overlay ───────────────────────────────────────────────────────── -->
	{#if showWin}
		<!-- Ambient glow behind overlay -->
		<ellipse cx="800" cy="460" rx="400" ry="200" fill="url(#win-glow)" />

		<rect x="480" y="370" width="640" height="180" rx="12"
			fill="#06061a" fill-opacity="0.97"
			stroke="#ffd740" stroke-width="1.5"
		/>

		<!-- Multiplier line -->
		<text x="800" y="430"
			text-anchor="middle"
			fill={multColor(multiplier)}
			font-size="22" font-family="monospace" font-weight="bold" letter-spacing="2"
		>
			{multiplier}× MULTIPLIER
		</text>

		<!-- Amount line -->
		<text x="800" y="490"
			text-anchor="middle"
			fill="#ffd740"
			font-size="38" font-family="monospace" font-weight="bold"
		>
			${(finalAmount / 100).toFixed(2)}
		</text>
	{/if}
</svg>
