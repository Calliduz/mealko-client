import { defaultConfig, themes, tokens } from '@tamagui/config/v5';
import { createTamagui } from 'tamagui';

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  themes,
  tokens,
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

