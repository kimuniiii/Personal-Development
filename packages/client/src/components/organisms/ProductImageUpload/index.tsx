import styled from '@emotion/styled';
import Image from 'next/image';

import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';

import { FormLabel } from 'src/components/atoms/FormLabel';
import { IconButton } from 'src/components/atoms/IconButton';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

import { validations } from 'src/utils/validate';

import type { VFC } from 'react';

import NoImage from '../../../../public/images/no_image.png';

type ProductImageUploadProps = {
  labelText: string;
  labelType: 'requiredMarker' | 'optionalMarker';
  selectedFiles: File[];
  onFileSelect: (file: File[]) => void;
};

/**
 * @概要 商品登録ページで商品画像を最大3枚までアップロードできるコンポーネント
 */
export const ProductImageUpload: VFC<ProductImageUploadProps> = ({
  labelText,
  labelType,
  selectedFiles,
  onFileSelect,
}) => {
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

  /**
   * @概要 子供でアップロードされたファイルを親コンポーネントに送り返すイベントハンドラ
   */
  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // 型ガード（Nullチェック）
    if (event.target.files === null || event.target.files.length === 0) {
      return;
    }

    resetErrors();

    // 10MB以上の画像はアップロードしないように弾くため
    // TODO : 9.9MB | 10MB | 10.1MB でテストを行う（境界値テスト）
    if (event.target.files[0].size >= validations.maxImageSize) {
      setIsMaxImgSizeError(true);
      return;
    }

    // 同じ画像はアップロードしないように弾くため
    // 同じサイズの画像は配列に追加できないというロジックで実装
    // 同じサイズの画像だったらエラー文を表示する。処理を中断する
    // TODO : 同じサイズで違う画像だった場合の条件分岐はどうする？
    const existsSameSizeImg = selectedFiles.some((photo) => {
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
    if (selectedFiles.length >= 3) {
      setIsNumberError(true);
      return;
    }

    console.log('event.target.value', event.target.value);
    console.log('event.target.files', event.target.files);
    console.log('event.target.files[0]', event.target.files[0]);

    onFileSelect([...selectedFiles, ...event.target.files]);

    // onChangeは連続で同じファイルを選択すると発火しない問題の対応のため
    // 初期化することで同じファイルを連続で選択してもonChangeが発動するように設定する
    // こうすることで、画像をキャンセルしてすぐに同じ画像を選ぶ動作に対応できる
    event.target.value = '';
  };

  const onDeleteImgBtn = (photoIndex: number): void => {
    if (confirm('選択した画像を消してよろしいですか？')) {
      resetErrors();
      const modifyPhotos = selectedFiles.concat();
      modifyPhotos.splice(photoIndex, 1);
      onFileSelect(modifyPhotos);
    }
  };

  return (
    <StRoot>
      {labelText !== '' ? (
        <>
          <FormLabel labelType={labelType} labelText={labelText} />
          <Margin bottom='8px' />
        </>
      ) : null}
      <StImageContainer>
        {[...Array(3)].map((_: number, idx: number) =>
          idx < selectedFiles.length ? (
            <React.Fragment key={idx}>
              <StImagePosition>
                <IconButton
                  className='icon-close-button'
                  type='button'
                  svgComponent={<ImCross size={16} />}
                  width='40px'
                  height='40px'
                  borderRadius='50%'
                  onClick={(): void => onDeleteImgBtn(idx)}
                />
                <Image
                  src={URL.createObjectURL(selectedFiles[idx])}
                  alt='preview image'
                  layout='fill'
                />
              </StImagePosition>
              {idx !== 2 ? <Margin right='16px' /> : null}
            </React.Fragment>
          ) : (
            <React.Fragment key={idx}>
              <StImagePlaceholderBox>
                <Image src={NoImage} alt='no image' width='104px' height='104px' />
              </StImagePlaceholderBox>
              {idx !== 2 ? <Margin right='16px' /> : null}
            </React.Fragment>
          ),
        )}
      </StImageContainer>
      <Margin bottom='16px' />
      <StLabel>
        商品の写真を追加する（最大3枚まで）Warning : 詳細画面完成までは1枚のみ
        <input type='file' accept='image/*' onChange={onFileInputChange} />
      </StLabel>
      {isFileTypeError ? (
        <React.Fragment>
          <Margin bottom='8px' />
          <StErrorMessage>
            ※jpeg, png, bmp, gif, svg以外のファイル形式は表示されません
          </StErrorMessage>
        </React.Fragment>
      ) : null}
      {isNumberError ? (
        <React.Fragment>
          <Margin bottom='8px' />
          <StErrorMessage>※3枚を超えて選択された画像は表示されません</StErrorMessage>
        </React.Fragment>
      ) : null}
      {isSameImgSizeError ? (
        <React.Fragment>
          <Margin bottom='8px' />
          <StErrorMessage>※既に選択された画像と同じものは表示されません</StErrorMessage>
        </React.Fragment>
      ) : null}
      {isMaxImgSizeError ? (
        <React.Fragment>
          <Margin bottom='8px' />
          <StErrorMessage>※10MB以上の画像ファイルはアップロードできません</StErrorMessage>
        </React.Fragment>
      ) : null}
    </StRoot>
  );
};

const StRoot = styled.section`
  display: flex;
  flex-direction: column;
`;

const StImageContainer = styled.section`
  display: flex;
`;

const StImagePlaceholderBox = styled.div`
  width: 104px;
  height: 104px;
  border: 1px dotted ${COLOR_PALETTE.BLACK};
`;

const StImagePosition = styled.div`
  position: relative;
  width: 104px;
  height: 100px;

  .icon-close-button {
    position: absolute;
    top: -16px;
    left: 80px;
    /* 画像よりもボタンを上に表示させるため */
    z-index: 1;
  }
`;

const StLabel = styled.label`
  display: inline-block;
  text-align: center;
  padding: 12px 16px;
  max-width: 343px;
  width: 343px;
  border-radius: 3px;
  background-color: #3e8bff;
  color: ${COLOR_PALETTE.WHITE};
  font-size: ${FONT_SIZE.FS_16};
  /* ホバーをなめらかにするため */
  transition: opacity 0.3s;

  input[type='file'] {
    display: none;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const StErrorMessage = styled.p`
  color: ${COLOR_PALETTE.ERROR_COLOR};
`;
