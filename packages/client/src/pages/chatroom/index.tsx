import React from 'react';

import { HeadTemplate } from 'src/components/templates/HeadTemplate';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';

const Chatroom = (): JSX.Element => {
  return (
    <React.Fragment>
      <HeadTemplate pageTitle='連絡掲示板' />
      <CommonTemplate>連絡掲示板</CommonTemplate>
    </React.Fragment>
  );
};

export default Chatroom;
