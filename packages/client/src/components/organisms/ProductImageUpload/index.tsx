import styled from '@emotion/styled';
import Image from 'next/image';
import React, { VFC } from 'react';
import { ImCross } from 'react-icons/im';

import { IconButton } from 'src/components/atoms/IconButton';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

import ReactImage from '../../../../public/images/react.jpg';

/**
 * @概要 商品登録ページで商品画像を最大3枚までアップロードできるコンポーネント
 */
export const ProductImageUpload: VFC = () => {
  return (
    <React.Fragment>
      <StImageContainer>
        {[...Array(3)].map((_: number, idx: number) => {
          return (
            <StImagePosition key={idx}>
              <IconButton
                className='icon-close-button'
                type='button'
                svgComponent={<ImCross size={16} />}
                width='40px'
                height='40px'
                borderRadius='50%'
                onClick={(): void => alert('IconButton Clicked')}
              />
              <Image src={ReactImage} alt='Reactの画像です' />
            </StImagePosition>
          );
        })}
      </StImageContainer>
      <Margin bottom='16px' />
      <StFileUploadBtnContainer>
        <StLabel>
          写真を追加
          <input type='file' />
        </StLabel>
      </StFileUploadBtnContainer>
    </React.Fragment>
  );
};

const StImageContainer = styled.section`
  display: flex;
  gap: 16px;
  max-width: 500px;
`;

const StImagePosition = styled.div`
  position: relative;
  width: 157px;
  height: 157px;

  .icon-close-button {
    position: absolute;
    top: -16px;
    left: 128px;
    /* 画像よりもボタンを上に表示させるため */
    z-index: 1;
  }
`;

const StFileUploadBtnContainer = styled.section`
  display: flex;
  flex-direction: row-reverse;
  max-width: 500px;
`;

const StLabel = styled.label`
  display: inline-block;
  text-align: center;
  padding: 12px 16px;
  width: 157px;
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
