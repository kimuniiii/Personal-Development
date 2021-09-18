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

type UseFormInputs = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  postCode: string;
  address: string;
  ageNumber: string;
  email: string;
};

/**
 * @概要 マイページのプロフィール編集ボタンを押したら表示されるページコンポーネント
 */
const ProfileEditPage = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UseFormInputs>({
    // 最初に送信ボタンを押す前に、バリデーションが実行されるタイミング
    mode: 'onSubmit',
    // 送信ボタン押した以降に、バリデーションを実行するタイミング、onChangeの場合は、入力の度にバリデーションが走る
    reValidateMode: 'onChange',
    // 初回レンダリング時のフォームのデフォルト値
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      postCode: '',
      address: '',
      ageNumber: '',
      email: '',
    },
  });

  // プロフィール編集画像に関する「状態変数」と「更新関数」と「イベントハンドラ」
  const [selectedFile, setSelectedFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>('');

  /**
   * @概要 送信ボタンを押した時に呼び出されるイベントハンドラ
   */
  const onSubmit = async (data: UseFormInputs): Promise<void> => {
    console.log('selectedFile', selectedFile);
    console.log(data);
    console.log({ ...data, profileImage: selectedFile });

    // TODO : フォームデータを作成
    // TODO : 値を実際にサーバーに送信するときにちゃんと実装を行う
    // const formData = new FormData();
    // formData.append('email', email);
    // formData.append('ageNumber', ageNumber);
    // formData.append('address', address);
    // formData.append('postCode', postCode);
    // formData.append('phoneNumber', phoneNumber);
    // profileImage というフィールド名でファイルを追加
    // formData.append('profileImage', imageFile as Blob, imageFile?.name);
  };

  const onFileSelect = (selectedFile: File): void => {
    setSelectedFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
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
                  message: 'カタカナで入力してください',
                  value: validations.firstName,
                },
                required: { message: '必須入力項目です', value: true },
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
                  message: 'カタカナで入力してください',
                  value: validations.lastName,
                },
                required: { message: '必須入力項目です', value: true },
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
                  message: '電話番号の書き方が間違ってます',
                  value: validations.telephone,
                },
                required: { message: '必須入力項目です', value: true },
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
                  message: '郵便番号の書き方が間違ってます',
                  value: validations.postcode,
                },
                required: { message: '必須入力項目です', value: true },
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
                required: { message: '必須入力項目です', value: true },
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
                  message: '年齢の書き方が間違ってます',
                  value: validations.ageNumber,
                },
                required: { message: '必須入力項目です', value: true },
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
                  message: 'メールアドレスの書き方が間違ってます',
                  value: validations.email,
                },
                required: { message: '必須入力項目です', value: true },
              })}
            />
            <Margin bottom='16px' />
            <ProfileImageUpload
              labelText='プロフィール画像'
              name='profileImage'
              imageUrl={imageUrl}
              onClick={deleteProfileImg}
              onFileSelect={onFileSelect}
            />
            <Margin bottom='24px' />
            <Button
              type='submit'
              styleTypes='tertiary'
              width='100%'
              fontSizeValue='16px'
              buttonContent='プロフィールを変更する'
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
