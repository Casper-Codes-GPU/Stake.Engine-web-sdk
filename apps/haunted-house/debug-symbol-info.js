// Quick debug script to check symbol info configurations
console.log('=== SYMBOL INFO DEBUG ===');

// Simulate the symbol info we should be getting
const symbolInfoSamples = {
  H1_win: {
    type: 'spriteSheet',
    assetKey: 'H1_ANIMATION',
    sizeRatios: { width: 0.4, height: 0.4 }
  },
  H2_win: {
    type: 'spriteSheet',
    assetKey: 'H2_ANIMATION',
    sizeRatios: { width: 0.4, height: 0.4 }
  },
  L5_win: {
    type: 'sprite',
    assetKey: 'm1_2x.png',
    sizeRatios: { width: 1, height: 1 }
  }
};

console.log('Expected symbol info samples:');
Object.entries(symbolInfoSamples).forEach(([key, value]) => {
  console.log(`${key}:`, value);
  console.log(`- Type check (isSpriteSheet): ${value.type === 'spriteSheet'}`);
  console.log(`- Type check (isSprite): ${value.type === 'sprite'}`);
  console.log(`- Combined check: ${value.type === 'sprite' || value.type === 'spriteSheet'}`);
  console.log('---');
});

console.log('Assets that should exist:');
const expectedAssets = [
  'H1_ANIMATION', 'H2_ANIMATION', 'H3_ANIMATION', 'H4_ANIMATION',
  'L1_ANIMATION', 'L2_ANIMATION', 'L3_ANIMATION', 'L4_ANIMATION',
  'S_ANIMATION', 'W_ANIMATION'
];
expectedAssets.forEach(asset => {
  console.log(`- ${asset}: spriteSheet type expected`);
});

console.log('=== DEBUG COMPLETE ===');