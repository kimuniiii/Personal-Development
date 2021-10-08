import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import type { VFC } from 'react';
import type { ValueOf } from 'typings/utils/ValueOf';

import { TransitionBaseModal } from 'src/components/organisms/TransitionBaseModal';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';
import { Z_INDEX } from 'src/styles/z_index';

type TransitionHorizontalModalProps = {
  /**
   * モーダルの開閉を判定するBooleanフラグ
   */
  isModalOpen: boolean;
  /**
   * 画面の右から出現するモーダルの横幅を指定する
   */
  modalWidth: string;
  /**
   * Modalのmainタグに描画するJSXを親から受け取る`Props`
   */
  mainContent: string | JSX.Element;
  /**
   * IconButtonコンポーネントを親から受け取る`Props`
   */
  closeButtonComponent: JSX.Element;
  /**
   * モーダルを開く（isModalOpenの値をtrueに変更する）イベントハンドラ
   */
  onModalOpen: () => void;
  /**
   * モーダルを閉じる（isModalOpenの値をfalseに変更する）イベントハンドラ
   */
  onModalClose: () => void;
  modalTitle?: string;
  headerPadding?: string;
  headerFontSize?: ValueOf<typeof FONT_SIZE>;
};

export const TransitionHorizontalModal: VFC<TransitionHorizontalModalProps> = ({
  isModalOpen,
  modalWidth,
  mainContent,
  closeButtonComponent,
  onModalOpen,
  onModalClose,
  modalTitle,
  headerPadding,
  headerFontSize,
}) => {
  return (
    <React.Fragment>
      <CSSTransition
        in={isModalOpen}
        timeout={{ enter: 1200, exit: 500 }}
        classNames='modal'
        unmountOnExit
        onEnter={onModalOpen}
        onExited={onModalClose}
      >
        <StBaseContainer modalWidth={modalWidth}>
          <TransitionBaseModal
            mainContent={mainContent}
            closeButtonComponent={closeButtonComponent}
            modalTitle={modalTitle}
            headerPadding={headerPadding}
            headerFontSize={headerFontSize}
          />
        </StBaseContainer>
      </CSSTransition>
      <StModalOverlay onClick={onModalClose} hidden={!isModalOpen} />
    </React.Fragment>
  );
};

const faderFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  1% {
    opacity: 0;
  }
  100% {
    opacity: 0.5;
  }
`;

const StModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${COLOR_PALETTE.MODAL_BACKGROUND_COLOR};
  opacity: 0.5;
  animation: ${faderFadeIn} 0.5s ease-out;
  z-index: ${Z_INDEX.MODAL_OVERLAY};
`;

const StBaseContainer = styled.aside<Pick<TransitionHorizontalModalProps, 'modalWidth'>>`
  position: fixed;
  top: 0;
  right: 0;
  overflow: scroll;
  width: ${({ modalWidth }): string => modalWidth};
  height: 100vh;
  background-color: ${COLOR_PALETTE.WHITE};
  z-index: ${Z_INDEX.MODAL};

  &.modal-enter {
    right: ${({ modalWidth }): string => (modalWidth !== '100vw' ? '-' + modalWidth : 'initial')};
    left: 100%;
    overflow: hidden;
  }

  &.modal-enter-active {
    right: ${({ modalWidth }): string | number => (modalWidth !== '100vw' ? 0 : 'initial')};
    left: ${({ modalWidth }): string | number => (modalWidth !== '100vw' ? 'initial' : 0)};
    overflow: hidden;
    transition: all 500ms;
  }

  &.modal-exit {
    left: 0;
    overflow: hidden;
  }

  &.modal-exit-active {
    right: ${({ modalWidth }): string => (modalWidth !== '100vw' ? '-' + modalWidth : 'initial')};
    left: ${({ modalWidth }): string => (modalWidth !== '100vw' ? 'initial' : '100%')};
    overflow: hidden;
    transition: all 400ms;
  }
`;
