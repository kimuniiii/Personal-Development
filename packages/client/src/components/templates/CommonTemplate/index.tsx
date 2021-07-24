import type { ReactNode, VFC } from 'react';

import { CommonFooter } from 'src/components/templates/CommonTemplate/CommonFooter';
import { CommonHeader } from 'src/components/templates/CommonTemplate/CommonHeader';

type CommonTemplateProps = {
  children: ReactNode;
};

export const CommonTemplate: VFC<CommonTemplateProps> = ({ children }) => {
  return (
    <div>
      <CommonHeader />
      <main>{children}</main>
      <CommonFooter />
    </div>
  );
};
