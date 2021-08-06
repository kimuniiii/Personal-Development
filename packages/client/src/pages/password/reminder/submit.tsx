import React from 'react';

import { HeadTemplate } from 'src/components/templates/HeadTemplate';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';

const PasswordReminderSubmitPage = (): JSX.Element => {
  return (
    <React.Fragment>
      <HeadTemplate pageTitle='パスワードリマインダー送信ページ' />
      <CommonTemplate>パスワードリマインダー送信ページ</CommonTemplate>
    </React.Fragment>
  );
};

export default PasswordReminderSubmitPage;
