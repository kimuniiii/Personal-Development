import styled from '@emotion/styled';
import Image from 'next/image';
import React, { VFC } from 'react';
import { ImCross } from 'react-icons/im';

import { IconButton } from 'src/components/atoms/IconButton';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

type ProductImageUploadProps = {
  photoFiles: File[];
  onDeleteImgBtn: (photoIndex: number) => void;
  onFileInputChange: React.ChangeEventHandler<HTMLInputElement>;
};

/**
 * @概要 商品登録ページで商品画像を最大3枚までアップロードできるコンポーネント
 */
export const ProductImageUpload: VFC<ProductImageUploadProps> = ({
  photoFiles,
  onDeleteImgBtn,
  onFileInputChange,
}) => {
  return (
    <React.Fragment>
      <StImageContainer>
        {[...Array(3)].map((_: number, idx: number) =>
          idx < photoFiles.length ? (
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
                  src={URL.createObjectURL(photoFiles[idx])}
                  alt='Reactの画像です'
                  layout='fill'
                />
              </StImagePosition>
              {idx !== 2 ? <Margin right='16px' /> : null}
            </React.Fragment>
          ) : (
            <React.Fragment key={idx}>
              <StImagePlaceholderBox />
              {idx !== 2 ? <Margin right='16px' /> : null}
            </React.Fragment>
          ),
        )}
      </StImageContainer>
      <Margin bottom='16px' />
      <StLabel>
        商品の写真を追加する（最大3枚まで）
        <input type='file' onChange={onFileInputChange} />
      </StLabel>
    </React.Fragment>
  );
};

const StImageContainer = styled.section`
  display: flex;
`;

const StImagePlaceholderBox = styled.div`
  width: 104px;
  height: 100px;
  background-color: ${COLOR_PALETTE.WHITE};
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
