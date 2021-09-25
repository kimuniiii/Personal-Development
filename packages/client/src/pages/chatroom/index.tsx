import React from 'react';

import type { NextPage } from 'next';

import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

type ChatRoomPageProps = {
  origin: string;
};

const Chatroom: NextPage<ChatRoomPageProps> = ({ origin }) => {
  return (
    <React.Fragment>
      <HeadTemplate
        pageOrigin={origin}
        pageCanonicalUrl='https://www.riot-ec-site.com/chatroom'
        pageTitle='連絡掲示板'
      />
      <CommonTemplate>連絡掲示板</CommonTemplate>
    </React.Fragment>
  );
};

export default Chatroom;
