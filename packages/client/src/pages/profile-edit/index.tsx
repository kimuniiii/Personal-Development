import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { Margin } from 'src/components/layouts/Margin';
import { ProfileImageUpload } from 'src/components/organisms/ProfileImageUpload';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import { validations } from 'src/utils/validate';

/**
 * @概要 マイページのプロフィール編集ボタンを押したら表示されるページコンポーネント
 */
const ProfileEditPage = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  /**
   * @概要 送信ボタンを押した時に呼び出されるイベントハンドラ
   */
  const onSubmit = (data: Record<string, unknown>): void => {
    console.log(data);
  };

  const [imageUrl, setImageUrl] = useState<string>('');
  const [isFileTypeError, setIsFileTypeError] = useState(false);

  /**
   * @概要 全てのエラーを一度リセットするため関数
   */
  const resetErrors = (): void => {
    setIsFileTypeError(false);
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files === null || event.target.files.length === 0) {
      return;
    }

    resetErrors();

    if (
      !['image/gif', 'image/jpeg', 'image/png', 'image/bmp', 'image/svg+xml'].includes(
        event.target.files[0].type,
      )
    ) {
      setIsFileTypeError(true);
      return;
    }

    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImageUrl(imageUrl);
    // onChangeは連続で同じファイルを選択すると発火しない問題の対応のため
    event.target.value = '';
  };

  const deleteProfileImg = (): void => {
    if (confirm('選択した画像を削除してもよろしいですか？')) {
      setImageUrl('');
    }
  };

  return (
    <React.Fragment>
      <HeadTemplate
        pageCanonicalUrl='https://www.riot-ec-site.com/profile-edit'
        pageTitle='プロフィール編集ページ'
      />
      <CommonTemplate isSideBar={true}>
        <StProfileEditFormContainer onSubmit={handleSubmit(onSubmit)}>
          <h3>プロフィール編集</h3>
          <StProfileEditContainer>
            <Input
              type='text'
              id='first-name'
              width='343px'
              fontSizeValue='16px'
              placeholder='例: タナカ'
              labelText='姓（カナ）'
              isError={!!errors.firstName}
              errors={errors}
              name='firstName'
              register={register('firstName', {
                pattern: {
                  message: 'カタカナで入力してください！',
                  value: validations.firstName,
                },
                required: { message: '必須入力項目です！', value: true },
              })}
            />
            <Margin bottom='16px' />
            <Input
              type='text'
              id='last-name'
              width='343px'
              fontSizeValue='16px'
              placeholder='例: タロウ'
              labelText='名（カナ）'
              isError={!!errors.lastName}
              errors={errors}
              name='lastName'
              register={register('lastName', {
                pattern: {
                  message: 'カタカナで入力してください！',
                  value: validations.lastName,
                },
                required: { message: '必須入力項目です！', value: true },
              })}
            />
            <Margin bottom='16px' />
            <Input
              type='tel'
              id='phone-number'
              name='phoneNumber'
              labelText='TEL'
              placeholder='例: 03-1234-5678'
              width='343px'
              fontSizeValue='16px'
              isError={!!errors.phoneNumber}
              errors={errors}
              register={register('phoneNumber', {
                pattern: {
                  message: '電話番号の書き方が間違ってます！',
                  value: validations.telephone,
                },
                required: { message: '必須入力項目です！', value: true },
              })}
            />
            <Margin bottom='16px' />
            <Input
              type='text'
              id='postcode'
              name='postCode'
              labelText='郵便番号'
              placeholder='例: 1516608'
              isError={!!errors.postCode}
              errors={errors}
              width='343px'
              fontSizeValue='16px'
              register={register('postCode', {
                pattern: {
                  message: '郵便番号の書き方が間違ってます！',
                  value: validations.postcode,
                },
                required: { message: '必須入力項目です！', value: true },
              })}
            />
            <Margin bottom='16px' />
            <Input
              type='text'
              id='address'
              name='address'
              labelText='住所'
              placeholder='例: 東京都調布市下石原3-9-12'
              isError={!!errors.address}
              errors={errors}
              width='343px'
              fontSizeValue='16px'
              register={register('address', {
                required: { message: '必須入力項目です！', value: true },
              })}
            />
            <Margin bottom='16px' />
            <Input
              type='number'
              id='ageNumber'
              name='ageNumber'
              labelText='年齢'
              placeholder='例: 25'
              width='343px'
              fontSizeValue='16px'
              isError={!!errors.ageNumber}
              errors={errors}
              register={register('ageNumber', {
                pattern: {
                  message: '年齢の書き方が間違ってます！',
                  value: validations.ageNumber,
                },
                required: { message: '必須入力項目です！', value: true },
              })}
            />
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
            <ProfileImageUpload
              labelText='プロフィール画像'
              imageUrl={imageUrl}
              isFileTypeError={isFileTypeError}
              onClick={deleteProfileImg}
              onChange={onFileInputChange}
            />
            <Margin bottom='24px' />
            <Button
              type='submit'
              styleTypes='tertiary'
              width='100%'
              fontSizeValue='16px'
              buttonContent='プロフィールを変更する'
              disabled={!isValid}
              onClick={(): void => alert('変更するボタンをクリック')}
            />
          </StProfileEditContainer>
        </StProfileEditFormContainer>
      </CommonTemplate>
    </React.Fragment>
  );
};

export default ProfileEditPage;

const StProfileEditFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*
  ** CommonHeaderのheight : 48px
  ** CommonFooterのheight : 56px
  */
  min-height: calc(100vh - (48px + 56px));
  padding: 8px;
`;

const StProfileEditContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Safari 非対応のため */
  /* gap: 16px; */
  width: 375px;
  padding: 16px;
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
`;
