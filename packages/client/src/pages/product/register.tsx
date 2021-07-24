import React from 'react';

import { HeadTemplate } from 'src/components/templates/HeadTemplate';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';

const ProductRegisterPage = () => {
  return (
    <React.Fragment>
      <HeadTemplate pageTitle='商品登録ページ' />
      <CommonTemplate>商品登録ページ</CommonTemplate>
    </React.Fragment>
  );
};

export default ProductRegisterPage;
