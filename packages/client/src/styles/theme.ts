import { COLOR_PALETTE } from 'src/styles/color_palette';

export const THEME = {
  light: {
    bgColor: `${COLOR_PALETTE.WHITE}`,
    textColor: '#333',
  },
  dark: {
    bgColor: `${COLOR_PALETTE.BLACK}`,
    textColor: `${COLOR_PALETTE.DARK_MODE_TEXT_COLOR}`,
  },
} as const;
