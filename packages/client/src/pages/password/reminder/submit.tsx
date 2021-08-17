import { useForm } from 'react-hook-form';
import React from 'react';
import Router from 'next/router';
import styled from '@emotion/styled';

import { Button } from 'src/components/atoms/Button';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';
import { Input } from 'src/components/atoms/Input';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

import { validations } from 'src/utils/validate';

const PasswordReminderSubmitPage = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  /**
   * 送信ボタンを押した時に呼び出されるイベントハンドラ
   */
  const onSubmit = (data: Record<string, unknown>): void => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <HeadTemplate pageTitle='パスワードリマインダー送信ページ' />
      <CommonTemplate>
        <StPasswordReminderChangeFormContainer onSubmit={handleSubmit(onSubmit)}>
          <StPasswordReminderChangeContainer>
            <StTitle>
              ご指定のメールアドレス宛にパスワード再発行用のURLと認証キーをお送り致します。
            </StTitle>
            <Margin bottom='16px' />
            <Input
              type='email'
              id='email'
              name='email'
              labelText='Email'
              placeholder='メールアドレスを入力してください'
              width='343px'
              fontSizeValue='16px'
              isError={!!errors.email}
              errors={errors}
              register={register('email', {
                pattern: {
                  message: 'メールアドレスの書き方が間違ってます！',
                  value: validations.email,
                },
                required: { message: '必須入力項目です！', value: true },
              })}
            />
            <Margin bottom='16px' />
            <StButtonContainer>
              <Button
                type='button'
                styleTypes='textLink'
                width='auto'
                fontSizeValue='16px'
                padding='0'
                buttonContent='マイページに戻る'
                onClick={(): Promise<boolean> => Router.push('/my-page')}
              />
              <Button
                type='submit'
                styleTypes='tertiary'
                width='auto'
                fontSizeValue='16px'
                buttonContent='発行する'
                disabled={!isValid}
                onClick={(): void => alert('発行するボタンをクリック')}
              />
            </StButtonContainer>
          </StPasswordReminderChangeContainer>
        </StPasswordReminderChangeFormContainer>
      </CommonTemplate>
    </React.Fragment>
  );
};

export default PasswordReminderSubmitPage;

const StPasswordReminderChangeFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*
  ** CommonHeaderのheight : 48px
  ** CommonFooterのheight : 56px
  */
  min-height: calc(100vh - (48px + 56px));
`;

const StPasswordReminderChangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 375px;
  padding: 16px;
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
`;

const StTitle = styled.h3`
  font-size: ${FONT_SIZE.FS_16};
  text-align: center;
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 375px;
  padding: 0 16px;
`;
