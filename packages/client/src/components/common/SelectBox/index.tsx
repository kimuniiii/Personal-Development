import React, { VFC } from 'react';

type Props = JSX.IntrinsicElements['select'];

export const SelectBox: VFC<Props> = ({ ...selectProps }) => {
  return (
    <select {...selectProps}>
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </select>
  );
};
