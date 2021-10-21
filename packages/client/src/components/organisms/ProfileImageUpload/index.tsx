import styled from '@emotion/styled';
import Image from 'next/image';

import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';

import { FormLabel } from 'src/components/atoms/FormLabel';
import { IconButton } from 'src/components/atoms/IconButton';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';
import { FONT_WEIGHT } from 'src/styles/font_weight';

import { validations } from 'src/utils/validate';

import type { VFC } from 'react';

import NoImage from '../../../../public/images/no_image.png';

type ProfileImageUploadProps = {
  labelText: string;
  name: string;
  imageUrl: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onFileSelect: (file: File) => void;
};

/**
 * @概要 プロフィール編集ページでプロフィール画像を最大1枚までアップロードできるコンポーネント
 */
export const ProfileImageUpload: VFC<ProfileImageUploadProps> = ({
  labelText,
  name,
  imageUrl,
  onClick,
  onFileSelect,
}) => {
  const [isFileTypeError, setIsFileTypeError] = useState(false);
  const [isMaxImgSizeError, setIsMaxImgSizeError] = useState(false);

  const isNotNoImage = imageUrl !== '' && !isFileTypeError && !isMaxImgSizeError;

  /**
   * @概要 全てのエラーを一度リセットするため関数
   */
  const resetErrors = (): void => {
    setIsFileTypeError(false);
    setIsMaxImgSizeError(false);
  };

  /**
   * @概要 子供でアップロードされたファイルを親コンポーネントに送り返すイベントハンドラ
   */
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
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

    // 画像以外のファイルはアップロードしないように弾くため
    if (
      !['image/gif', 'image/jpeg', 'image/png', 'image/bmp', 'image/svg+xml'].includes(
        event.target.files[0].type,
      )
    ) {
      setIsFileTypeError(true);
      return;
    }

    const imageFile = event.target.files[0];

    // 親コンポーネントに選択したファイルの情報を送る
    onFileSelect(imageFile);

    // onChangeは連続で同じファイルを選択すると発火しない問題の対応のため
    event.target.value = '';
  };

  return (
    <React.Fragment>
      <StImageContainer>
        {labelText !== '' ? (
          <StSection>
            <FormLabel labelText={labelText} labelType='optionalMarker' />
            <Margin bottom='8px' />
          </StSection>
        ) : null}
        {isNotNoImage ? (
          <React.Fragment>
            <StImagePosition>
              <IconButton
                className='icon-close-button'
                type='button'
                svgComponent={<ImCross size={16} />}
                width='40px'
                height='40px'
                borderRadius='50%'
                onClick={onClick}
              />
              <Image src={imageUrl} alt='preview image' width='343px' height='343px' />
            </StImagePosition>
            <Margin bottom='16px' />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <StImagePlaceholderBox>
              <Image src={NoImage} alt='no image' width='343px' height='343px' />
            </StImagePlaceholderBox>
            <Margin bottom='16px' />
          </React.Fragment>
        )}
      </StImageContainer>
      <StLabel htmlFor={name}>
        プロフィール写真を1枚追加する
        <input type='file' accept='image/*' id={name} onChange={handleFileInput} />
      </StLabel>
      {isFileTypeError ? (
        <React.Fragment>
          <Margin bottom='8px' />
          <StErrorMessage>
            ※jpeg, png, bmp, gif, svg以外のファイル形式は表示されません
          </StErrorMessage>
        </React.Fragment>
      ) : null}
      {isMaxImgSizeError ? (
        <React.Fragment>
          <Margin bottom='8px' />
          <StErrorMessage>※10MB以上の画像ファイルはアップロードできません</StErrorMessage>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

const StImageContainer = styled.section`
  max-width: 343px;
`;

const StImagePosition = styled.div`
  position: relative;
  padding: 16px;
  width: 343px;
  height: 343px;

  .icon-close-button {
    position: absolute;
    top: -16px;
    right: -16px;
    /* 画像よりもボタンを上に表示させるため */
    z-index: 1;
  }
`;

const StImagePlaceholderBox = styled.div`
  width: 343px;
  height: 343px;
  border: 1px dotted ${COLOR_PALETTE.BLACK};
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

const StSection = styled.section`
  font-weight: ${FONT_WEIGHT.BOLD};
`;
