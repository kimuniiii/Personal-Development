import styled from '@emotion/styled';
import React, { useState } from 'react';

import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';
import { SearchBox } from 'src/components/organisms/SearchBox';
import { Pagination } from 'src/components/organisms/Pagination';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';

const TopPage = (): JSX.Element => {
  const [paginationDefaultIndex, setPaginationDefaultIndex] = useState(1);

  return (
    <React.Fragment>
      <HeadTemplate pageTitle='トップページ' />
      <CommonTemplate>
        <StRoot>
          <SearchBox />
          <StProductListContainer>
            <StSearchResultLabel>
              <h4>3件の商品が見つかりました</h4>
              <span>1 - 3件 / 3件中</span>
            </StSearchResultLabel>
            <StProductList>
              <StProductItem>商品1</StProductItem>
              <StProductItem>商品2</StProductItem>
              <StProductItem>商品3</StProductItem>
              <StProductItem>商品4</StProductItem>
              <StProductItem>商品5</StProductItem>
              <StProductItem>商品6</StProductItem>
            </StProductList>
            <Margin bottom='32px' />
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
  height: 414px;
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
`;

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 128px;
  border-radius: 3px;
  border: 1px solid ${COLOR_PALETTE.BLACK};
`;
