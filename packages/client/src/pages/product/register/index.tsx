import { gql, useMutation, useQuery } from '@apollo/client';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import styled from '@emotion/styled';
import Router from 'next/router';
import React, { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
// eslint-disable-next-line import/order
import Parser from 'ua-parser-js';

import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { Loader } from 'src/components/atoms/Loader';
import { SelectBox } from 'src/components/atoms/SelectBox';
import { Textarea } from 'src/components/atoms/Textarea';
import { Margin } from 'src/components/layouts/Margin';
import { ProductImageUpload } from 'src/components/organisms/ProductImageUpload';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { ErrorTemplate } from 'src/components/templates/ErrorTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import type { NextPage, GetServerSideProps } from 'next';

type ProductRegisterProps = {
  isMobileUaDeviceType: boolean;
  origin: string;
};

const PRODUCT_REGISTER = gql`
  mutation MyMutation(
    $base64_image: String
    $category: String
    $created_at: timestamptz
    $description: String
    $id: Int!
    $name: String
    $price: Int
    $user_id: String!
  ) {
    insert_product(
      objects: {
        base64_image: $base64_image
        category: $category
        created_at: $created_at
        description: $description
        id: $id
        name: $name
        price: $price
        user_id: $user_id
      }
    ) {
      returning {
        base64_image
        category
        category
        created_at
        id
        name
        price
        user_id
      }
    }
  }
`;

const GET_PRODUCT_DATA_LENGTH = gql`
  query GetProductDataLength {
    product_aggregate {
      aggregate {
        count
      }
    }
  }
`;

console.log(PRODUCT_REGISTER);

/**
 * @概要 マイページの商品を出品するボタンを押したら表示されるページコンポーネント
 */
const ProductRegisterPage: NextPage<ProductRegisterProps> = ({ isMobileUaDeviceType, origin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const { data } = useQuery<{
    product_aggregate: {
      aggregate: {
        count: number;
      };
    };
  }>(GET_PRODUCT_DATA_LENGTH, { fetchPolicy: 'no-cache' });
  const [productRegister, { loading, error }] = useMutation(PRODUCT_REGISTER);
  const { user } = useAuth0();

  const MUTATION_ID = data?.product_aggregate.aggregate.count
    ? data?.product_aggregate.aggregate.count + 1
    : 1;

  console.log(MUTATION_ID);

  // ProductImageUpload に関する状態管理と更新関数とイベントハンドラ
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Mutation の 通信中 と エラー状態 の管理
  if (loading)
    return (
      <StCenterLoaderContainer>
        <Loader loadingContent='商品を登録中です' />
      </StCenterLoaderContainer>
    );

  if (error) {
    return <ErrorTemplate error={error} />;
  }

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
  const handleOnSubmit: SubmitHandler<Record<string, unknown>> = (data): void => {
    console.log('data');
    console.table(data);
    console.log('data[select-category-box]');
    console.log(data['select-category-box']);
    console.log('selectedFiles');
    console.table(selectedFiles);
    console.log('data + selectedFiles');
    console.table({ ...data, productImage: selectedFiles });

    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        console.log('ここには「Base64」で変換された文字列を格納できる');
        // 画像ファイルを base64 文字列に変換している
        console.log('reader.result', reader.result);
        console.log('addEventListenerの中身');
        console.table({ ...data, profileImageBase64: reader.result });
        // ここに`GraphQL`の`mutation`を入れたらいけるはず
        productRegister({
          variables: {
            base64_image: reader.result,
            category: data['select-category-box'],
            created_at: new Date().toISOString(),
            description: data['productDetail'],
            id: MUTATION_ID,
            name: data['productName'],
            price: data['priceNumber'],
            user_id: user?.sub,
          },
        })
          .then((res) => {
            console.log('then');
            console.log('res', res);
            Router.replace('/my-page');
          })
          .catch((error) => {
            console.log('catch');
            console.log('error', error);
            <ErrorTemplate error={error} />;
          });
      },
      false,
    );

    if (selectedFiles.length === 1) {
      const test1 = reader.readAsDataURL(selectedFiles[0]);
      console.log('if文の中身');
      console.log('selectedFile', selectedFiles);
      console.log('test1', test1);
      console.log('以下の値は「null」になっている');
      console.log('reader.result', reader.result);
    }

    // FIXME : Uncaught InvalidStateError: Failed to execute 'readAsDataURL' on 'FileReader': The object is already busy reading Blobs.
    // TODO : 商品詳細画面が完成したら、複数画像アップロードに対応できるようにプログラムを組む
    // if (selectedFiles.length === 2) {
    //   const test1 = reader.readAsDataURL(selectedFiles[0]);
    //   const test2 = reader.readAsDataURL(selectedFiles[1]);
    //   console.log('if文の中身');
    //   console.log('selectedFile', selectedFiles);
    //   console.log('test1', test1);
    //   console.log('test2', test2);
    //   console.log('以下の値は「null」になっている');
    //   console.log('reader.result', reader.result);
    // }

    // if (selectedFiles.length === 3) {
    //   const test1 = reader.readAsDataURL(selectedFiles[0]);
    //   const test2 = reader.readAsDataURL(selectedFiles[1]);
    //   const test3 = reader.readAsDataURL(selectedFiles[2]);
    //   console.log('if文の中身');
    //   console.log('selectedFile', selectedFiles);
    //   console.log('test1', test1);
    //   console.log('test2', test2);
    //   console.log('test3', test3);
    //   console.log('以下の値は「null」になっている');
    //   console.log('reader.result', reader.result);
    // }
  };

  /**
   * @概要 バリデーション失敗時に呼び出されるイベントハンドラ
   */
  const handleOnError: SubmitErrorHandler<Record<string, unknown>> = (errors) => {
    console.error(errors);
  };

  /**
   * @概要 子供から親に送られたファイル情報を更新する関数
   */
  const onFileSelect = (selectedFiles: File[]): void => {
    setSelectedFiles(selectedFiles);
  };

  return (
    <React.Fragment>
      <HeadTemplate
        pageOrigin={origin}
        pageCanonicalUrl='https://www.riot-ec-site.com/product/register'
        pageTitle='商品登録ページ'
      />
      {isMobileUaDeviceType ? (
        <CommonTemplate isMobileUaDeviceType={isMobileUaDeviceType}>
          <StProfileEditFormContainer onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
            <h3>商品名</h3>
            <StProfileEditContainer>
              <Input
                type='text'
                id='product-name'
                name='productName'
                placeholder='例: ノートPC'
                labelText='商品名'
                labelType='requiredMarker'
                width='343px'
                fontSizeValue='16px'
                isError={!!errors.productName}
                errors={errors}
                register={register('productName', {
                  required: { message: '必須入力項目です！', value: true },
                })}
              />
              <Margin bottom='16px' />
              <SelectBox
                id='select-category-box'
                name='select-category-box'
                labelType='requiredMarker'
                labelText='カテゴリー'
                optionList={[
                  'カテゴリーを選択してください',
                  '家電',
                  'PC',
                  'ゲーム',
                  '衣類',
                  'その他',
                ]}
                top='18px'
                width='343px'
                padding='16px'
                fontSizeValue='16px'
                isError={!!errors['select-category-box']}
                errors={errors}
                register={register('select-category-box', {
                  required: { message: 'カテゴリーをセットしてください', value: true },
                })}
              />
              <Margin bottom='16px' />
              <Textarea
                id='productDetail'
                name='productDetail'
                labelText='詳細'
                labelType='requiredMarker'
                placeholder='200文字以内で入力してください'
                width='343px'
                height='200px'
                fontSizeValue='16px'
                isError={!!errors.productDetail}
                errors={errors}
                register={register('productDetail', {
                  required: { message: '必須入力項目です！', value: true },
                })}
              />
              <Margin bottom='16px' />
              <Input
                type='number'
                id='priceNumber'
                name='priceNumber'
                labelText='金額'
                labelType='requiredMarker'
                placeholder='例: 25000'
                width='343px'
                fontSizeValue='16px'
                isError={!!errors.priceNumber}
                errors={errors}
                register={register('priceNumber', {
                  required: { message: '必須入力項目です！', value: true },
                })}
              />
              <Margin bottom='16px' />
              <ProductImageUpload
                labelText='商品画像'
                labelType='requiredMarker'
                selectedFiles={selectedFiles}
                onFileSelect={onFileSelect}
              />
              <Margin bottom='32px' />
              <Button
                type='submit'
                styleTypes='tertiary'
                width='100%'
                fontSizeValue='16px'
                buttonContent='商品を出品する'
                onClick={(): void => alert('出品するボタンをクリック')}
              />
            </StProfileEditContainer>
          </StProfileEditFormContainer>
        </CommonTemplate>
      ) : (
        <CommonTemplate isSideBar={true}>
          <StProfileEditFormContainer onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
            <h3>商品名</h3>
            <StProfileEditContainer>
              <Input
                type='text'
                id='product-name'
                name='productName'
                placeholder='例: ノートPC'
                labelText='商品名'
                labelType='requiredMarker'
                width='343px'
                fontSizeValue='16px'
                isError={!!errors.productName}
                errors={errors}
                register={register('productName', {
                  required: { message: '必須入力項目です！', value: true },
                })}
              />
              <Margin bottom='16px' />
              <SelectBox
                id='select-category-box'
                name='select-category-box'
                labelType='requiredMarker'
                labelText='カテゴリー'
                optionList={[
                  'カテゴリーを選択してください',
                  '家電',
                  'PC',
                  'ゲーム',
                  '衣類',
                  'その他',
                ]}
                top='18px'
                width='343px'
                padding='16px'
                fontSizeValue='16px'
                isError={!!errors['select-category-box']}
                errors={errors}
                register={register('select-category-box', {
                  required: { message: 'カテゴリーをセットしてください', value: true },
                })}
              />
              <Margin bottom='16px' />
              <Textarea
                id='productDetail'
                name='productDetail'
                labelText='詳細'
                labelType='requiredMarker'
                placeholder='200文字以内で入力してください'
                width='343px'
                height='200px'
                fontSizeValue='16px'
                isError={!!errors.productDetail}
                errors={errors}
                register={register('productDetail', {
                  required: { message: '必須入力項目です！', value: true },
                })}
              />
              <Margin bottom='16px' />
              <Input
                type='number'
                id='priceNumber'
                name='priceNumber'
                labelText='金額'
                labelType='requiredMarker'
                placeholder='例: 25000'
                width='343px'
                fontSizeValue='16px'
                isError={!!errors.priceNumber}
                errors={errors}
                register={register('priceNumber', {
                  required: { message: '必須入力項目です！', value: true },
                })}
              />
              <Margin bottom='16px' />
              <ProductImageUpload
                labelText='商品画像'
                labelType='requiredMarker'
                selectedFiles={selectedFiles}
                onFileSelect={onFileSelect}
              />
              <Margin bottom='32px' />
              <Button
                type='submit'
                styleTypes='tertiary'
                width='100%'
                fontSizeValue='16px'
                buttonContent='商品を出品する'
                onClick={(): void => alert('出品するボタンをクリック')}
              />
            </StProfileEditContainer>
          </StProfileEditFormContainer>
        </CommonTemplate>
      )}
    </React.Fragment>
  );
};

export default withAuthenticationRequired(ProductRegisterPage, {
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
