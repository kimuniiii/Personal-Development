import styled from '@emotion/styled';
// eslint-disable-next-line
// @ts-ignore
import React, { VFC } from 'react';

type Props = {
  text: string;
};

export const ProduceCard: VFC<Props> = ({ text }) => {
  return <StBase>{text}</StBase>;
};

const StBase = styled.div``;
