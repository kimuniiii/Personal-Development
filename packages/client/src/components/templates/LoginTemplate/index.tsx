import styled from '@emotion/styled';
// eslint-disable-next-line
// @ts-ignore
import React, { VFC } from 'react';

type Props = {
  text: string;
};

/**
 * @概要 ログインボタンを押したら表示されるコンポーネント
 */
export const LoginTemplate: VFC<Props> = ({ text }) => {
  return <StBase>{text}</StBase>;
};

const StBase = styled.div``;
