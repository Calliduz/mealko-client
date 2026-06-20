import { defaultConfig } from '@tamagui/config/v5';
import { createTamagui } from 'tamagui';

// ---------------------------------------------------------------------------
// Mealko Tamagui config
// Extends the default Tamagui config with a high-contrast palette.
// Tokens can be overridden here in Phase 1 once the design system is locked.
// ---------------------------------------------------------------------------
export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  // Override tokens for Mealko brand identity (Phase 1)
  // tokens: { color: { brand: '#FF6B35' }, ... }
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

