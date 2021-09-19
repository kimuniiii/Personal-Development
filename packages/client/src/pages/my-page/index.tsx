import { useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled';
import React from 'react';

import type { NextPage } from 'next';

import { Margin } from 'src/components/layouts/Margin';
import { ProductCard } from 'src/components/organisms/ProductCard';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { priceToJapaneseYen } from 'src/utils/price';

import ReactImage from '../../../public/images/react.jpg';

/**
 * @概要 ログインしていたらマイページ・ログインしていなかったらログイン画面に遷移するコンポーネント
 */
const MyPage: NextPage = () => {
  const { isAuthenticated, user } = useAuth0();

  // FIXME : ログインしてないのに「マイページ」にURLで直接アクセスした場合
  // FIXME : Auth0 の「ログインモーダル」に遷移させたいがエラーになるので
  // FIXME : とりあえず、何も描画させないような実装で対応を行った
  if (isAuthenticated && user !== undefined) {
    return (
      <React.Fragment>
        <HeadTemplate
          pageCanonicalUrl='https://www.riot-ec-site.com/my-page'
          pageTitle='マイページ'
        />
        <CommonTemplate isSideBar={true}>
          <StRoot>
            <StProductListContainer>
              <h3>Hello！{user.name}さん</h3>
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
  } else {
    return null;
  }
};

export default MyPage;

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
