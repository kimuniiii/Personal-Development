import React from 'react';

import { HeadTemplate } from 'src/components/templates/HeadTemplate';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';

const ProfileEditPage = (): JSX.Element => {
  return (
    <React.Fragment>
      <HeadTemplate pageTitle='プロフィール編集ページ' />
      <CommonTemplate>プロフィール編集ページ</CommonTemplate>
    </React.Fragment>
  );
};

export default ProfileEditPage;
