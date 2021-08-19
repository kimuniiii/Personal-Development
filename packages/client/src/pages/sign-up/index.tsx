import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { Margin } from 'src/components/layouts/Margin';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { COLOR_PALETTE } from 'src/styles/color_palette';

/**
 * @概要 ユーザー登録ボタンを押したら表示されるページコンポーネント
 */
const SignUpFormPage = (): JSX.Element => {
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
  const onSubmit = (data: unknown): void => {
    console.log(data);
  };

  return (
    <>
      <HeadTemplate pageTitle='ユーザー登録ページ' />
      <CommonTemplate>
        <StUserRegisterFormContainer onSubmit={handleSubmit(onSubmit)}>
          <h3>ユーザ登録</h3>
          <StUserRegisterContainer>
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
                  value: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
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
                required: { message: '必須入力項目です！', value: true },
              })}
            />
            <Input
              type='password'
              id='re-password'
              name='re-password'
              labelText='パスワード(再入力)'
              placeholder='パスワードを再入力してください'
              width='343px'
              fontSizeValue='16px'
              isError={!!errors.password}
              errors={errors}
              register={register('re-password', {
                required: { message: '必須入力項目です！', value: true },
              })}
            />
            <Margin bottom='16px' />
            <Button
              type='submit'
              styleTypes='tertiary'
              width='200px'
              fontSizeValue='16px'
              buttonContent='登録する'
              disabled={!isValid}
              onClick={(): void => alert('登録するボタンをクリック')}
            />
          </StUserRegisterContainer>
        </StUserRegisterFormContainer>
      </CommonTemplate>
    </>
  );
};

export default SignUpFormPage;

const StUserRegisterFormContainer = styled.form`
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

const StUserRegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 375px;
  height: auto;
  padding: 16px;
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
`;
