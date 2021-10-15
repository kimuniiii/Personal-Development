import styled from '@emotion/styled';

import { FONT_SIZE } from 'src/styles/font_size';

import type { VFC } from 'react';
import type { ValueOf } from 'typings/utils/ValueOf';

type TransitionBaseModalProps = {
  mainContent: string | JSX.Element;
  closeButtonComponent: JSX.Element;
  modalTitle?: string;
  headerPadding?: string;
  headerFontSize?: ValueOf<typeof FONT_SIZE>;
};

export const TransitionBaseModal: VFC<TransitionBaseModalProps> = ({
  mainContent,
  closeButtonComponent,
  modalTitle,
  headerPadding,
  headerFontSize,
}) => {
  return (
    <StRootContainer>
      <StModalTitleWrapper headerPadding={headerPadding}>
        <StModalTitle headerFontSize={headerFontSize}>{modalTitle}</StModalTitle>
        {closeButtonComponent}
      </StModalTitleWrapper>
      <main>{mainContent}</main>
    </StRootContainer>
  );
};

const StRootContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StModalTitleWrapper = styled.section<Pick<TransitionBaseModalProps, 'headerPadding'>>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ headerPadding }): string | null =>
    headerPadding !== undefined ? headerPadding : null};
`;

const StModalTitle = styled.h2<Pick<TransitionBaseModalProps, 'headerFontSize'>>`
  font-size: ${({ headerFontSize }): ValueOf<typeof FONT_SIZE> =>
    headerFontSize ?? FONT_SIZE.FS_24};
`;
