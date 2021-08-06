import type { VFC } from 'react';

type Props = JSX.IntrinsicElements['textarea'];

export const Textarea: VFC<Props> = ({ ...textareaProps }) => {
  return <textarea {...textareaProps}></textarea>;
};
