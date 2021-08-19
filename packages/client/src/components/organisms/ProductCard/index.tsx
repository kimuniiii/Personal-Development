import styled from '@emotion/styled';
import Image from 'next/image';

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
              <Image src={productItem.productImage} alt={productItem.productImageAlt} />
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
