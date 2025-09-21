<script lang="ts">
  import { getContext } from '../game/context';
  import { stateBet, stateBetDerived, stateConfig } from 'state-shared';
  import { Tween } from 'svelte/motion';
  import { numberToCurrencyString } from 'utils-shared/amount';

  type EmitterEventUi =
    | { type: 'hotKeySpace' } | { type: 'hotKeyEscape' }
    | { type: 'stopButtonClick' } | { type: 'stopButtonEnable' }
    | { type: 'uiShow' } | { type: 'uiHide' }
    | { type: 'drawerUnfold' } | { type: 'drawerFold' }
    | { type: 'drawerButtonShow' } | { type: 'drawerButtonHide' }
    | { type: 'soundBetMode'; betModeKey: string }
    | { type: 'soundPressGeneral' } | { type: 'soundPressBet' }
    | { type: 'forceResult' } | { type: 'resumeBet' }
    | { type: 'autoBet' } | { type: 'bet' };

  const ctx = getContext();
  const ee = ctx.eventEmitter as {
    broadcast: (evt: EmitterEventUi) => void;
    subscribeOnMount?: (map: Record<string, (...a:any[])=>void>) => void;
  };
  const x = ctx.stateXstateDerived as { isIdle: () => boolean };
  const broadcast = (evt: EmitterEventUi) => ee.broadcast(evt);

  // Balance tween (unchanged)
  const balanceTween = new Tween(stateBet.balanceAmount);
  const balance = $derived(numberToCurrencyString(balanceTween.current));
  $effect(() => { balanceTween.set(stateBet.balanceAmount); });

  // Local UI state
  let stopDisabled = false;
  let autoplayRemaining: number | null = null;
  let isTurbo = (ctx.stateGame as any)?.isTurbo ?? false;

  // ----- BET: use discrete denom options (source of truth) -----
  // Always keep options sorted ascending
  const options = $derived([...stateConfig.betAmountOptions].sort((a,b)=>a-b));

  // Convenience: current index in options
  const currentIndex = $derived(() => {
    const i = options.findIndex(v => v === stateBet.betAmount);
    return i >= 0 ? i : Math.max(0, options.findIndex(v => v >= stateBet.betAmount));
  });

  // Show value using stateBet.betAmount (not a local 'bet' number)
  const bet = $derived(() => stateBet.betAmount);

  // Buttons disabled logic (match your working components)
  const atSmallest = $derived(() => bet() === options[0]);
  const atBiggest  = $derived(() => bet() === options[options.length - 1]);
  const notIdle    = $derived(() => !x.isIdle());

  function setBetAmount(next: number) {
    broadcast({ type: 'soundPressGeneral' }); // why: UX parity with existing buttons
    stateBetDerived.setBetAmount(next);
    // Optionally mirror in ctx.stateGame if you rely on it elsewhere
    (ctx.stateGame as any).bet = next;
  }

  function increase() {
    if (notIdle() || atBiggest()) return;
    const next = options.slice(currentIndex() + 1).find(Boolean);
    setBetAmount(next ?? options[options.length - 1]);
  }

  function decrease() {
    if (notIdle() || atSmallest()) return;
    // walk backwards
    const prev = [...options].reverse().slice(options.length - currentIndex()).find(Boolean);
    setBetAmount(prev ?? options[0]);
  }

  function maxBet() {
    if (notIdle() || atBiggest()) return;
    setBetAmount(options[options.length - 1]);
  }

  // Spin / Stop / Auto (unchanged behavior)
  ee.subscribeOnMount?.({
    stopButtonClick: () => (stopDisabled = true),
    stopButtonEnable: () => (stopDisabled = false),
  });

  const isSpinning = $derived(() => !x.isIdle());
  const canSpin = $derived(() => stateBetDerived.isBetCostAvailable() && !isSpinning);

  const betAction = () => broadcast({ type: 'bet' });
  const stopAction = () => {
    if (!stopDisabled) {
      if (stateBetDerived.hasAutoBetCounter()) stateBet.autoSpinsCounter = 0;
      broadcast({ type: 'stopButtonClick' });
    }
  };

  function toggleTurbo() {
    isTurbo = !isTurbo;
    (ctx.stateGame as any).isTurbo = isTurbo;
    broadcast({ type: 'soundBetMode', betModeKey: isTurbo ? 'turbo_on' : 'turbo_off' });
  }

  function waitForIdle(timeout = isTurbo ? 7000 : 15000): Promise<void> {
    return new Promise((resolve) => {
      const t = setTimeout(resolve, timeout);
      const i = setInterval(() => { if (x.isIdle()) { clearTimeout(t); clearInterval(i); resolve(); } }, 50);
    });
  }

  async function spinOnce() {
    if (!x.isIdle()) return;
    broadcast({ type: 'soundPressBet' });
    betAction();
    await waitForIdle();
  }

  async function onSpinClick() {
    if (x.isIdle()) { autoplayRemaining = null; await spinOnce(); }
    else { stopAction(); }
  }

  async function startAutoplay(count: number | null) {
    broadcast({ type: 'autoBet' });
    autoplayRemaining = count;
    while (autoplayRemaining === Infinity || (typeof autoplayRemaining === 'number' && autoplayRemaining > 0)) {
      if (!x.isIdle()) await waitForIdle();
      if (!stateBetDerived.isBetCostAvailable()) break;
      await spinOnce();
      if (autoplayRemaining !== Infinity && typeof autoplayRemaining === 'number') {
        autoplayRemaining = Math.max(0, autoplayRemaining - 1);
      }
      await new Promise(r => setTimeout(r, isTurbo ? 50 : 240));
    }
    if (autoplayRemaining !== Infinity) autoplayRemaining = null;
  }
  const stopAutoplay = () => (autoplayRemaining = null);

  function money(n?: number) {
    return typeof n === 'number'
      ? n.toLocaleString(undefined, { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 })
      : '—';
  }
</script>

<div class="mobile-dock">
  <!-- Balance and Last Win -->


  <!-- Bet controls -->
  <div class="mobile-bet-card">
    <div class="bet-row">
      <div class="label">Bet</div>
      <div class="bet-value">{money(bet())}</div>
      <button class="pill" onclick={maxBet} disabled={notIdle() || atBiggest()}>Max</button>
    </div>
    <div class="slider-row">
      <button class="btn-square" onclick={decrease} disabled={notIdle() || atSmallest()} aria-label="decrease">
        <svg width="18" height="18" viewBox="0 0 24 24"><path d="M6 12h12" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <button
        class="orb"
        class:spin-anim={isSpinning()}
        onclick={onSpinClick}
        disabled={!stateBetDerived.isBetCostAvailable()}
        aria-label="spin"
        title={x.isIdle() ? 'Spin' : (stopDisabled ? 'Stop (disabled)' : 'Stop')}
      >
        <div class="ring"></div>
      </button>
      <button class="btn-square" onclick={increase} disabled={notIdle() || atBiggest()} aria-label="increase">
        <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 6v12M6 12h12" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
    </div>
  </div>
  <!-- Turbo/Auto -->
  <!-- <div class="mobile-chip-row">
    <button class="chip" data-on={isTurbo} onclick={toggleTurbo} disabled={isSpinning()}>Turbo {isTurbo ? 'On' : 'Off'}</button>
    <button class="chip" data-on={autoplayRemaining !== null} onclick={() => (autoplayRemaining ? stopAutoplay() : startAutoplay(50))}>
      {autoplayRemaining ? `Auto ${autoplayRemaining === Infinity ? '∞' : autoplayRemaining}` : 'Auto 50'}
    </button>
  </div> -->
    <div class="mobile-stack">
    <div class="mobile-card">
      <div class="label">Balance</div>
      <div class="value">{balance}</div>
    </div>
    <div class="mobile-card">
      <div class="label">Last Win</div>
      <div class="value">—</div>
    </div>
  </div>

</div>

<style>
    :root {
    --glass-bg: rgba(18, 21, 28, 0.45);
    --glass-elev: rgba(255, 255, 255, 0.06);
    --glass-stroke: rgba(255, 255, 255, 0.14);
    --glass-strong: rgba(255, 255, 255, 0.22);
    --txt: #fff;
    --txt-muted: rgba(235, 240, 255, 0.75);
    --accent: #6cf7ff;
    --accent-2: #b66bff;
    --ok: #2bd67b;
    --shadow: 0 8px 30px rgba(0,0,0,.45);
    --radius-lg: 18px;
    --radius-md: 14px;
    --radius-sm: 10px;
    --backdrop-blur: blur(18px) saturate(160%);
    --tap-size: 44px;
    --font: ui-rounded, SF Pro Rounded, SF Pro Display, Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  }
  .mobile-dock {
    position: fixed;
    left: 0; right: 0; bottom: 0;
    padding: max(10px, env(safe-area-inset-bottom)) 10px calc(10px + env(safe-area-inset-bottom));
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(7,9,13,.35) 32%, rgba(7,9,13,.65) 100%);
    -webkit-backdrop-filter: var(--backdrop-blur);
    backdrop-filter: var(--backdrop-blur);
    border-top-left-radius: var(--radius-lg);
    border-top-right-radius: var(--radius-lg);
    border-top: 1px solid var(--glass-stroke);
    outline: 1px solid transparent;
    box-shadow: 0 -6px 28px rgba(0,0,0,.38), inset 0 1px 0 var(--glass-elev);
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: var(--nd-font, var(--font));
    color: var(--txt);
    z-index: 100;
    touch-action: manipulation;
    @media (width >= 64rem) {
    position: absolute;
    left: 13rem;
    right: 13rem;
    bottom: 0;
    }
  }
  .mobile-stack {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
  .mobile-card {
    flex: 1;
    background: var(--nd-card, #222);
    border-radius: 12px;
    color: var(--nd-white, #fff);
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    background: rgba(0, 0, 0, 0.25);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
  }
  .label { font-size: 11px; text-transform: uppercase; letter-spacing: .14em; font-weight: 800; color: var(--nd-muted, #bbb); }
  .value { font-size: 16px; font-weight: 900; line-height: 1.1; word-break: break-all; }
  .bet-value { font-size: 20px; font-weight: 900; line-height: 1.1; word-break: break-all; margin-left: 26px; }
  .mobile-bet-card {
    background: var(--nd-card, #222);
    border-radius: 14px;
    color: var(--nd-white, #fff);
    padding: 12px 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: rgba(0, 0, 0, 0.25);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    @media (width >= 64rem) {
     padding: 17px 10px;
    }
  }
  .bet-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .pill {
    height: 36px;
    min-width: 56px;
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
    border: 1px solid var(--nd-border, #444);
    font-weight: 900;
    letter-spacing: .04em;
    cursor: pointer;
    color: var(--nd-white, #fff);
    transition: transform .06s, border-color .12s, box-shadow .12s, background .12s;
  }
  .pill[disabled] { opacity: .45; cursor: not-allowed; }
  .slider-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    @media (width >= 64rem) {
      position: absolute;
      right: 80px;
      top: 3px;
    }
  }
  .btn-square {
    width: 40px; height: 40px;
    border-radius: 10px;
    border: 1px solid var(--nd-border, #444);
    background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
    color: var(--nd-white, #fff);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
  }
  .btn-square[disabled] { opacity: .45; cursor: not-allowed; }
  .chip-row, .mobile-chip-row {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  .chip {
    height: 36px;
    padding: 0 12px;
    border-radius: 999px;
    border: 1px solid var(--nd-border, #444);
    background: var(--nd-card, #222);
    color: var(--nd-white, #fff);
    font-weight: 800;
    letter-spacing: .06em;
    text-transform: uppercase;
    cursor: pointer;
  }
  .chip[data-on="true"] {
    border-color: var(--nd-accent, #6cf7ff);
    box-shadow: 0 0 0 1px var(--nd-accent, #6cf7ff) inset, 0 0 20px rgba(108,247,255,.25);
  }
  .orb {
    width: 64px; height: 64px;
    border-radius: 999px;
    background: radial-gradient(ellipse at center, rgba(255,255,255,.14), rgba(255,255,255,.06));
    border: 0px solid var(--nd-border-strong, #6cf7ff);
    box-shadow: 0 8px 24px rgba(0,0,0,.45);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
  }
  .orb[disabled] { opacity: .45; cursor: not-allowed; }
  .ring {
    width: 32px; height: 32px;
    border-radius: 999px;
    border: 5px solid #fff;
    border-right-color: transparent;
    position: relative;
  }
  .ring::after {
    content: '';
    position: absolute;
    top: 0px; right: -3px;
    width: 0; height: 0;
    border-left: 8px solid #fff;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    transform: rotate(40deg);
  }
  .spin-anim .ring { animation: spin 1.05s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>
