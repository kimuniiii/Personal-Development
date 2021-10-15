import styled from '@emotion/styled';
import React from 'react';

import { OuterLink } from 'src/components/atoms/OuterLink';
import { Margin } from 'src/components/layouts/Margin';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { FONT_SIZE } from 'src/styles/font_size';

import type { NextPage, NextPageContext } from 'next';

type Props = {
  title: string;
  errorCode: number;
};

/**
 * @概要 本番環境でのみ使用される`Error Page Component`
 */
const ErrorPage: NextPage<Props> = ({ title, errorCode }) => {
  console.log('Error Page Title', title);
  console.log('Error Page statusCode', errorCode);

  return (
    <React.Fragment>
      <HeadTemplate pageTitle={title} />
      <StNotFoundContainer>
        <StNotFoundTitle>{errorCode}</StNotFoundTitle>
        <StNotFoundMessage>We could not find that page</StNotFoundMessage>
        <Margin bottom='16px' />
        <OuterLink href='/' fontSizeValue={FONT_SIZE.FS_24}>
          Go back to home page
        </OuterLink>
      </StNotFoundContainer>
    </React.Fragment>
  );
};

// resが存在する時は`SSR`・resがない場合は`CSR`
// statusCode には`400`・`404`・`405`・`500`が入る
// 参考文献 : https://github.com/vercel/next.js/blob/32ec4f691393038e69cd3f2e59c462879b83078d/packages/next/pages/_error.tsx#L5..L10
ErrorPage.getInitialProps = async ({ res, err }: NextPageContext): Promise<Props> => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;

  return {
    title: `${statusCode} Error Page`,
    errorCode: statusCode,
  };
};

export default ErrorPage;

const StNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StNotFoundTitle = styled.h1`
  font-size: 100px;
`;

const StNotFoundMessage = styled.p`
  font-size: ${FONT_SIZE.FS_32};
`;
