import { ImCross } from 'react-icons/im';
import Image from 'next/image';
import React, { VFC } from 'react';
import styled from '@emotion/styled';

import { IconButton } from 'src/components/atoms/IconButton';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

import ReactImage from '../../../../public/react.jpg';

/**
 * @概要 プロフィール編集ページでプロフィール画像を最大1枚までアップロードできるコンポーネント
 */
export const ProfileImageUpload: VFC = () => {
  return (
    <React.Fragment>
      <StImageContainer>
        <StImagePosition>
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
      </StImageContainer>
      <Margin bottom='32px' />
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
  max-width: 375px;
`;

const StImagePosition = styled.div`
  position: relative;
  width: 375px;
  height: 375px;

  .icon-close-button {
    position: absolute;
    top: -16px;
    right: -16px;
    /* 画像よりもボタンを上に表示させるため */
    z-index: 1;
  }
`;

const StFileUploadBtnContainer = styled.section`
  display: flex;
  flex-direction: row-reverse;
  max-width: 375px;
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
