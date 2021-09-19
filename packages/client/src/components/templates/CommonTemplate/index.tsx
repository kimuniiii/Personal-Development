import { useAuth0 } from '@auth0/auth0-react';
import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode, useEffect, VFC } from 'react';

import { Loader } from 'src/components/atoms/Loader';
import { CommonFooter } from 'src/components/templates/CommonTemplate/CommonFooter';
import { CommonHeader } from 'src/components/templates/CommonTemplate/CommonHeader';
import { CommonSideBar } from 'src/components/templates/CommonTemplate/CommonSideBar';

type CommonTemplateProps = {
  children: ReactNode;
  isSideBar?: boolean;
};

export const CommonTemplate: VFC<CommonTemplateProps> = ({ children, isSideBar }) => {
  const { isLoading, isAuthenticated, error, getAccessTokenSilently, loginWithRedirect, logout } =
    useAuth0();

  // auth0-react ではクライアントサイドで「アクセストークン」を取得する
  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const token = await getAccessTokenSilently();
        console.log({ token });
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return (
      <StCenterLoaderContainer>
        <Loader loadingContent='このまましばらくお待ち下さい' />
      </StCenterLoaderContainer>
    );
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

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

const StCenterLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

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
