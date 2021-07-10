import React, { VFC } from "react";

type Props = JSX.IntrinsicElements["input"];

export const Input: VFC<Props> = ({ ...inputProps }) => {
  return <input {...inputProps} />;
};
