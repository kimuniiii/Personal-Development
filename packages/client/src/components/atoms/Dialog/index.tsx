import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { VFC } from 'react';

import { Button } from 'src/components/atoms/Button';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';
import { FONT_WEIGHT } from 'src/styles/font_weight';

type DialogProps = {
  dialogTitle: string;
  isDialogOpen: boolean;
  onDialogClose: () => void;
};

export const Dialog: VFC<DialogProps> = ({ dialogTitle, isDialogOpen, onDialogClose }) => {
  return (
    <React.Fragment>
      {isDialogOpen ? (
        <StDialogOverlay>
          <StDialogWrapper>
            <StDialogMain>{dialogTitle}</StDialogMain>
            <Margin bottom='48px' />
            <footer>
              <Button
                type='button'
                styleTypes='secondary'
                width='100%'
                buttonContent='送信する'
                fontSizeValue='20px'
                onClick={onDialogClose}
              />
              <Margin bottom='12px' />
              <Button
                type='button'
                styleTypes='tertiary'
                width='100%'
                buttonContent='送信しない'
                fontSizeValue='20px'
                onClick={onDialogClose}
              />
            </footer>
          </StDialogWrapper>
        </StDialogOverlay>
      ) : null}
    </React.Fragment>
  );
};

const modalAppearance = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StDialogOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 0 16px;
  background-color: ${COLOR_PALETTE.MODAL_BACKGROUND_COLOR};
  animation: ${modalAppearance} 0.3s ease-out;
`;

const StDialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 343px;
  height: 'auto';
  max-height: calc(100vh - 32px);
  padding: 16px;
  border-radius: 3px;
  background-color: ${COLOR_PALETTE.WHITE};
`;

const StDialogMain = styled.h4`
  font-size: ${FONT_SIZE.FS_18};
  font-weight: ${FONT_WEIGHT.BOLD};
`;
