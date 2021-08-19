import styled from '@emotion/styled';
import Router from 'next/router';
import React from 'react';

import { Button } from 'src/components/atoms/Button';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { COLOR_PALETTE } from 'src/styles/color_palette';

/**
 * @概要 マイページの「退会ボタン」を押したら表示されるページコンポーネント
 */
const WithDrawPage = (): JSX.Element => {
  return (
    <React.Fragment>
      <HeadTemplate pageTitle='退会ページ' />
      <CommonTemplate>
        <StWithDrawRoot>
          <h3>退会</h3>
          <StWithDrawContainer>
            <Button
              type='button'
              styleTypes='tertiary'
              width='200px'
              fontSizeValue='16px'
              buttonContent='退会する'
              onClick={(): void => alert('退会するボタンをクリック')}
            />
          </StWithDrawContainer>
          <Button
            type='button'
            styleTypes='textLink'
            width='200px'
            fontSizeValue='16px'
            buttonContent='マイページに戻る'
            onClick={(): Promise<boolean> => Router.push('/my-page')}
          />
        </StWithDrawRoot>
      </CommonTemplate>
    </React.Fragment>
  );
};

export default WithDrawPage;

const StWithDrawRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*
  ** CommonHeaderのheight : 48px
  ** CommonFooterのheight : 56px
  */
  min-height: calc(100vh - (48px + 56px));
  padding: 16px;
`;

const StWithDrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
`;
