import styled from '@emotion/styled';
import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';
import React, { VFC } from 'react';
import { ImCross } from 'react-icons/im';

import type { UseFormRegisterReturn } from 'react-hook-form';

import { IconButton } from 'src/components/atoms/IconButton';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

import { validations } from 'src/utils/validate';

import NoImage from '../../../../public/images/no_image.png';

type ProfileImageUploadProps = {
  labelText: string;
  imageUrl: string;
  imageFileSize: number;
  isFileTypeError: boolean;
  name: string;
  isRequiredError?: boolean;
  errors?: Record<string, unknown>;
  register: UseFormRegisterReturn;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

/**
 * @概要 プロフィール編集ページでプロフィール画像を最大1枚までアップロードできるコンポーネント
 */
export const ProfileImageUpload: VFC<ProfileImageUploadProps> = ({
  labelText,
  imageUrl,
  imageFileSize,
  isFileTypeError,
  name,
  isRequiredError,
  errors,
  register,
  onClick,
  onChange,
}) => {
  const isMaxFileSizeError = imageFileSize >= validations.maxImageSize;
  const isNotNoImage = imageUrl !== '' && !isFileTypeError && !isMaxFileSizeError;

  return (
    <React.Fragment>
      <StImageContainer>
        {labelText !== '' ? (
          <section>
            {labelText}
            <Margin bottom='8px' />
          </section>
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
        <input type='file' accept='image/*' id={name} {...register} onChange={onChange} />
      </StLabel>
      {isRequiredError ? (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }): JSX.Element => (
            <React.Fragment>
              <Margin bottom='8px' />
              <StErrorMessage>{message}</StErrorMessage>
            </React.Fragment>
          )}
        />
      ) : null}
      {isFileTypeError ? (
        <React.Fragment>
          <Margin bottom='8px' />
          <StErrorMessage>
            ※jpeg, png, bmp, gif, svg以外のファイル形式は表示されません
          </StErrorMessage>
        </React.Fragment>
      ) : null}
      {isMaxFileSizeError ? (
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
