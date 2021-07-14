import { HeadTemplate } from "src/components/templates/HeadTemplate";
import { CommonTemplate } from "src/components/templates/CommonTemplate";

const ProductDetailPage = () => {
  return (
    <>
      <HeadTemplate pageTitle="商品詳細ページ" />
      <CommonTemplate>商品詳細ページ</CommonTemplate>
    </>
  );
};

export default ProductDetailPage;
