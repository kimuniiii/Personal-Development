import styled from '@emotion/styled';

import { COPY_RIGHT } from 'src/constants';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import type { VFC } from 'react';

export const CommonFooter: VFC = () => {
  return <StFooter>{COPY_RIGHT}</StFooter>;
};

const StFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  height: 56px;
  color: ${COLOR_PALETTE.BLACK};
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
`;
