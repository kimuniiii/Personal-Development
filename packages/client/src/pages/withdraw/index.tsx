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

import { COLOR_PALETTE } from 'src/styles/color_palette';

import type { NextPage, GetServerSideProps } from 'next';

type WithDrawProps = {
  isMobileUaDeviceType: boolean;
  origin: string;
};

/**
 * @概要 マイページの「退会ボタン」を押したら表示されるページコンポーネント
 * @説明1 非ログイン時にアクセスできないようにしたいため「Protected Page」である
 * @説明2 退会ボタンを押して、退会が完了したら、トップ画面に画面遷移する
 */
const WithDrawPage: NextPage<WithDrawProps> = ({ isMobileUaDeviceType, origin }) => {
  console.log('WithDrawPage');

  const { user, logout } = useAuth0();
  console.log('user', user);

  const handleWithdrawBtnClickHandler = (): void => {
    alert('退会ボタンをクリックしました');

    fetch(`/api/delete/${user?.sub}`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) {
          console.log('res.ok');
          // 退会処理が完了したら`トップページ`に画面遷移する
          // logout関数を呼び出すことで「isAuthenticated」を「false」にする
          logout({ returnTo: window.location.origin });
        } else {
          // 失敗時には`Failed SnackBar`を表示する
          console.log('response failed');
        }
      })
      .catch((error) => console.error(error));
  };

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
