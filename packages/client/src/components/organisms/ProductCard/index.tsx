import styled from '@emotion/styled';
import Image from 'next/image';
import Router from 'next/router';

import type { VFC } from 'react';
import type { ProductCardList } from 'src/pages';

import { COLOR_PALETTE } from 'src/styles/color_palette';

type Props = {
  productCardList: ProductCardList[];
};

export const ProductCard: VFC<Props> = ({ productCardList }) => {
  return (
    <StProductList>
      {productCardList.map((productItem, idx) => {
        return (
          <StProductItem key={idx}>
            <StFigure>
              {/* TODO ログインしていなかったらユーザー登録画面に遷移させる実装を行う */}
              <StImageBtn onClick={(): Promise<boolean> => Router.push('/product/detail')}>
                <Image src={productItem.productImage} alt={productItem.productImageAlt} />
              </StImageBtn>
              <figcaption>{productItem.productName}</figcaption>
              <figcaption>{productItem.productMoney}</figcaption>
            </StFigure>
          </StProductItem>
        );
      })}
    </StProductList>
  );
};

const StProductList = styled.ul`
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
  /*
  ** 128 + 16 + 128 + 16 + 128 + 8 = 416
  */
  width: 416px;
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
