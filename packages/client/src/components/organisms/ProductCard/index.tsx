import { useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Router from 'next/router';
import React from 'react';

import type { VFC } from 'react';

import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import { priceToJapaneseYen } from 'src/utils/price';

// import MacBookImage from '../../public/images/macbook.jpeg';
// TODO : 画像は静的に読み込むのではなく「動的」に読み込みたい
import ReactImage from '../../../../public/images/react.jpg';

type Props = {
  productCardList?: { id: number; name: string; price: number }[];
};

export const ProductCard: VFC<Props> = ({ productCardList }) => {
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
            <StProductItem>
              <StFigure>
                <StImageBtn onClick={handleProductImageBtnClick}>
                  <Image src={ReactImage} alt='React Image' width={126} height={126} />
                </StImageBtn>
                <figcaption>{productItem.name}</figcaption>
                <figcaption>{priceToJapaneseYen(productItem.price)}</figcaption>
              </StFigure>
            </StProductItem>
            {idx !== 2 && idx !== 5 ? <Margin right='16px' /> : null}
          </React.Fragment>
        ) : null;
      })}
    </StProductList>
  );
};

const StProductList = styled.ul`
  display: flex;
  flex-flow: row wrap;
  /* TODO : Safari で表示崩れが起きるため */
  row-gap: 16px;

  /*
  ** 128 + 16 + 128 + 16 + 128 + 8 = 416
  */
  width: 416px;
  padding: 16px 0 32px 0;
`;

const StProductItem = styled.li`
  width: 128px;
  height: 180px;
  border-radius: 3px;
  border: 1px solid ${COLOR_PALETTE.BLACK};
`;

const StFigure = styled.figure`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StImageBtn = styled.button`
  cursor: pointer;
  /* ホバーをなめらかにするため */
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.6;
  }
`;
