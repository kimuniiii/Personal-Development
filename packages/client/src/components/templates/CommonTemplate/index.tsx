import { useAuth0 } from '@auth0/auth0-react';
import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode, VFC } from 'react';

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

export const CommonTemplate: VFC<CommonTemplateProps> = ({
  children,
  auth0Domain,
  auth0ClientId,
  isMobileUaDeviceType,
  isSideBar,
}) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  console.log('CommonTemplate');
  console.log('auth0Domain', auth0Domain);
  console.log('auth0ClientId', auth0ClientId);

  return (
    <StCommonRoot>
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
