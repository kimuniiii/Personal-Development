import { css } from '@emotion/react';

import { COLOR_PALETTE } from 'src/styles/color_palette';

export const buttonStyleTypes = {
  PRIMARY: css`
    background-color: ${COLOR_PALETTE.ACCENT_COLOR};
    color: ${COLOR_PALETTE.BLACK};

    &:hover {
      opacity: 0.6;
    }
  `,
  PRIMARY_DISABLED: css`
    &:disabled {
      background-color: ${COLOR_PALETTE.GRAY};
      color: ${COLOR_PALETTE.BLACK};
    }
  `,
  SECONDARY: css`
    background-color: ${COLOR_PALETTE.MAIN_COLOR};
    color: ${COLOR_PALETTE.WHITE};

    &:hover {
      opacity: 0.6;
    }
  `,
  SECONDARY_DISABLED: css`
    &:disabled {
      border: none;
      background-color: ${COLOR_PALETTE.GRAY};
      color: ${COLOR_PALETTE.BLACK};
    }
  `,
  TERTIARY: css`
    border: 1px solid ${COLOR_PALETTE.MAIN_COLOR};
    background-color: ${COLOR_PALETTE.WHITE};
    color: ${COLOR_PALETTE.MAIN_COLOR};

    &:hover {
      opacity: 0.6;
    }
  `,
  TERTIARY_DISABLED: css`
    &:disabled {
      border: none;
      background-color: ${COLOR_PALETTE.GRAY};
      color: ${COLOR_PALETTE.BLACK};
    }
  `,
  TEXT_LINK: css`
    color: ${COLOR_PALETTE.MAIN_COLOR};

    &:hover {
      text-decoration: underline;
    }
  `,
  TEXT_LINK_DISABLED: css`
    &:disabled {
      background-color: ${COLOR_PALETTE.GRAY};
      color: ${COLOR_PALETTE.BLACK};
    }
  `,
};
