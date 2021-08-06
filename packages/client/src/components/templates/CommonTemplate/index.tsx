import styled from '@emotion/styled';

import type { ReactNode, VFC } from 'react';

import { CommonFooter } from 'src/components/templates/CommonTemplate/CommonFooter';
import { CommonHeader } from 'src/components/templates/CommonTemplate/CommonHeader';

type CommonTemplateProps = {
  children: ReactNode;
};

export const CommonTemplate: VFC<CommonTemplateProps> = ({ children }) => {
  return (
    <StCommonRoot>
      <CommonHeader />
      <main>{children}</main>
      <CommonFooter />
    </StCommonRoot>
  );
};

const StCommonRoot = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    /*
    ** Flexアイテムを拡張して利用可能なスペースを埋めるために記載
    */
    flex: 1;
  }
`;
