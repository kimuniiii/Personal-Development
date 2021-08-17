import Router from 'next/router';
import styled from '@emotion/styled';
import React from 'react';

import { Button } from 'src/components/atoms/Button';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';
import { ProductCard } from 'src/components/organisms/ProductCard';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import { priceToJapaneseYen } from 'src/utils/price';

import ReactImage from '../../../public/react.jpg';

const MyPage = (): JSX.Element => {
  return (
    <React.Fragment>
      <HeadTemplate pageTitle='トップページ' />
      <CommonTemplate>
        <StRoot>
          <StProductListContainer>
            <h3>登録商品</h3>
            <ProductCard productCardList={productCardList} />
            <Margin bottom='8px' />
            <h3>連絡掲示板</h3>
            <h3>お気に入り一覧</h3>
          </StProductListContainer>
          <StButtonContainer>
            <Button
              type='button'
              styleTypes='textLink'
              width='auto'
              fontSizeValue='16px'
              padding='8px'
              buttonContent='商品を出品する'
              onClick={(): Promise<boolean> => Router.push('/product/register')}
            />
            <Margin bottom='8px' />
            <Button
              type='button'
              styleTypes='textLink'
              width='auto'
              fontSizeValue='16px'
              padding='8px'
              buttonContent='販売履歴を見る'
              onClick={(): void => alert('販売履歴を見るボタンをクリック')}
            />
            <Margin bottom='8px' />
            <Button
              type='button'
              styleTypes='textLink'
              width='auto'
              fontSizeValue='16px'
              padding='8px'
              buttonContent='プロフィール編集'
              onClick={(): Promise<boolean> => Router.push('/profile-edit')}
            />
            <Margin bottom='8px' />
            <Button
              type='button'
              styleTypes='textLink'
              width='auto'
              fontSizeValue='16px'
              padding='8px'
              buttonContent='パスワード変更'
              onClick={(): Promise<boolean> => Router.push('/password/change')}
            />
            <Margin bottom='8px' />
            <Button
              type='button'
              styleTypes='textLink'
              width='auto'
              fontSizeValue='16px'
              padding='8px'
              buttonContent='退会'
              onClick={(): Promise<boolean> => Router.push('/withdraw')}
            />
          </StButtonContainer>
        </StRoot>
      </CommonTemplate>
    </React.Fragment>
  );
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

const StButtonContainer = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
  width: 200px;
  height: 500px;
  padding: 8px;

  button {
    color: ${COLOR_PALETTE.BLACK};
  }
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
