import styled from '@emotion/styled';

import type { VFC } from 'react';

type ButtonProps = JSX.IntrinsicElements['button'] & {
  buttonContent: string;
  width: `${number}px` | `${number}%` | `${number}vw`;
};

export const Button: VFC<ButtonProps> = ({ buttonContent, width, ...buttonProps }) => {
  return (
    <StButton width={width} {...buttonProps}>
      {buttonContent}
    </StButton>
  );
};

const StButton = styled.button<Pick<ButtonProps, 'width'>>`
  color: red;
  width: ${({ width }) => width};
`;
