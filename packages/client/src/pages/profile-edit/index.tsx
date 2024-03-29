import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import styled from '@emotion/styled';
import Router from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/order
import Parser from 'ua-parser-js';

import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { Loader } from 'src/components/atoms/Loader';
import { Margin } from 'src/components/layouts/Margin';
import { ProfileImageUpload } from 'src/components/organisms/ProfileImageUpload';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import { validations } from 'src/utils/validate';

import type { NextPage, GetServerSideProps } from 'next';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

type UseFormInputs = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  postCode: string;
  address: string;
  ageNumber: string;
  email: string;
};

type ProfileEditProps = {
  isMobileUaDeviceType: boolean;
  origin: string;
};

/**
 * @概要 マイページのプロフィール編集ボタンを押したら表示されるページコンポーネント
 * @説明 非ログイン時にアクセスできないようにしたいため「Protected Page」である
 */
const ProfileEditPage: NextPage<ProfileEditProps> = ({ isMobileUaDeviceType, origin }) => {
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

  const { user } = useAuth0();

  // プロフィール編集画像に関する「状態変数」と「更新関数」と「イベントハンドラ」
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageBase64, setImageBase64] = useState<string | ArrayBuffer | null>('');

  // FIXME : 以下のコードで「アクセスコントロール」を行うとうまくいかない
  // const { isAuthenticated, loginWithRedirect } = useAuth0();
  // ログインしていなかったら「ログインページ」へ転送する
  // ログイン画面に転送完了するまでは「画面中央」に「Loader」を表示する
  // if (!isAuthenticated) {
  //   loginWithRedirect();
  //   return (
  //     <StCenterLoaderContainer>
  //       <Loader loadingContent='ログインページに画面遷移しています' />
  //     </StCenterLoaderContainer>
  //   );
  // }

  /**
   * @概要 バリデーション成功時に呼び出されるイベントハンドラ
   */
  const handleOnSubmit: SubmitHandler<UseFormInputs> = async (values) => {
    // console.log('selectedFile');
    // console.table(selectedFile);
    // console.log('values');
    // console.table(values);
    // console.log('{ ...values, profileImage: selectedFile }');
    // console.table({ ...values, profileImage: selectedFile });
    // console.log('imageBase64', imageBase64);

    fetch(`/api/update/${user?.sub}/${values['firstName']}${values['lastName']}`, {
      method: 'PUT',
      body: JSON.stringify(imageBase64),
    })
      .then((res) => {
        if (res.ok) {
          // console.log('res.ok');
          Router.replace('/my-page');
        } else {
          // eslint-disable-next-line no-console
          console.error('response failed');
        }
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));

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

  /**
   * @概要 バリデーション失敗時に呼び出されるイベントハンドラ
   */
  const handleOnError: SubmitErrorHandler<UseFormInputs> = (errors) => {
    // eslint-disable-next-line no-console
    console.error(errors);
  };

  /**
   * @概要 子供のコンポーネントで呼び出すイベントハンドラ
   */
  const onFileSelect = (selectedFile: File): void => {
    setImageUrl(URL.createObjectURL(selectedFile));

    // 送信ボタンを押した時ではなくファイルを選択した時にBase64形式に変換する
    const reader = new FileReader();

    reader.readAsDataURL(selectedFile);

    reader.addEventListener(
      'load',
      () => {
        // console.log('addEventListenerの中身');
        // console.log('ここには「Base64」で変換された文字列を格納できる');
        // console.log('reader.result', reader.result);
        setImageBase64(reader.result);
      },
      false,
    );
  };

  // TODO : 画面上で画像は消えているけどデータ上は削除できていない
  const deleteProfileImg = (): void => {
    if (confirm('選択した画像を削除してもよろしいですか？')) {
      setImageUrl('');
    }
  };

  return (
    <React.Fragment>
      <HeadTemplate
        pageOrigin={origin}
        pageCanonicalUrl='https://www.riot-ec-site.com/profile-edit'
        pageTitle='プロフィール編集ページ'
      />
      {isMobileUaDeviceType ? (
        <CommonTemplate isMobileUaDeviceType={isMobileUaDeviceType}>
          <StProfileEditFormContainer onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
            <h3>プロフィール編集</h3>
            <StProfileEditContainer>
              <Input
                type='text'
                id='first-name'
                width='343px'
                fontSizeValue='16px'
                placeholder='例: タナカ'
                labelText='姓（カナ）'
                labelType='requiredMarker'
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
                labelType='requiredMarker'
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
                labelType='requiredMarker'
                placeholder='例: 03-1234-5678'
                width='343px'
                fontSizeValue='16px'
                disabled={true}
                isError={!!errors.phoneNumber}
                errors={errors}
                register={register('phoneNumber')}
                // register={register('phoneNumber', {
                //   pattern: {
                //     message: '電話番号の書き方が間違ってます',
                //     value: validations.telephone,
                //   },
                //   required: { message: '必須入力項目です', value: true },
                // })}
              />
              <Margin bottom='16px' />
              <Input
                type='text'
                id='postcode'
                name='postCode'
                labelText='郵便番号'
                labelType='requiredMarker'
                placeholder='例: 1516608'
                isError={!!errors.postCode}
                errors={errors}
                width='343px'
                fontSizeValue='16px'
                disabled={true}
                register={register('postCode')}
                // register={register('postCode', {
                //   pattern: {
                //     message: '郵便番号の書き方が間違ってます',
                //     value: validations.postcode,
                //   },
                //   required: { message: '必須入力項目です', value: true },
                // })}
              />
              <Margin bottom='16px' />
              <Input
                type='text'
                id='address'
                name='address'
                labelText='住所'
                labelType='requiredMarker'
                placeholder='例: 東京都調布市下石原3-9-12'
                isError={!!errors.address}
                errors={errors}
                width='343px'
                fontSizeValue='16px'
                disabled={true}
                register={register('address')}
                // register={register('address', {
                //   required: { message: '必須入力項目です', value: true },
                // })}
              />
              <Margin bottom='16px' />
              <Input
                type='number'
                id='ageNumber'
                name='ageNumber'
                labelText='年齢'
                labelType='requiredMarker'
                placeholder='例: 25'
                width='343px'
                fontSizeValue='16px'
                disabled={true}
                isError={!!errors.ageNumber}
                errors={errors}
                register={register('ageNumber')}
                // register={register('ageNumber', {
                //   pattern: {
                //     message: '年齢の書き方が間違ってます',
                //     value: validations.ageNumber,
                //   },
                //   required: { message: '必須入力項目です', value: true },
                // })}
              />
              <Margin bottom='16px' />
              <Input
                type='email'
                id='email'
                name='email'
                labelText='Email'
                labelType='requiredMarker'
                placeholder='メールアドレスを入力してください'
                width='343px'
                fontSizeValue='16px'
                disabled={true}
                isError={!!errors.email}
                errors={errors}
                register={register('email')}
                // register={register('email', {
                //   pattern: {
                //     message: 'メールアドレスの書き方が間違ってます',
                //     value: validations.email,
                //   },
                //   required: { message: '必須入力項目です', value: true },
                // })}
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
              />
            </StProfileEditContainer>
          </StProfileEditFormContainer>
        </CommonTemplate>
      ) : (
        <CommonTemplate isSideBar={true}>
          <StProfileEditFormContainer onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
            <h3>プロフィール編集</h3>
            <StProfileEditContainer>
              <Input
                type='text'
                id='first-name'
                width='343px'
                fontSizeValue='16px'
                placeholder='例: タナカ'
                labelText='姓（カナ）'
                labelType='requiredMarker'
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
                labelType='requiredMarker'
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
                labelType='requiredMarker'
                placeholder='例: 03-1234-5678'
                width='343px'
                fontSizeValue='16px'
                disabled={true}
                isError={!!errors.phoneNumber}
                errors={errors}
                register={register('phoneNumber')}
                // register={register('phoneNumber', {
                //   pattern: {
                //     message: '電話番号の書き方が間違ってます',
                //     value: validations.telephone,
                //   },
                //   required: { message: '必須入力項目です', value: true },
                // })}
              />
              <Margin bottom='16px' />
              <Input
                type='text'
                id='postcode'
                name='postCode'
                labelText='郵便番号'
                labelType='requiredMarker'
                placeholder='例: 1516608'
                isError={!!errors.postCode}
                errors={errors}
                width='343px'
                fontSizeValue='16px'
                disabled={true}
                register={register('postCode')}
                // register={register('postCode', {
                //   pattern: {
                //     message: '郵便番号の書き方が間違ってます',
                //     value: validations.postcode,
                //   },
                //   required: { message: '必須入力項目です', value: true },
                // })}
              />
              <Margin bottom='16px' />
              <Input
                type='text'
                id='address'
                name='address'
                labelText='住所'
                labelType='requiredMarker'
                placeholder='例: 東京都調布市下石原3-9-12'
                isError={!!errors.address}
                errors={errors}
                width='343px'
                fontSizeValue='16px'
                disabled={true}
                register={register('address')}
                // register={register('address', {
                //   required: { message: '必須入力項目です', value: true },
                // })}
              />
              <Margin bottom='16px' />
              <Input
                type='number'
                id='ageNumber'
                name='ageNumber'
                labelText='年齢'
                labelType='requiredMarker'
                placeholder='例: 25'
                width='343px'
                fontSizeValue='16px'
                disabled={true}
                isError={!!errors.ageNumber}
                errors={errors}
                register={register('ageNumber')}
                // register={register('ageNumber', {
                //   pattern: {
                //     message: '年齢の書き方が間違ってます',
                //     value: validations.ageNumber,
                //   },
                //   required: { message: '必須入力項目です', value: true },
                // })}
              />
              <Margin bottom='16px' />
              <Input
                type='email'
                id='email'
                name='email'
                labelText='Email'
                labelType='requiredMarker'
                placeholder='メールアドレスを入力してください'
                width='343px'
                fontSizeValue='16px'
                disabled={true}
                isError={!!errors.email}
                errors={errors}
                register={register('email')}
                // register={register('email', {
                //   pattern: {
                //     message: 'メールアドレスの書き方が間違ってます',
                //     value: validations.email,
                //   },
                //   required: { message: '必須入力項目です', value: true },
                // })}
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
              />
            </StProfileEditContainer>
          </StProfileEditFormContainer>
        </CommonTemplate>
      )}
    </React.Fragment>
  );
};

export default withAuthenticationRequired(ProfileEditPage, {
  // eslint-disable-next-line react/display-name
  onRedirecting: () => {
    return (
      <StCenterLoaderContainer>
        <Loader loadingContent='ログイン済みかどうか判定しています' />
      </StCenterLoaderContainer>
    );
  },
});

// TODO : UserAgentの判別によってレスポンシブ対応を行っているが、SSGは非対応。SSGにも対応できる方法があったら置き換える
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const userAgent = Parser(req?.headers['user-agent']);

  return { props: { isMobileUaDeviceType: userAgent.device.type === 'mobile' } };
};

const StCenterLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

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
