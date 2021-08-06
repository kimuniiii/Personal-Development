import styled from '@emotion/styled';

import type { VFC } from 'react';

import { COPY_RIGHT } from 'src/constants';

import { COLOR_PALETTE } from 'src/styles/color_palette';

export const CommonFooter: VFC = () => {
  return <StFooter>{COPY_RIGHT}</StFooter>;
};

const StFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  height: 56px;
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
`;
