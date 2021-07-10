import React from "react";

import { HeadTemplate } from "src/components/templates/HeadTemplate";
import { CommonTemplate } from "src/components/templates/CommonTemplate";

const ProductDetailPage = () => {
  return (
    <React.Fragment>
      <HeadTemplate pageTitle="商品詳細ページ" />
      <CommonTemplate>商品詳細ページ</CommonTemplate>
    </React.Fragment>
  );
};

export default ProductDetailPage;
