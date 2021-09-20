import { useAuth0 } from '@auth0/auth0-react';
import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode, VFC } from 'react';

import { CommonFooter } from 'src/components/templates/CommonTemplate/CommonFooter';
import { CommonHeader } from 'src/components/templates/CommonTemplate/CommonHeader';
import { CommonSideBar } from 'src/components/templates/CommonTemplate/CommonSideBar';

type CommonTemplateProps = {
  children: ReactNode;
  isSideBar?: boolean;
};

export const CommonTemplate: VFC<CommonTemplateProps> = ({ children, isSideBar }) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <StCommonRoot>
      <CommonHeader
        isAuthenticated={isAuthenticated}
        loginWithRedirect={loginWithRedirect}
        logout={logout}
      />
      {isSideBar ? (
        <StMain isSideBar={isSideBar}>
          <main>{children}</main>
          <CommonSideBar />
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
