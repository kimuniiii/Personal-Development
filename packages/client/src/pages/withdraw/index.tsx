import { withAuthenticationRequired } from '@auth0/auth0-react';
import styled from '@emotion/styled';
import Router from 'next/router';
import React from 'react';

import type { NextPage } from 'next';

import { Button } from 'src/components/atoms/Button';
import { Loader } from 'src/components/atoms/Loader';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { COLOR_PALETTE } from 'src/styles/color_palette';

type WithDrawProps = {
  origin: string;
};

/**
 * @概要 マイページの「退会ボタン」を押したら表示されるページコンポーネント
 * @説明 非ログイン時にアクセスできないようにしたいため「Protected Page」である
 */
const WithDrawPage: NextPage<WithDrawProps> = ({ origin }) => {
  // FIXME : 以下のコードで「アクセスコントロール」を行うとうまくいかない
  // const { isAuthenticated, loginWithRedirect } = useAuth0();
  // ログインしていなかったら「ログインページ」へ転送する
  // ログイン画面に転送完了するまでは「画面中央」に「Loader」を表示する
  // if (!isAuthenticated) {
  //   loginWithRedirect();
  //   return (
  //     <StCenterLoaderContainer>
  //       <Loader loadingContent='ログインページに画面遷移しています' />
  //     </StCenterLoaderContainer>
  //   );
  // }

  return (
    <React.Fragment>
      <HeadTemplate
        pageOrigin={origin}
        pageCanonicalUrl='https://www.riot-ec-site.com/withdraw'
        pageTitle='退会ページ'
      />
      <CommonTemplate>
        <StWithDrawRoot>
          <h3>退会</h3>
          <StWithDrawContainer>
            <Button
              type='button'
              styleTypes='tertiary'
              width='200px'
              fontSizeValue='16px'
              buttonContent='退会する'
              onClick={(): void => alert('退会するボタンをクリック')}
            />
          </StWithDrawContainer>
          <Button
            type='button'
            styleTypes='textLink'
            width='200px'
            fontSizeValue='16px'
            buttonContent='マイページに戻る'
            onClick={(): Promise<boolean> => Router.push('/my-page')}
          />
        </StWithDrawRoot>
      </CommonTemplate>
    </React.Fragment>
  );
};

export default withAuthenticationRequired(WithDrawPage, {
  // eslint-disable-next-line react/display-name
  onRedirecting: () => {
    return (
      <StCenterLoaderContainer>
        <Loader loadingContent='ログイン済みかどうか判定しています' />
      </StCenterLoaderContainer>
    );
  },
});

const StCenterLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StWithDrawRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*
  ** CommonHeaderのheight : 48px
  ** CommonFooterのheight : 56px
  */
  min-height: calc(100vh - (48px + 56px));
  padding: 16px;
`;

const StWithDrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
`;
