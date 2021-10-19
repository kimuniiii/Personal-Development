import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled';
import Router from 'next/router';
import React from 'react';
// eslint-disable-next-line import/order
import Parser from 'ua-parser-js';

import { Button } from 'src/components/atoms/Button';
import { Loader } from 'src/components/atoms/Loader';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

// import { deleteUser } from 'src/lib/deleteUser';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import type { NextPage, GetServerSideProps } from 'next';

type WithDrawProps = {
  isMobileUaDeviceType: boolean;
  origin: string;
  auth0Domain?: string;
  auth0ClientId?: string;
};

/**
 * @概要 マイページの「退会ボタン」を押したら表示されるページコンポーネント
 * @説明1 非ログイン時にアクセスできないようにしたいため「Protected Page」である
 * @説明2 退会ボタンを押して、退会が完了したら、トップ画面に画面遷移する
 */
const WithDrawPage: NextPage<WithDrawProps> = ({
  isMobileUaDeviceType,
  origin,
  auth0Domain,
  auth0ClientId,
}) => {
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

  console.log('WithDrawPage');
  console.log('auth0Domain', auth0Domain);
  console.log('auth0ClientId', auth0ClientId);

  const { user } = useAuth0();
  console.log('user', user);

  const handleWithdrawBtnClickHandler = (): void => {
    alert('退会ボタンをクリックしました');
    // MEMO : api/delete だと 403認証エラー になる
    // Router.push({
    //   pathname: 'api/delete',
    //   query: { auth0UserId: user?.sub },
    // });
    // fetch(`/api/delete?${user?.sub}`, { method: 'DELETE' }).then((res) => console.log(res.json()));

    // エラー内容 : SanitizedError [APIError]: connect ECONNREFUSED 127.0.0.1:443
    Router.push({
      pathname: 'http://localhost:8000/user-delete',
    });
    // fetch(`http://127.0.0.1:8000/user-delete`, { mode: 'no-cors' });
  };

  // const handleWithdrawBtnClickHandler = (): void => {
  //   deleteUser({ auth0Domain, auth0ClientId, user, getAccessTokenSilently })
  //     .then((res) => {
  //       console.log('then');
  //       console.log(res);

  //       if (res.ok) {
  //         console.log('res.ok');
  //         // 退会処理が完了したらトップページに画面遷移する
  //         Router.replace('/');
  //       } else {
  //         // 失敗時には`Failed SnackBar`を表示する
  //         console.log('response failed');
  //       }
  //     })
  //     .catch((res) => {
  //       console.log('catch');
  //       console.error(res);
  //     });
  // };

  return (
    <React.Fragment>
      <HeadTemplate
        pageOrigin={origin}
        pageCanonicalUrl='https://www.riot-ec-site.com/withdraw'
        pageTitle='退会ページ'
      />
      {isMobileUaDeviceType ? (
        <CommonTemplate isMobileUaDeviceType={isMobileUaDeviceType}>
          <StWithDrawRoot>
            <h3>退会</h3>
            <StWithDrawContainer>
              <Button
                type='button'
                styleTypes='tertiary'
                width='200px'
                fontSizeValue='16px'
                buttonContent='退会する'
                onClick={handleWithdrawBtnClickHandler}
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
      ) : (
        <CommonTemplate isSideBar={true}>
          <StWithDrawRoot>
            <h3>退会</h3>
            <StWithDrawContainer>
              <Button
                type='button'
                styleTypes='tertiary'
                width='200px'
                fontSizeValue='16px'
                buttonContent='退会する'
                onClick={handleWithdrawBtnClickHandler}
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
      )}
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

// TODO : UserAgentの判別によってレスポンシブ対応を行っているが、SSGは非対応。SSGにも対応できる方法があったら置き換える
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const userAgent = Parser(req?.headers['user-agent']);
  return { props: { isMobileUaDeviceType: userAgent.device.type === 'mobile' } };
};

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
