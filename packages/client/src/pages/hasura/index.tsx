import { NextPage } from 'next';
import React from 'react';

import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

const Hasura: NextPage = () => {
  return (
    <React.Fragment>
      <HeadTemplate pageTitle='Next.js + Hasura' />
      <CommonTemplate>Next.js + Apollo + Hasura</CommonTemplate>
    </React.Fragment>
  );
};

export default Hasura;
