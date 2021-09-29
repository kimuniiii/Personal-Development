import { useQuery, gql } from '@apollo/client';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import type { NextPage } from 'next';

import { Loader } from 'src/components/atoms/Loader';
import { Margin } from 'src/components/layouts/Margin';
import { Pagination } from 'src/components/organisms/Pagination';
import { ProductCard } from 'src/components/organisms/ProductCard';
import { SearchBox } from 'src/components/organisms/SearchBox';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { COLOR_PALETTE } from 'src/styles/color_palette';

type TopPageProps = {
  origin: string;
};

const TopPage: NextPage<TopPageProps> = ({ origin }) => {
  const SEARCH_CURRENT_PAGE_NUMBER = 1;
  const [paginationDefaultIndex, setPaginationDefaultIndex] = useState(SEARCH_CURRENT_PAGE_NUMBER);

  // 初期描画時には「最大で6件のデータ」を取得する
  const GET_PRODUCT_DATA = gql`
    query GetProductData {
      product(limit: 6, offset: 0) {
        id
        name
        price
        category
      }
    }
  `;

  const [getProductCard, setGetProductCard] = useState(GET_PRODUCT_DATA);

  const { loading, error, data } = useQuery<{
    product: [{ id: number; name: string; price: number }];
  }>(getProductCard);

  // API通信の結果に応じて「動的」に変化していく予定
  const SEARCH_TOTAL_RESULT_NUMBER = data?.product.length;

  console.log(data?.product);

  if (error) return <p>{error.toString()}</p>;

  /**
   * @概要 検索ボタン押下時に呼び出されるイベントハンドラ
   * @説明1 カテゴリーに合致したデータを取得する
   * @説明2 金額の高い or 安い順番にデータを取得する
   */
  const handleSearchBtnClick = (): void => {
    alert('検索するボタンをクリックしました');

    const GET_FILTER_PRODUCT_DATA = gql`
      query GetFilterProductData {
        product(limit: 6, offset: 3, where: { category: { _eq: "その他" } }) {
          id
          name
          price
        }
      }
    `;

    setGetProductCard(GET_FILTER_PRODUCT_DATA);
  };

  return (
    <React.Fragment>
      <HeadTemplate
        pageOrigin={origin}
        pageCanonicalUrl='https://www.riot-ec-site.com'
        pageTitle='トップページ'
      />
      <CommonTemplate isSideBar={false}>
        <StRoot>
          <SearchBox onClick={handleSearchBtnClick} />
          <StProductListContainer>
            <StSearchResultLabel>
              <h4>{SEARCH_TOTAL_RESULT_NUMBER}件の商品が見つかりました</h4>
              <StSearchResultItem>
                {paginationDefaultIndex} - {SEARCH_TOTAL_RESULT_NUMBER}件<Margin right='4px' />/
                <Margin right='4px' />
                {SEARCH_TOTAL_RESULT_NUMBER}件中
              </StSearchResultItem>
            </StSearchResultLabel>
            {loading ? (
              <StProductCardLoaderContainer>
                <Loader />
              </StProductCardLoaderContainer>
            ) : (
              <ProductCard productCardList={data?.product} />
            )}
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

const StProductCardLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 416px;
  height: 376px;
`;
