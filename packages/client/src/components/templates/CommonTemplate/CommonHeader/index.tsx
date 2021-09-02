import styled from '@emotion/styled';
import Router from 'next/router';

import type { VFC } from 'react';

import { Button } from 'src/components/atoms/Button';

import { COLOR_PALETTE } from 'src/styles/color_palette';

export const CommonHeader: VFC = () => {
  return (
    <StHeader>
      <Button
        className='logo-button'
        type='button'
        styleTypes='textLink'
        width='100px'
        fontSizeValue='16px'
        padding='0'
        buttonContent='Riot'
        onClick={(): Promise<boolean> => Router.push('/')}
      />
      <StButtonContainer>
        <Button
          type='button'
          styleTypes='textLink'
          width='100px'
          fontSizeValue='16px'
          padding='0'
          buttonContent='ログイン'
          onClick={(): Promise<boolean> => Router.push('/login')}
        />
        <Button
          type='button'
          styleTypes='textLink'
          width='100px'
          fontSizeValue='16px'
          padding='0'
          buttonContent='ログアウト'
          onClick={(): Promise<boolean> => Router.push('/')}
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
  height: 48px;
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};

  .logo-button {
    color: ${COLOR_PALETTE.BLACK};
    text-align: left;
  }
`;

const StButtonContainer = styled.div`
  display: flex;
`;

const StCenterLoaderContainer = styled.div`
  display: 'flex';
  justify-content: 'center';
  align-items: 'center';
  height: '100vh';
`;
