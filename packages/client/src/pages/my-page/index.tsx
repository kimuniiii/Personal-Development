import { withAuthenticationRequired } from '@auth0/auth0-react';
import styled from '@emotion/styled';
import React from 'react';

import type { NextPage } from 'next';

import { Loader } from 'src/components/atoms/Loader';
import { Margin } from 'src/components/layouts/Margin';
import { ProductCard } from 'src/components/organisms/ProductCard';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { useAuth0Api } from 'src/hooks/useAuth0Api';

import { priceToJapaneseYen } from 'src/utils/price';

import ReactImage from '../../../public/images/react.jpg';

type MyPageProps = {
  origin: string;
};

/**
 * @概要 ログインしていたらマイページ・ログインしていなかったらログイン画面に遷移するコンポーネント
 * @説明 ユーザーの情報が表示されているため「protected page」となる
 */
const MyPage: NextPage<MyPageProps> = ({ origin }) => {
  console.log('my-page-origin', origin);
  console.log('useApiの前');
  const { loading, error } = useAuth0Api(`${origin}/my-page`, {
    audience: `${origin}`,
  });

  if (loading) {
    return (
      <StCenterLoaderContainer>
        <Loader loadingContent='このまましばらくお待ち下さい' />
      </StCenterLoaderContainer>
    );
  }

  if (error) {
    return (
      <div style={{ color: 'red' }}>
        <h1>{error.name}</h1>
        <h2>{error.message}</h2>
        <p>{error.stack}</p>
      </div>
    );
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
            <h3>Hello！さん</h3>
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
      <Loader loadingContent='ログイン画面に遷移しています' />
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
  height: 500px;
  gap: 16px;
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
