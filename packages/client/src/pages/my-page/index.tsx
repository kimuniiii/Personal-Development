import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled';
import React from 'react';

import type { NextPage } from 'next';

import { Loader } from 'src/components/atoms/Loader';
import { Margin } from 'src/components/layouts/Margin';
import { ProductCard } from 'src/components/organisms/ProductCard';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { useAuth0Api } from 'src/hooks/useAuth0Api';

import { formatDateToyyyyMMdd } from 'src/lib/date';

import { priceToJapaneseYen } from 'src/utils/price';

import ReactImage from '../../../public/images/react.jpg';

type MyPageProps = {
  origin: string;
};

/**
 * @概要 ログインしていたらマイページ・ログインしていなかったらログイン画面に遷移するコンポーネント
 * @説明 非ログイン時にアクセスできないようにしたいため「Protected Page」である
 */
const MyPage: NextPage<MyPageProps> = ({ origin }) => {
  const { isLoading, error } = useAuth0Api(`${origin}/my-page`, {
    audience: `${origin}`,
  });
  const { user } = useAuth0();

  if (error) {
    return (
      <div style={{ color: 'red' }}>
        <h1>{error.name}</h1>
        <h2>{error.message}</h2>
        <p>{error.stack}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <StCenterLoaderContainer>
        <Loader loadingContent='マイページに画面遷移しています' />
      </StCenterLoaderContainer>
    );
  }

  if (typeof user === 'undefined') {
    return null;
  }

  return (
    <React.Fragment>
      <HeadTemplate
        pageCanonicalUrl='https://www.riot-ec-site.com/my-page'
        pageTitle='マイページ'
      />
      <CommonTemplate isSideBar={true}>
        <StRoot>
          <StProductListContainer>
            <StProfileInfoContainer>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={user.picture} alt='user picture' width={126} height={126} />
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
            <ProductCard productCardList={productCardList} />
            <Margin bottom='8px' />
            <h3>連絡掲示板</h3>
            <h3>お気に入り一覧</h3>
          </StProductListContainer>
        </StRoot>
      </CommonTemplate>
    </React.Fragment>
  );
};

export default withAuthenticationRequired(MyPage, {
  // eslint-disable-next-line react/display-name
  onRedirecting: () => (
    <StCenterLoaderContainer>
      <Loader loadingContent='ログイン済かどうか判定してます' />
    </StCenterLoaderContainer>
  ),
});

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

// データモックを簡易的に定義する
export type ProductCardList = {
  productImage: {
    src: string;
    width: number;
    height: number;
  };
  productImageAlt: string;
  productName: string;
  productMoney: string;
};

const productCardList: ProductCardList[] = [
  {
    productImage: ReactImage,
    productImageAlt: 'Reactの画像です',
    productName: 'React First',
    productMoney: `${priceToJapaneseYen(1000)}`,
  },
  {
    productImage: ReactImage,
    productImageAlt: 'Reactの画像です',
    productName: 'React Second',
    productMoney: `${priceToJapaneseYen(1000)}`,
  },
  {
    productImage: ReactImage,
    productImageAlt: 'Reactの画像です',
    productName: 'React Third',
    productMoney: `${priceToJapaneseYen(1000)}`,
  },
  {
    productImage: ReactImage,
    productImageAlt: 'Reactの画像です',
    productName: 'React Fourth',
    productMoney: `${priceToJapaneseYen(1000)}`,
  },
  {
    productImage: ReactImage,
    productImageAlt: 'Reactの画像です',
    productName: 'React Fifth',
    productMoney: `${priceToJapaneseYen(1000)}`,
  },
  {
    productImage: ReactImage,
    productImageAlt: 'Reactの画像です',
    productName: 'React Sixth',
    productMoney: `${priceToJapaneseYen(1000)}`,
  },
];
