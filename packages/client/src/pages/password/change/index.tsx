import React from 'react';

import { HeadTemplate } from 'src/components/templates/HeadTemplate';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';

const PasswordChangePage = (): JSX.Element => {
  return (
    <React.Fragment>
      <HeadTemplate pageTitle='パスワード変更ページ' />
      <CommonTemplate>パスワード変更ページ</CommonTemplate>
    </React.Fragment>
  );
};

export default PasswordChangePage;
