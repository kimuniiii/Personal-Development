import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { NextPage } from 'next';

import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { SelectBox } from 'src/components/atoms/SelectBox';
import { Textarea } from 'src/components/atoms/Textarea';
import { Margin } from 'src/components/layouts/Margin';
import { ProductImageUpload } from 'src/components/organisms/ProductImageUpload';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { COLOR_PALETTE } from 'src/styles/color_palette';

type ProductRegisterProps = {
  origin: string;
};

/**
 * @概要 マイページの商品を出品するボタンを押したら表示されるページコンポーネント
 */
const ProductRegisterPage: NextPage<ProductRegisterProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  // ProductImageUpload に関する状態管理と更新関数とイベントハンドラ
  const [selectedFiles, setPhotoFiles] = useState<File[]>([]);

  /**
   * @概要 送信ボタンを押した時に呼び出されるイベントハンドラ
   */
  const onSubmit = (data: Record<string, unknown>): void => {
    console.log('selectedFiles', selectedFiles);
    console.log(data);
    console.log({ ...data, profileImage: selectedFiles });
  };

  /**
   * @概要 子供から親に送られたファイル情報を更新する関数
   */
  const onFileSelect = (selectedFiles: File[]): void => {
    setPhotoFiles(selectedFiles);
  };

  return (
    <React.Fragment>
      <HeadTemplate
        pageOrigin={origin}
        pageCanonicalUrl='https://www.riot-ec-site.com/password/product/register'
        pageTitle='商品登録ページ'
      />
      <CommonTemplate isSideBar={true}>
        <StProfileEditFormContainer onSubmit={handleSubmit(onSubmit)}>
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
              disabled={!isValid}
              onClick={(): void => alert('出品するボタンをクリック')}
            />
          </StProfileEditContainer>
        </StProfileEditFormContainer>
      </CommonTemplate>
    </React.Fragment>
  );
};

export default ProductRegisterPage;

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
