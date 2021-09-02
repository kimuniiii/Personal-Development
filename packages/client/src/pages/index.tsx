import styled from '@emotion/styled';
import React, { useState } from 'react';

import { Margin } from 'src/components/layouts/Margin';
import { Pagination } from 'src/components/organisms/Pagination';
import { ProductCard } from 'src/components/organisms/ProductCard';
import { SearchBox } from 'src/components/organisms/SearchBox';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import { priceToJapaneseYen } from 'src/utils/price';

import ReactImage from '../../public/images/react.jpg';

const TopPage = (): JSX.Element => {
  // API通信の結果に応じて「動的」に変化していく予定
  const SEARCH_CURRENT_PAGE_NUMBER = 1;
  const SEARCH_TOTAL_RESULT_NUMBER = 3;

  const [paginationDefaultIndex, setPaginationDefaultIndex] = useState(1);

  return (
    <React.Fragment>
      <HeadTemplate pageTitle='トップページ' />
      <CommonTemplate isSideBar={false}>
        <StRoot>
          <SearchBox />
          <StProductListContainer>
            <StSearchResultLabel>
              <h4>{SEARCH_TOTAL_RESULT_NUMBER}件の商品が見つかりました</h4>
              <StSearchResultItem>
                {SEARCH_CURRENT_PAGE_NUMBER} - {SEARCH_TOTAL_RESULT_NUMBER}件<Margin right='4px' />/
                <Margin right='4px' />
                {SEARCH_TOTAL_RESULT_NUMBER}件中
              </StSearchResultItem>
            </StSearchResultLabel>
            <ProductCard productCardList={productCardList} />
            <Margin bottom='8px' />
            <Pagination
              className='pagination'
              defaultIndex={paginationDefaultIndex}
              lastIndex={3}
              isPagerButton={true}
              onClick={setPaginationDefaultIndex}
            />
          </StProductListContainer>
        </StRoot>
      </CommonTemplate>
    </React.Fragment>
  );
};

export default TopPage;

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

  h1,
  ul,
  .pagination {
    flex: 1;
  }
`;

const StSearchResultLabel = styled.section`
  display: flex;
  justify-content: space-between;
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
  padding: 8px;
`;

const StSearchResultItem = styled.section`
  display: flex;
  align-items: center;
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
