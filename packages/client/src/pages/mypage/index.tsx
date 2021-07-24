import React from 'react';

import { HeadTemplate } from 'src/components/templates/HeadTemplate';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';

const MyPage = (): JSX.Element => {
  return (
    <React.Fragment>
      <HeadTemplate pageTitle='マイページ' />
      <CommonTemplate>マイページ</CommonTemplate>
    </React.Fragment>
  );
};

export default MyPage;
