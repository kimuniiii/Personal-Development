import type { NextPage } from 'next';

import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

type ProductDetailPageProps = {
  origin: string;
};

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ origin }) => {
  return (
    <>
      <HeadTemplate
        pageOrigin={origin}
        pageCanonicalUrl='https://www.riot-ec-site.com/password/product/detail'
        pageTitle='商品詳細ページ'
      />
      <CommonTemplate>商品詳細ページ</CommonTemplate>
    </>
  );
};

export default ProductDetailPage;
