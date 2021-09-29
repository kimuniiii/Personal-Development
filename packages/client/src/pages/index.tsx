import { useQuery, gql } from '@apollo/client';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import type { NextPage } from 'next';

import { Margin } from 'src/components/layouts/Margin';
import { Pagination } from 'src/components/organisms/Pagination';
import { ProductCard } from 'src/components/organisms/ProductCard';
import { ProductCardSkeleton } from 'src/components/organisms/ProductCardSkeleton';
import { SearchBox } from 'src/components/organisms/SearchBox';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { COLOR_PALETTE } from 'src/styles/color_palette';

// 初期描画時には「最大で6件のデータ」を取得する
const GET_PRODUCT_TOTAL_DATA = gql`
  query GetProductData {
    product(offset: 0) {
      id
      name
      price
      category
    }
  }
`;

type TopPageProps = {
  origin: string;
};

const TopPage: NextPage<TopPageProps> = ({ origin }) => {
  const SEARCH_CURRENT_PAGE_NUMBER = 1;

  const [paginationDefaultIndex, setPaginationDefaultIndex] = useState(SEARCH_CURRENT_PAGE_NUMBER);
  const [getProductData, setGetProductData] = useState(GET_PRODUCT_TOTAL_DATA);

  const { loading, error, data } = useQuery<{
    product: [{ id: number; name: string; price: number }];
  }>(getProductData);

  // API通信の結果に応じて「動的」に変化していく予定
  const SEARCH_TOTAL_RESULT_NUMBER = data?.product.length;
  console.log('data', data);
  console.log('data?.product', data?.product);

  if (error) return <p>{error.toString()}</p>;

  return (
    <React.Fragment>
      <HeadTemplate
        pageOrigin={origin}
        pageCanonicalUrl='https://www.riot-ec-site.com'
        pageTitle='トップページ'
      />
      <CommonTemplate isSideBar={false}>
        <StRoot>
          <SearchBox setGetProductData={setGetProductData} />
          <StProductListContainer>
            <StSearchResultLabel>
              <h4>{SEARCH_TOTAL_RESULT_NUMBER}件の商品が見つかりました</h4>
              <StSearchResultItem>
                {paginationDefaultIndex} - {SEARCH_TOTAL_RESULT_NUMBER}件<Margin right='4px' />/
                <Margin right='4px' />
                {SEARCH_TOTAL_RESULT_NUMBER}件中
              </StSearchResultItem>
            </StSearchResultLabel>
            {loading ? <ProductCardSkeleton /> : <ProductCard productCardList={data?.product} />}
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
