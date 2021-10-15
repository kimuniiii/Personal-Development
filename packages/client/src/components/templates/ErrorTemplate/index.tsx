import styled from '@emotion/styled';

import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import type { VFC } from 'react';

type ErrorTemplateProps = {
  error: Error;
};

/**
 * @概要 カスタマイズした`Error Template`
 * @説明 statusCode と errorMessage の紐付けを全てカスタマイズしたいなら使用する
 */
export const ErrorTemplate: VFC<ErrorTemplateProps> = ({ error }) => {
  return (
    <StErrorContainer>
      <h1>
        {error.name}: {error.message}
      </h1>
      <Margin bottom='16px' />
      <p>{error.stack}</p>
    </StErrorContainer>
  );
};

const StErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  background-color: ${COLOR_PALETTE.WARNING_COLOR};
  color: ${COLOR_PALETTE.ERROR_COLOR};
`;
