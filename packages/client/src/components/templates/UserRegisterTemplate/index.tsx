import styled from '@emotion/styled';
// eslint-disable-next-line
// @ts-ignore
import React, { VFC } from 'react';

type Props = {
  text: string;
};

/**
 * @概要 ユーザー登録ボタンを押したら表示されるコンポーネント
 */
export const UserRegisterTemplate: VFC<Props> = ({ text }) => {
  return <StBase>{text}</StBase>;
};

const StBase = styled.div``;
