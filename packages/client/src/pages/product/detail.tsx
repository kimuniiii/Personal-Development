import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

const ProductDetailPage = (): JSX.Element => {
  return (
    <>
      <HeadTemplate pageTitle='商品詳細ページ' />
      <CommonTemplate>商品詳細ページ</CommonTemplate>
    </>
  );
};

export default ProductDetailPage;
