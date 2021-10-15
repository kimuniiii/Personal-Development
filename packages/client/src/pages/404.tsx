import styled from '@emotion/styled';
import React from 'react';

import { OuterLink } from 'src/components/atoms/OuterLink';
import { Margin } from 'src/components/layouts/Margin';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { FONT_SIZE } from 'src/styles/font_size';

import type { NextPage } from 'next';

const Custom404Page: NextPage = () => {
  return (
    <React.Fragment>
      <HeadTemplate pageTitle='Not Found Page' />
      <StNotFoundContainer>
        <StNotFoundTitle>404</StNotFoundTitle>
        <StNotFoundMessage>We could not find that page</StNotFoundMessage>
        <Margin bottom='16px' />
        <OuterLink href='/' fontSizeValue={FONT_SIZE.FS_24}>
          go back to home page
        </OuterLink>
      </StNotFoundContainer>
    </React.Fragment>
  );
};

export default Custom404Page;

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
