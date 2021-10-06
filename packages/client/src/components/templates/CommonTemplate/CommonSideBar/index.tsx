import { useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled';
import Router from 'next/router';
import { useState, VFC } from 'react';

import { Button } from 'src/components/atoms/Button';
import { Dialog } from 'src/components/atoms/Dialog';
import { SnackBar } from 'src/components/atoms/SnackBar';
import { Margin } from 'src/components/layouts/Margin';

import { changePassword } from 'src/lib/changePassword';

import { COLOR_PALETTE } from 'src/styles/color_palette';

type CommonSideBarProps = {
  auth0Domain?: string;
  auth0ClientId?: string;
};

export const CommonSideBar: VFC<CommonSideBarProps> = ({ auth0Domain, auth0ClientId }) => {
  const CONFIRM_TITLE =
    'ユーザー登録の時にメールアドレスとパスワード経由でログインした場合のみパスワードリセットメールは送信されます。メールアドレス宛にパスワードリセットメールを送信しますか？';

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShowSnackBar, setIsShowSnackBar] = useState(false);
  const [defaultSnackBar, setDefaultSnackBar] = useState(false);

  const { user } = useAuth0();

  console.log('CommonSideBar');
  console.log('user');
  console.table(user);

  const onYesBtnClicked = (): void => {
    setIsDialogOpen(false);

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
  };

  const onNoBtnClicked = (): void => {
    setIsDialogOpen(false);
  };

  /**
   * @概要 パスワード変更ボタンをクリック時に呼び出されるイベントハンドラ
   * @説明 クリックしたら`Dialog Component`を画面に描画する
   */
  const handlePasswordChange = (): void => {
    setIsDialogOpen(true);
  };

  return (
    <StSideBarContainer>
      <Button
        className='product-register-btn'
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
        className='sales-history-btn'
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
        className='profile-edit-btn'
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
        className='password-change-btn'
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
        className='withdraw-btn'
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
      {isDialogOpen ? (
        <Dialog
          dialogTitle={CONFIRM_TITLE}
          isDialogOpen={isDialogOpen}
          onYesBtnClicked={onYesBtnClicked}
          onNoBtnClicked={onNoBtnClicked}
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

  .product-register-btn,
  .sales-history-btn,
  .profile-edit-btn,
  .password-change-btn,
  .withdraw-btn {
    color: ${COLOR_PALETTE.BLACK};
  }
`;
