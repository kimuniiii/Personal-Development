import React from 'react';

import { HeadTemplate } from 'src/components/templates/HeadTemplate';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';

const PasswordReminderInputPage = (): JSX.Element => {
  return (
    <React.Fragment>
      <HeadTemplate pageTitle='パスワードリマインダー入力ページ' />
      <CommonTemplate>パスワードリマインダー入力ページ</CommonTemplate>
    </React.Fragment>
  );
};

export default PasswordReminderInputPage;
