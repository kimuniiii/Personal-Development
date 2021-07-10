import React, { VFC } from "react";

type Props = JSX.IntrinsicElements["input"];

export const Button: VFC<Props> = ({ ...inputProps }) => {
  return <input {...inputProps} />;
};
