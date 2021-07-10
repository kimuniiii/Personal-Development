import React, { VFC } from "react";

type Props = JSX.IntrinsicElements["textarea"];

export const SelectBox: VFC<Props> = ({ ...textareaProps }) => {
  return <textarea {...textareaProps}></textarea>;
};
