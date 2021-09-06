import styled from '@emotion/styled';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from 'src/components/atoms/Button';
import { Checkbox } from 'src/components/atoms/Checkbox';
import { Input } from 'src/components/atoms/Input';
import { Margin } from 'src/components/layouts/Margin';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import { validations } from 'src/utils/validate';

/**
 * @概要 ログインボタンを押したら表示されるページコンポーネント
 * @説明 TODO : Auth0 で認証を行うため使用しない可能性がある
 */
const LoginFormPage = (): JSX.Element => {
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
    if (data.checkbox === undefined) {
      data.checkbox = 'off';
    }

    console.log(data.checkbox);
    console.log(data);
  };

  return (
    <React.Fragment>
      <HeadTemplate
        pageCanonicalUrl='https://www.riot-ec-site.com/login'
        pageTitle='ログインページ'
      />
      <CommonTemplate>
        <StLoginFormContainer onSubmit={handleSubmit(onSubmit)}>
          <h3>ログイン</h3>
          <StLoginContainer>
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
            <Input
              type='password'
              id='password'
              name='password'
              labelText='パスワード'
              placeholder='パスワードを入力してください'
              width='343px'
              fontSizeValue='16px'
              isError={!!errors.password}
              errors={errors}
              register={register('password', {
                minLength: {
                  value: validations.minPasswordLength,
                  message: 'パスワードは6文字以上で設定してください',
                },
                required: { message: '必須入力項目です！', value: true },
              })}
            />
            <Checkbox register={register('checkbox')} labelText='次回ログインを省略する' />
            <Margin bottom='16px' />
            <StButtonContainer>
              <Button
                type='button'
                styleTypes='textLink'
                width='auto'
                fontSizeValue='16px'
                padding='0'
                buttonContent='パスワードを忘れた方はこちら'
                onClick={(): void => alert('パスワードを忘れた方はこちらボタンをクリック')}
              />
              <Button
                type='submit'
                styleTypes='tertiary'
                width='auto'
                fontSizeValue='16px'
                buttonContent='ログイン'
                disabled={!isValid}
                onClick={(): void => alert('ログインボタンをクリック')}
              />
            </StButtonContainer>
          </StLoginContainer>
        </StLoginFormContainer>
      </CommonTemplate>
    </React.Fragment>
  );
};

export default LoginFormPage;

const StLoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*
  ** CommonHeaderのheight : 48px
  ** CommonFooterのheight : 56px
  */
  min-height: calc(100vh - (48px + 56px));
  padding: 16px;
`;

const StLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 375px;
  height: auto;
  padding: 16px;
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 375px;
  padding: 0 16px;
`;
