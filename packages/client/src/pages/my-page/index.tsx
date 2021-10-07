import { useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

import type { NextPage } from 'next';

import { Loader } from 'src/components/atoms/Loader';
import { Margin } from 'src/components/layouts/Margin';
import { PcProductCard } from 'src/components/organisms/ProductCard/Pc';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { ErrorTemplate } from 'src/components/templates/ErrorTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { useAuth0Api } from 'src/hooks/useAuth0Api';

import { formatDateToyyyyMMdd } from 'src/lib/date';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import NoImage from '../../../public/images/no_image.png';

type MyPageProps = {
  origin: string;
  auth0Domain?: string;
  auth0ClientId?: string;
};

/**
 * @概要 ログインしていたらマイページ・ログインしていなかったらログイン画面に遷移するコンポーネント
 * @説明 非ログイン時にアクセスできないようにしたいため「Protected Page」である
 */
const MyPage: NextPage<MyPageProps> = ({ origin, auth0Domain, auth0ClientId }) => {
  const { isAuthenticated, isLoading, error } = useAuth0Api(`${origin}/my-page`, {
    audience: `${origin}`,
  });
  const { user, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <StCenterLoaderContainer>
        <Loader loadingContent='マイページに画面遷移しています' />
      </StCenterLoaderContainer>
    );
  }

  // ログインしていなかったら「ログインページ」へ転送する
  // ログイン画面に転送完了するまでは「画面中央」に「Loader」を表示する
  if (!isAuthenticated) {
    loginWithRedirect();
    return (
      <StCenterLoaderContainer>
        <Loader loadingContent='ログインページに画面遷移しています' />
      </StCenterLoaderContainer>
    );
  }

  if (error) {
    return <ErrorTemplate error={error} />;
  }

  if (typeof user === 'undefined') {
    return null;
  }

  return (
    <React.Fragment>
      <HeadTemplate
        pageOrigin={origin}
        pageCanonicalUrl='https://www.riot-ec-site.com/my-page'
        pageTitle='マイページ'
      />
      <CommonTemplate isSideBar={true} auth0Domain={auth0Domain} auth0ClientId={auth0ClientId}>
        <StRoot>
          <StProductListContainer>
            <StProfileInfoContainer>
              {user.picture ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={user.picture} alt='user picture' width={126} height={126} />
              ) : (
                <Image src={NoImage} alt='Mo Image' width={126} height={126} />
              )}
              <Margin right='32px' />
              <StUserProfileContainer>
                <h3>Hello！{user.nickname}さん</h3>
                <Margin bottom='8px' />
                <h5>メールアドレス : {user.email}</h5>
                <Margin bottom='8px' />
                <h5>登録名 : {user.nickname}</h5>
                <Margin bottom='8px' />
                <h5>最終更新日時 : {formatDateToyyyyMMdd(new Date(`${user.updated_at}`))}</h5>
              </StUserProfileContainer>
            </StProfileInfoContainer>
            <h3>登録商品</h3>
            <StTodo>TODO : 自分が登録した商品情報だけが描画される</StTodo>
            <PcProductCard productCardList={productCardList} />
            <h3>連絡掲示板</h3>
            <StTodo>TODO : 要件が決まり次第、実装を行う</StTodo>
            <h3>お気に入り一覧</h3>
            <StTodo>TODO : 要件が決まり次第、実装を行う</StTodo>
          </StProductListContainer>
        </StRoot>
      </CommonTemplate>
    </React.Fragment>
  );
};

export default MyPage;

const StCenterLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StRoot = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 48px;
  /*
  ** CommonHeaderのheight : 48px
  ** CommonFooterのheight : 56px
  */
  min-height: calc(100vh - (48px + 56px));
  gap: 24px;
`;

const StProductListContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StProfileInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StUserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StTodo = styled.p`
  color: ${COLOR_PALETTE.SUB_COLOR};
`;

// データモックを簡易的に定義する
type ProductCardList = { id: number; name: string; price: number; base64_image: string };

const productCardList: ProductCardList[] = [
  {
    id: 1,
    name: 'React First',
    price: 1000,
    base64_image: '',
  },
  {
    id: 2,
    name: 'React Second',
    price: 2000,
    base64_image: '',
  },
  {
    id: 3,
    name: 'React Third',
    price: 3000,
    base64_image: '',
  },
  {
    id: 4,
    name: 'React Fourth',
    price: 4000,
    base64_image: '',
  },
  {
    id: 5,
    name: 'React Fifth',
    price: 5000,
    base64_image: '',
  },
  {
    id: 6,
    name: 'React Sixth',
    price: 6000,
    base64_image: '',
  },
];
