import { useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled';
import Router from 'next/router';
import { useState, VFC } from 'react';

import { Button } from 'src/components/atoms/Button';
import { SnackBar } from 'src/components/atoms/SnackBar';
import { Margin } from 'src/components/layouts/Margin';

import { changePassword } from 'src/lib/changePassword';

import { COLOR_PALETTE } from 'src/styles/color_palette';

type CommonSideBarProps = {
  auth0Domain?: string;
  auth0ClientId?: string;
};

export const CommonSideBar: VFC<CommonSideBarProps> = ({ auth0Domain, auth0ClientId }) => {
  const CONFIRM_MESSAGE =
    'ユーザー登録の時にメールアドレス・パスワードを設定した場合のみ有効になります。パスワードリセットメールを送信しますか？';

  const [isShowSnackBar, setIsShowSnackBar] = useState(false);
  const [defaultSnackBar, setDefaultSnackBar] = useState(false);

  const { user } = useAuth0();

  console.log('CommonSideBar');
  console.log('user');
  console.table(user);

  /**
   * @概要 パスワード変更ボタンをクリック時に呼び出されるイベントハンドラ
   * @説明 指定のメールアドレスにパスワードリセットを要求するメールを送信する
   */
  const handlePasswordChange = (): void => {
    if (window.confirm(CONFIRM_MESSAGE)) {
      changePassword({ auth0Domain, auth0ClientId, user }).then((res) => {
        console.log('then');
        console.log(res);

        if (res.ok) {
          // 成功時には`Success SnackBar`を表示する
          setIsShowSnackBar(true);
          setDefaultSnackBar(true);
        } else {
          // 失敗時には`Failed SnackBar`を表示する
          setIsShowSnackBar(true);
          setDefaultSnackBar(false);
        }
      });
    }
  };

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
        onClick={handlePasswordChange}
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
      {isShowSnackBar && defaultSnackBar ? (
        <SnackBar
          snackBarTypes='success'
          message='パスワードリセットメールの送信に成功しました'
          isShowSnackBar={isShowSnackBar}
          setIsShowSnackBar={setIsShowSnackBar}
        />
      ) : isShowSnackBar && !defaultSnackBar ? (
        <SnackBar
          snackBarTypes='fail'
          message='パスワードリセットメールの送信に失敗しました'
          isShowSnackBar={isShowSnackBar}
          setIsShowSnackBar={setIsShowSnackBar}
        />
      ) : null}
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
