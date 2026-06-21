import config from './src/theme/tamagui.config';

export default config;
export type Conf = typeof config;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
