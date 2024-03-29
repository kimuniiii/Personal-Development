import { useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Router from 'next/router';
import React from 'react';

import { LazyImage } from 'src/components/atoms/LazyImage';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import { priceToJapaneseYen } from 'src/utils/price';

import type { VFC } from 'react';

import NoImage from '../../../../../public/images/no_image.png';

type Props = {
  productCardList?: { id: number; name: string; price: number; base64_image: string }[];
};

export const SpProductCard: VFC<Props> = ({ productCardList }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  /**
   * @概要 商品画像をクリックしたときに呼ばれるイベントハンドラ
   * @要件1 ログインしていたら、商品詳細画面に遷移できること
   * @要件2 ログインしてないなら、Auth0のユーザー登録モーダルに遷移すること
   */
  const handleProductImageBtnClick = (): void => {
    if (isAuthenticated) {
      Router.push('/product/detail');
    } else {
      loginWithRedirect({
        screen_hint: 'signup',
      });
    }
  };

  return (
    <StProductList>
      {productCardList?.map((productItem, idx) => {
        return idx <= 5 ? (
          <React.Fragment key={productItem.id}>
            <StFigure>
              <StImageBtn onClick={handleProductImageBtnClick}>
                {productItem.base64_image ? (
                  <LazyImage
                    src={productItem.base64_image}
                    alt='Product Image'
                    width='348px'
                    height='180px'
                  />
                ) : (
                  <Image src={NoImage} alt='No Image' width={126} height={126} />
                )}
              </StImageBtn>
              <figcaption>{productItem.name}</figcaption>
              <figcaption>{priceToJapaneseYen(productItem.price)}</figcaption>
            </StFigure>
            {idx !== 2 && idx !== 5 ? <Margin right='16px' /> : null}
          </React.Fragment>
        ) : null;
      })}
    </StProductList>
  );
};

const StProductList = styled.picture`
  display: flex;
  flex-flow: column wrap;
  /* TODO : Safari で表示崩れが起きるため */
  row-gap: 16px;
  width: 348px;
  padding-top: 16px;
`;

const StFigure = styled.figure`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  border-radius: 3px;
  /* 白（光）とグレー（影）を対角線上に配置 */
  box-shadow: 13px 13px 26px #cac5c5, -13px -13px 26px #fff;
  border: 1px solid ${COLOR_PALETTE.BLACK};
`;

const StImageBtn = styled.button`
  cursor: pointer;
  /* ホバーをなめらかにするため */
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.6;
  }
`;
