import React, { VFC } from 'react';

type Props = JSX.IntrinsicElements['button'] & {
  buttonContent: string;
};

export const Button: VFC<Props> = ({ buttonContent, ...buttonProps }) => {
  return <button {...buttonProps}>{buttonContent}</button>;
};
