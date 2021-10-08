import styled from '@emotion/styled';
import { useEffect, VFC } from 'react';
import { IoMdCheckmark } from 'react-icons/io/index';
import { IoMdWarning } from 'react-icons/io/index';

import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_WEIGHT } from 'src/styles/font_weight';

type SnackBarProps = {
  snackBarTypes: 'success' | 'fail';
  message: string;
  isShowSnackBar: boolean;
  setIsShowSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SnackBar: VFC<SnackBarProps> = ({
  snackBarTypes,
  message,
  isShowSnackBar,
  setIsShowSnackBar,
}) => {
  // 3秒後に`SnackBar`は消える
  useEffect(() => {
    setTimeout(() => {
      setIsShowSnackBar(false);
    }, 3000);
  }, [setIsShowSnackBar]);

  return (
    <StSnackBarPosition>
      {isShowSnackBar && snackBarTypes === 'success' ? (
        <StSuccessContainer>
          <IoMdCheckmark />
          <Margin right='16px' />
          <p>{message}</p>
        </StSuccessContainer>
      ) : null}
      {isShowSnackBar && snackBarTypes === 'fail' ? (
        <StFailContainer>
          <IoMdWarning />
          <Margin right='16px' />
          <p>{message}</p>
        </StFailContainer>
      ) : null}
    </StSnackBarPosition>
  );
};

const StSnackBarPosition = styled.div`
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translate(-50%, 0);
`;

const StSuccessContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${FONT_WEIGHT.BOLD};
  background-color: ${COLOR_PALETTE.SNACKBAR_SUCCESS_COLOR};
  /* スマホで表示崩れが起きないようにするために指定 */
  min-width: 320px;
  padding: 16px;
  border-radius: 10px;
`;

const StFailContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${FONT_WEIGHT.BOLD};
  color: ${COLOR_PALETTE.ERROR_COLOR};
  background-color: ${COLOR_PALETTE.WARNING_COLOR};
  padding: 16px;
  border-radius: 10px;
`;
