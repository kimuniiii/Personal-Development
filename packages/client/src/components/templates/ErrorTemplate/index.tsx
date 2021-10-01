import styled from '@emotion/styled';

import type { VFC } from 'react';

import { COLOR_PALETTE } from 'src/styles/color_palette';

type ErrorTemplateProps = {
  errorMessage: string;
};

/**
 * @概要 カスタマイズした`Error Template`
 * @説明 statusCode と errorMessage の紐付けを全てカスタマイズしたいなら使用する
 */
export const ErrorTemplate: VFC<ErrorTemplateProps> = ({ errorMessage }) => {
  return <StBase>{errorMessage}</StBase>;
};

const StBase = styled.p`
  color: ${COLOR_PALETTE.ERROR_COLOR};
`;
