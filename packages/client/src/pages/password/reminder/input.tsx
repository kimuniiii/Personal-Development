import styled from '@emotion/styled';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { Margin } from 'src/components/layouts/Margin';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

const PasswordReminderInputPage = (): JSX.Element => {
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
      <HeadTemplate pageTitle='パスワードリマインダー入力ページ' />
      <CommonTemplate>
        <StPasswordReminderInputFormContainer onSubmit={handleSubmit(onSubmit)}>
          <StPasswordReminderInputContainer>
            <StTitle>
              ご指定のメールアドレス宛にお送りした
              <br />
              【パスワード再発行認証】
              <br />
              メール内にある「認証キー」をご入力ください
            </StTitle>
            <Margin bottom='16px' />
            <Input
              type='text'
              id='authKey'
              name='authKey'
              labelText='認証キー'
              placeholder='認証キーを入力してください'
              width='343px'
              fontSizeValue='16px'
              isError={!!errors.authKey}
              errors={errors}
              register={register('authKey', {
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
                buttonContent='パスワード再発行メールを送信'
                onClick={(): void => alert('パスワード再発行メールを送信ボタンをクリック')}
              />
              <Button
                type='submit'
                styleTypes='tertiary'
                width='auto'
                fontSizeValue='16px'
                buttonContent='再発行する'
                disabled={!isValid}
                onClick={(): void => alert('再発行するボタンをクリック')}
              />
            </StButtonContainer>
          </StPasswordReminderInputContainer>
        </StPasswordReminderInputFormContainer>
      </CommonTemplate>
    </React.Fragment>
  );
};

export default PasswordReminderInputPage;

const StPasswordReminderInputFormContainer = styled.form`
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

const StPasswordReminderInputContainer = styled.div`
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
