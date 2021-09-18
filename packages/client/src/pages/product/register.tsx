import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { SelectBox } from 'src/components/atoms/SelectBox';
import { Textarea } from 'src/components/atoms/Textarea';
import { Margin } from 'src/components/layouts/Margin';
import { ProductImageUpload } from 'src/components/organisms/ProductImageUpload';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import { validations } from 'src/utils/validate';

/**
 * @概要 マイページの商品を出品するボタンを押したら表示されるページコンポーネント
 */
const ProductRegisterPage = (): JSX.Element => {
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

  // ProductImageUpload に関する状態管理と更新関数とイベントハンドラ
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [isFileTypeError, setIsFileTypeError] = useState(false);
  const [isNumberError, setIsNumberError] = useState(false);
  const [isSameImgSizeError, setIsSameImgSizeError] = useState(false);
  const [isMaxImgSizeError, setIsMaxImgSizeError] = useState(false);

  /**
   * @概要 全てのエラーを一度リセットするため関数
   */
  const resetErrors = (): void => {
    setIsFileTypeError(false);
    setIsSameImgSizeError(false);
    setIsNumberError(false);
    setIsMaxImgSizeError(false);
  };

  const onDeleteImgBtn = (photoIndex: number): void => {
    if (confirm('選択した画像を消してよろしいですか？')) {
      resetErrors();
      const modifyPhotos = photoFiles.concat();
      modifyPhotos.splice(photoIndex, 1);
      setPhotoFiles(modifyPhotos);
    }
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // 型ガード（Nullチェック）
    if (event.target.files === null || event.target.files.length === 0) {
      return;
    }

    resetErrors();

    // 10MB以上の画像はアップロードしないように弾くため
    if (event.target.files[0].size >= validations.maxImageSize) {
      setIsMaxImgSizeError(true);
      return;
    }

    // 同じ画像はアップロードしないように弾くため
    // 同じサイズの画像は配列に追加できないというロジックで実装
    // 同じサイズの画像だったらエラー文を表示する。処理を中断する。
    const existsSameSizeImg = photoFiles.some((photo) => {
      // 型ガード（Nullチェック）
      if (event.target.files === null || event.target.files.length === 0) {
        return false;
      }

      return photo.size === event.target.files[0].size;
    });

    if (existsSameSizeImg) {
      setIsSameImgSizeError(true);
      return;
    }

    // 画像のみアップロードするようにするため
    // 画像以外のファイルだったらエラー文を表示する。処理を中断する。
    if (
      !['image/gif', 'image/jpeg', 'image/png', 'image/bmp', 'image/svg+xml'].includes(
        event.target.files[0].type,
      )
    ) {
      setIsFileTypeError(true);
      return;
    }

    // 商品登録ページのアップロードできる画像（＝プレビューの画像）の枚数は3枚までにするため
    // 3枚以上のファイルをアップロードしようとしたらエラー文を出す。処理を中断する。
    if (photoFiles.length >= 3) {
      setIsNumberError(true);
      return;
    }

    setPhotoFiles([...photoFiles, ...event.target.files]);

    // onChangeは連続で同じファイルを選択すると発火しない問題の対応のため
    // 初期化することで同じファイルを連続で選択してもonChangeが発動するように設定する
    // こうすることで、画像をキャンセルしてすぐに同じ画像を選ぶ動作に対応できる
    event.target.value = '';
  };

  return (
    <React.Fragment>
      <HeadTemplate
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
              isFileTypeError={isFileTypeError}
              isNumberError={isNumberError}
              isSameImgSizeError={isSameImgSizeError}
              isMaxImgSizeError={isMaxImgSizeError}
              photoFiles={photoFiles}
              onDeleteImgBtn={onDeleteImgBtn}
              onFileInputChange={onFileInputChange}
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
