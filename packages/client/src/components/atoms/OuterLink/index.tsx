import styled from '@emotion/styled';
import React from 'react';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

import type { ValueOf } from 'src/typings/utils/ValueOf';

type OuterLinkProps = JSX.IntrinsicElements['a'] & {
  children: React.ReactNode;
  href: string;
  fontSizeValue?: ValueOf<typeof FONT_SIZE>;
};

export const OuterLink = React.forwardRef<HTMLAnchorElement, OuterLinkProps>(
  ({ children, href, fontSizeValue, ...anchorProps }, ref) => {
    return (
      <StOuterLink {...anchorProps} ref={ref} href={href} fontSizeValue={fontSizeValue}>
        {children}
      </StOuterLink>
    );
  },
);

OuterLink.displayName = 'OuterLink';

const StOuterLink = styled.a<Pick<OuterLinkProps, 'fontSizeValue'>>`
  background-color: ${COLOR_PALETTE.WHITE};
  font-size: ${({ fontSizeValue }): ValueOf<typeof FONT_SIZE> => fontSizeValue ?? FONT_SIZE.FS_14};
  color: ${COLOR_PALETTE.MAIN_COLOR};
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid ${COLOR_PALETTE.MAIN_COLOR};
  }
`;
