import styled from '@emotion/styled';
import Router from 'next/router';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';

import type { LogoutOptions, RedirectLoginOptions } from '@auth0/auth0-react';
import type { VFC } from 'react';

import { Button } from 'src/components/atoms/Button';
import { IconButton } from 'src/components/atoms/IconButton';
import { TransitionHorizontalModal } from 'src/components/organisms/TransitionHorizontalModal';
import { CommonSideBar } from 'src/components/templates/CommonTemplate/CommonSideBar';

import { COLOR_PALETTE } from 'src/styles/color_palette';

type CommonHeaderProps = {
  isAuthenticated: boolean;
  loginWithRedirect: (options?: RedirectLoginOptions | undefined) => Promise<void>;
  logout: (options?: LogoutOptions | undefined) => void;
  isMobileUaDeviceType?: boolean;
  auth0Domain?: string;
  auth0ClientId?: string;
};

export const CommonHeader: VFC<CommonHeaderProps> = ({
  isAuthenticated,
  loginWithRedirect,
  logout,
  isMobileUaDeviceType,
  auth0Domain,
  auth0ClientId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalOpenBtnClickHandler = (): void => {
    setIsModalOpen(true);
  };

  const onModalCloseBtnClickHandler = (): void => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      {isMobileUaDeviceType ? (
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
                className='logout-button'
                type='button'
                styleTypes='textLink'
                width='100px'
                fontSizeValue='16px'
                padding='0'
                buttonContent='ログアウト'
                onClick={(): void => logout({ returnTo: window.location.origin })}
              />
              <Button
                className='my-page-button'
                type='button'
                styleTypes='textLink'
                width='100px'
                fontSizeValue='16px'
                padding='0'
                buttonContent='マイページ'
                onClick={(): Promise<boolean> => Router.push('/my-page')}
              />
              <StHamburgerMenuButton type='button' onClick={onModalOpenBtnClickHandler}>
                <GiHamburgerMenu size={20} />
              </StHamburgerMenuButton>
            </StButtonContainer>
          ) : (
            <StButtonContainer>
              <Button
                className='login-button'
                type='button'
                styleTypes='textLink'
                width='100px'
                fontSizeValue='16px'
                padding='0'
                buttonContent='ログイン'
                onClick={loginWithRedirect}
              />
              <Button
                className='register-button'
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
              <StHamburgerMenuButton type='button' onClick={onModalOpenBtnClickHandler}>
                <GiHamburgerMenu size={20} />
              </StHamburgerMenuButton>
            </StButtonContainer>
          )}
          {/* ハンバーガーメニューをクリックしたら`SideBar`を右から左にスライドして描画 */}
          <TransitionHorizontalModal
            isModalOpen={isModalOpen}
            closeButtonComponent={
              <IconButton
                type='button'
                svgComponent={<ImCross />}
                onClick={onModalCloseBtnClickHandler}
                borderRadius='50%'
                width='40px'
                height='40px'
              />
            }
            onModalOpen={onModalOpenBtnClickHandler}
            onModalClose={onModalCloseBtnClickHandler}
            mainContent={
              <StCommonSideBar>
                <CommonSideBar auth0Domain={auth0Domain} auth0ClientId={auth0ClientId} />
              </StCommonSideBar>
            }
            modalTitle='ページを選択して下さい'
            modalWidth='100vw'
            headerFontSize='24px'
            headerPadding='8px'
          />
        </StHeader>
      ) : (
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
                className='logout-button'
                type='button'
                styleTypes='textLink'
                width='100px'
                fontSizeValue='16px'
                padding='0'
                buttonContent='ログアウト'
                onClick={(): void => logout({ returnTo: window.location.origin })}
              />
              <Button
                className='my-page-button'
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
                className='login-button'
                type='button'
                styleTypes='textLink'
                width='100px'
                fontSizeValue='16px'
                padding='0'
                buttonContent='ログイン'
                onClick={loginWithRedirect}
              />
              <Button
                className='register-button'
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
      )}
    </React.Fragment>
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

  .logout-button,
  .my-page-button,
  .login-button,
  .register-button {
    color: ${COLOR_PALETTE.BLACK};
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StCommonSideBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
`;

const StHamburgerMenuButton = styled.button`
  margin-left: 8px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
