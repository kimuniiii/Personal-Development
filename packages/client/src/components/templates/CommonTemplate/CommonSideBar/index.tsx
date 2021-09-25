import { useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled';
import Router from 'next/router';

import type { VFC } from 'react';

import { Button } from 'src/components/atoms/Button';
import { Margin } from 'src/components/layouts/Margin';

import { changePassword } from 'src/lib/changePassword';

import { COLOR_PALETTE } from 'src/styles/color_palette';

type CommonSideBarProps = {
  auth0Domain?: string;
  auth0ClientId?: string;
};

export const CommonSideBar: VFC<CommonSideBarProps> = ({ auth0Domain, auth0ClientId }) => {
  const { user } = useAuth0();
  console.log('CommonSideBar');
  console.log('user');
  console.table(user);

  return (
    <StSideBarContainer>
      <Button
        type='button'
        styleTypes='textLink'
        width='auto'
        fontSizeValue='16px'
        padding='8px'
        buttonContent='商品を出品する'
        onClick={(): Promise<boolean> => Router.push('/product/register')}
      />
      <Margin bottom='8px' />
      <Button
        type='button'
        styleTypes='textLink'
        width='auto'
        fontSizeValue='16px'
        padding='8px'
        buttonContent='販売履歴を見る'
        onClick={(): void => alert('販売履歴を見るボタンをクリック')}
      />
      <Margin bottom='8px' />
      <Button
        type='button'
        styleTypes='textLink'
        width='auto'
        fontSizeValue='16px'
        padding='8px'
        buttonContent='プロフィール編集'
        onClick={(): Promise<boolean> => Router.push('/profile-edit')}
      />
      <Margin bottom='8px' />
      <Button
        type='button'
        styleTypes='textLink'
        width='auto'
        fontSizeValue='16px'
        padding='8px'
        buttonContent='パスワード変更'
        onClick={(): Promise<void> => changePassword({ auth0Domain, auth0ClientId, user })}
      />
      <Margin bottom='8px' />
      <Button
        type='button'
        styleTypes='textLink'
        width='auto'
        fontSizeValue='16px'
        padding='8px'
        buttonContent='退会'
        onClick={(): Promise<boolean> => Router.push('/withdraw')}
      />
    </StSideBarContainer>
  );
};

const StSideBarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
  width: 220px;
  padding: 16px;

  button {
    color: ${COLOR_PALETTE.BLACK};
  }
`;
