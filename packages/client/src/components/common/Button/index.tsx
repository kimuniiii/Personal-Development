import React, { VFC } from "react";

type Props = {
  buttonContent: string;
};

export const Button: VFC<Props> = ({ buttonContent }) => {
  return <button>{buttonContent}</button>;
};
