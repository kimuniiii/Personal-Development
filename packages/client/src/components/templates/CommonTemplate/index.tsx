import { useAuth0 } from '@auth0/auth0-react';
import { css, SerializedStyles } from '@emotion/react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode, useEffect, useState, VFC } from 'react';

import { Button } from 'src/components/atoms/Button';
import { CommonFooter } from 'src/components/templates/CommonTemplate/CommonFooter';
import { CommonHeader } from 'src/components/templates/CommonTemplate/CommonHeader';
import { CommonSideBar } from 'src/components/templates/CommonTemplate/CommonSideBar';

type CommonTemplateProps = {
  children: ReactNode;
  auth0Domain?: string;
  auth0ClientId?: string;
  isMobileUaDeviceType?: boolean;
  isSideBar?: boolean;
};

type Theme = {
  light: {
    bgColor: string;
    textColor: string;
  };
  dark: {
    bgColor: string;
    textColor: string;
  };
};

export const CommonTemplate: VFC<CommonTemplateProps> = ({
  children,
  auth0Domain,
  auth0ClientId,
  isMobileUaDeviceType,
  isSideBar,
}) => {
  console.log('CommonTemplate');
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const theme = useTheme() as Theme;
  console.log('theme', theme);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeOn = (): void => {
    localStorage.setItem('darkMode', 'on');
    setIsDarkMode(true);
  };

  const handleDarkModeOff = (): void => {
    localStorage.setItem('darkMode', 'off');
    setIsDarkMode(false);
  };

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'on') {
      setIsDarkMode(true);
    }

    if (localStorage.getItem('darkMode') === 'off') {
      setIsDarkMode(false);
    }
  }, []);

  return (
    <StCommonRoot
      style={
        isDarkMode
          ? { color: theme.dark.textColor, backgroundColor: theme.dark.bgColor }
          : { color: theme.light.textColor, backgroundColor: theme.light.bgColor }
      }
    >
      {isMobileUaDeviceType ? (
        <CommonHeader
          isAuthenticated={isAuthenticated}
          loginWithRedirect={loginWithRedirect}
          logout={logout}
          isMobileUaDeviceType={isMobileUaDeviceType}
          auth0Domain={auth0Domain}
          auth0ClientId={auth0ClientId}
        />
      ) : (
        <CommonHeader
          isMobileUaDeviceType={isMobileUaDeviceType}
          isAuthenticated={isAuthenticated}
          loginWithRedirect={loginWithRedirect}
          logout={logout}
        />
      )}
      {isSideBar ? (
        <StMain isSideBar={isSideBar}>
          <main>{children}</main>
          <CommonSideBar auth0Domain={auth0Domain} auth0ClientId={auth0ClientId} />
        </StMain>
      ) : (
        <StMain isSideBar={isSideBar}>
          <main>{children}</main>
        </StMain>
      )}
      {isDarkMode ? (
        <Button
          type='button'
          styleTypes='primary'
          width='auto'
          fontSizeValue='16px'
          padding='20px'
          buttonContent='Change to LightMode'
          onClick={handleDarkModeOff}
        />
      ) : (
        <Button
          type='button'
          styleTypes='primary'
          width='auto'
          fontSizeValue='16px'
          padding='20px'
          buttonContent='Change to DarkMode'
          onClick={handleDarkModeOn}
        />
      )}
      <CommonFooter />
    </StCommonRoot>
  );
};

const StCommonRoot = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StMain = styled.div<{ isSideBar?: boolean }>`
  ${({ isSideBar }): SerializedStyles | null =>
    isSideBar
      ? css`
          display: flex;
          min-width: calc(100vw - 220px);

          main {
            flex: 1;
          }
        `
      : css`
          /*
          ** Flexアイテムを拡張して利用可能なスペースを埋めるために記載
          */
          flex: 1;
        `}
`;
