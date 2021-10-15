import { withAuthenticationRequired } from '@auth0/auth0-react';
import styled from '@emotion/styled';

import { Loader } from 'src/components/atoms/Loader';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import type { NextPage } from 'next';

type ProductDetailPageProps = {
  origin: string;
};

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ origin }) => {
  return (
    <>
      <HeadTemplate
        pageOrigin={origin}
        pageCanonicalUrl='https://www.riot-ec-site.com/product/detail'
        pageTitle='商品詳細ページ'
      />
      <CommonTemplate>商品詳細ページ</CommonTemplate>
    </>
  );
};

export default withAuthenticationRequired(ProductDetailPage, {
  // eslint-disable-next-line react/display-name
  onRedirecting: () => {
    return (
      <StCenterLoaderContainer>
        <Loader loadingContent='ログイン済みかどうか判定しています' />
      </StCenterLoaderContainer>
    );
  },
});

const StCenterLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
