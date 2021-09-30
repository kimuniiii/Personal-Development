import { useQuery, gql } from '@apollo/client';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import type { NextPage } from 'next';

import { Margin } from 'src/components/layouts/Margin';
import { Pagination } from 'src/components/organisms/Pagination';
import { ProductCard } from 'src/components/organisms/ProductCard';
import { ProductCardSkeleton } from 'src/components/organisms/ProductCardSkeleton';
import { SearchBox } from 'src/components/organisms/SearchBox';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { COLOR_PALETTE } from 'src/styles/color_palette';

type TopPageProps = {
  origin: string;
};

const TopPage: NextPage<TopPageProps> = ({ origin }) => {
  const SEARCH_CURRENT_PAGE_NUMBER = 1;
  const PAGINATION_OFFSET_NUMBER = 6;

  // 初期描画時には「最大で6件のデータ」を取得する
  const GET_PRODUCT_INITIAL_DATA = gql`
    query GetProductInitialData {
      product(offset: 0, limit: 6, order_by: { id: asc }) {
        id
        name
        price
        category
      }
    }
  `;

  const [selectedCategory, setSelectedCategory] = useState('');
  const [offSet, setOffSet] = useState(PAGINATION_OFFSET_NUMBER);
  const [paginationCurrentIndex, setPaginationCurrentIndex] = useState(SEARCH_CURRENT_PAGE_NUMBER);
  const [getProductData, setGetProductData] = useState(GET_PRODUCT_INITIAL_DATA);

  const { loading, error, data, previousData, client } = useQuery<{
    product: [{ id: number; name: string; price: number }];
  }>(getProductData);

  // useEffect内で`GraphQL`の`query`を飛ばす方法
  // ただ`Console`で結果を確かめているだけで画面上には何も影響のない実装
  useEffect(() => {
    client
      .query({
        query: gql`
          query GetProductData {
            product(offset: 0, order_by: { id: asc }) {
              id
              name
              price
              category
            }
          }
        `,
      })
      .then((result) => console.log('result', result));
    return (): void => {
      console.log('useEffect | 復習 | DOMを破棄するときに処理が走る');
    };
  });

  // API通信の結果に応じて「動的」に変化していく予定
  const SEARCH_TOTAL_RESULT_NUMBER = data?.product?.length;

  console.log('data', data);
  console.log('data?.product', data?.product);
  console.log('previousData?.product', previousData?.product);

  if (error) return <p>{error.toString()}</p>;

  console.log('初期描画時は空文字・検索ボタンを押したら選択したカテゴリーの情報入る');
  console.log('selectedCategory', selectedCategory);

  /**
   * @概要 ページネーションボタンを押した時に呼び出されるイベントハンドラ
   */
  const onPaginationBtnClick = (paginationIndex: number): void => {
    if (paginationCurrentIndex < paginationIndex) {
      console.log('今よりも先に進む');
      console.log('paginationCurrentIndex', paginationCurrentIndex);
      console.log('paginationIndex', paginationIndex);

      console.log('offSet', offSet);
      setOffSet((prev: number) => prev + 6);

      // 検索してなかったら「カテゴリー」で絞り込みを行う`query`を実行しないようにする
      const GET_INCREMENT_PAGINATION_FILTER_PRODUCT_DATA = selectedCategory
        ? gql`
        query GetIncrementPaginationFilterProductData {
          product(offset: ${offSet}, limit: 6, order_by: { id: asc }, where: { category: { _eq: "${selectedCategory}" }}) {
            id
            name
            price
          }
        }
      `
        : gql`
      query GetIncrementPaginationFilterProductData {
        product(offset: ${offSet}, limit: 6, order_by: { id: asc }) {
          id
          name
          price
        }
      }
    `;

      setGetProductData(GET_INCREMENT_PAGINATION_FILTER_PRODUCT_DATA);
    }

    if (paginationCurrentIndex > paginationIndex) {
      console.log('今よりも前に戻る');
      console.log('paginationCurrentIndex', paginationCurrentIndex);
      console.log('paginationIndex', paginationIndex);

      console.log('offSet', offSet);
      console.log('offSet - 12', offSet - 12);
      setOffSet((prev: number) => prev - 6);

      // 検索してなかったら「カテゴリー」で絞り込みを行う`query`を実行しないようにする
      const GET_DECREMENT_PAGINATION_FILTER_PRODUCT_DATA = selectedCategory
        ? gql`
        query GetDecrementPaginationFilterProductData {
          product(offset: ${
            offSet - 12
          }, limit: 6, order_by: { id: asc }, where: { category: { _eq: "${selectedCategory}" }}) {
            id
            name
            price
          }
        }
      `
        : gql`
      query GetDecrementPaginationFilterProductData {
        product(offset: ${offSet - 12}, limit: 6, order_by: { id: asc }) {
          id
          name
          price
        }
      }
    `;

      setGetProductData(GET_DECREMENT_PAGINATION_FILTER_PRODUCT_DATA);
    }

    setPaginationCurrentIndex(paginationIndex);
  };

  console.log('イベントハンドラの外');
  console.log('offSet', offSet);

  return (
    <React.Fragment>
      <HeadTemplate
        pageOrigin={origin}
        pageCanonicalUrl='https://www.riot-ec-site.com'
        pageTitle='トップページ'
      />
      <CommonTemplate isSideBar={false}>
        <StRoot>
          <SearchBox
            setGetProductData={setGetProductData}
            setSelectedCategory={setSelectedCategory}
          />
          <StProductListContainer>
            <StSearchResultLabel>
              <h4>{SEARCH_TOTAL_RESULT_NUMBER}件の商品が見つかりました</h4>
              <StSearchResultItem>
                {paginationCurrentIndex} - {SEARCH_TOTAL_RESULT_NUMBER}件<Margin right='4px' />/
                <Margin right='4px' />
                {SEARCH_TOTAL_RESULT_NUMBER}件中
              </StSearchResultItem>
            </StSearchResultLabel>
            {loading ? <ProductCardSkeleton /> : <ProductCard productCardList={data?.product} />}
            <Pagination
              className='pagination'
              defaultIndex={paginationCurrentIndex}
              lastIndex={3}
              isPagerButton={true}
              onClick={onPaginationBtnClick}
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

  h1,
  .pagination {
    flex-basis: 40px;
  }

  ul {
    flex-basis: 424px;
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
