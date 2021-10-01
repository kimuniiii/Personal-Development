import styled from '@emotion/styled';

import type { VFC } from 'react';

type Props = {
  text: string;
};

export const ErrorTemplate: VFC<Props> = ({ text }) => {
  return <StBase>{text}</StBase>;
};

const StBase = styled.div``;
