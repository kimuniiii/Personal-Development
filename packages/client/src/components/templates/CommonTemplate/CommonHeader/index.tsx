import styled from '@emotion/styled';

import type { VFC } from 'react';

import { Button } from 'src/components/common/Button';

import { COLOR_PALETTE } from 'src/styles/color_palette';

export const CommonHeader: VFC = () => {
  return (
    <StHeader>
      <strong>Riot</strong>
      <StButtonContainer>
        <Button
          type='button'
          styleTypes='textLink'
          width='100px'
          fontSizeValue='16px'
          padding='0'
          buttonContent='ログイン'
          onClick={(): void => alert('clicked Login Button')}
        />
        <Button
          type='button'
          styleTypes='textLink'
          width='100px'
          fontSizeValue='16px'
          padding='0'
          buttonContent='ユーザー登録'
          onClick={(): void => alert('clicked User Register Button')}
        />
      </StButtonContainer>
    </StHeader>
  );
};

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
`;

const StButtonContainer = styled.div`
  display: flex;
`;
