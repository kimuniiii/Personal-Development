import styled from '@emotion/styled';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { Margin } from 'src/components/layouts/Margin';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import { validations } from 'src/utils/validate';

/**
 * @概要 パスワード変更ボタンを押したら表示されるページコンポーネント
 * @説明 TODO : Auth0 で認証を行うため使用しない可能性がある
 */
const PasswordChangePage = (): JSX.Element => {
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
      <HeadTemplate
        pageCanonicalUrl='https://www.riot-ec-site.com/password/change'
        pageTitle='パスワード変更ページ'
      />
      <CommonTemplate isSideBar={true}>
        <StPasswordChangeFormContainer onSubmit={handleSubmit(onSubmit)}>
          <h3>パスワード変更</h3>
          <StPasswordChangeContainer>
            <Input
              type='password'
              id='beforePassword'
              name='beforePassword'
              labelText='古いパスワード'
              labelType='requiredMarker'
              placeholder='古いパスワードを入力してください'
              width='343px'
              fontSizeValue='16px'
              isError={!!errors.beforePassword}
              errors={errors}
              register={register('beforePassword', {
                minLength: {
                  value: validations.minPasswordLength,
                  message: 'パスワードは6文字以上で設定してください',
                },
                required: { message: '必須入力項目です！', value: true },
              })}
            />
            <Input
              type='password'
              id='afterPassword'
              name='afterPassword'
              labelText='新しいパスワード'
              labelType='requiredMarker'
              placeholder='新しいパスワードを入力してください'
              width='343px'
              fontSizeValue='16px'
              isError={!!errors.afterPassword}
              errors={errors}
              register={register('afterPassword', {
                minLength: {
                  value: validations.minPasswordLength,
                  message: 'パスワードは6文字以上で設定してください',
                },
                required: { message: '必須入力項目です！', value: true },
              })}
            />
            <Input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              labelText='新しいパスワード（再入力）'
              labelType='requiredMarker'
              placeholder='新しいパスワードを再入力してください'
              width='343px'
              fontSizeValue='16px'
              isError={!!errors.confirmPassword}
              errors={errors}
              register={register('confirmPassword', {
                minLength: {
                  value: validations.minPasswordLength,
                  message: 'パスワードは6文字以上で設定してください',
                },
                required: { message: '必須入力項目です！', value: true },
              })}
            />
            <Margin bottom='16px' />
            <Button
              type='submit'
              styleTypes='tertiary'
              width='100%'
              fontSizeValue='16px'
              buttonContent='変更する'
              disabled={!isValid}
              onClick={(): void => alert('変更するボタンをクリック')}
            />
          </StPasswordChangeContainer>
        </StPasswordChangeFormContainer>
      </CommonTemplate>
    </React.Fragment>
  );
};

export default PasswordChangePage;

const StPasswordChangeFormContainer = styled.form`
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

const StPasswordChangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 375px;
  height: auto;
  padding: 16px;
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
`;
