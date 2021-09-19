import styled from '@emotion/styled';
import Router from 'next/router';

import type { LogoutOptions, RedirectLoginOptions } from '@auth0/auth0-react';
import type { VFC } from 'react';

import { Button } from 'src/components/atoms/Button';

import { COLOR_PALETTE } from 'src/styles/color_palette';

type CommonHeaderProps = {
  isAuthenticated: boolean;
  loginWithRedirect: (options?: RedirectLoginOptions | undefined) => Promise<void>;
  logout: (options?: LogoutOptions | undefined) => void;
};

export const CommonHeader: VFC<CommonHeaderProps> = ({
  isAuthenticated,
  loginWithRedirect,
  logout,
}) => {
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
      {isAuthenticated ? (
        <StButtonContainer>
          <Button
            type='button'
            styleTypes='textLink'
            width='100px'
            fontSizeValue='16px'
            padding='0'
            buttonContent='ログアウト'
            onClick={(): void => logout({ returnTo: window.location.origin })}
          />
          <Button
            type='button'
            styleTypes='textLink'
            width='100px'
            fontSizeValue='16px'
            padding='0'
            buttonContent='マイページ'
            onClick={(): Promise<boolean> => Router.push('/my-page')}
          />
        </StButtonContainer>
      ) : (
        <StButtonContainer>
          <Button
            type='button'
            styleTypes='textLink'
            width='100px'
            fontSizeValue='16px'
            padding='0'
            buttonContent='ログイン'
            onClick={loginWithRedirect}
          />
          <Button
            type='button'
            styleTypes='textLink'
            width='100px'
            fontSizeValue='16px'
            padding='0'
            buttonContent='ユーザー登録'
            onClick={(): Promise<void> =>
              loginWithRedirect({
                screen_hint: 'signup',
              })
            }
          />
        </StButtonContainer>
      )}
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
