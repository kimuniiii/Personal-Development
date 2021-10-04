import styled from '@emotion/styled';
import { IoMdCheckmark } from 'react-icons/io/index';
import { IoMdWarning } from 'react-icons/io/index';

import type { VFC } from 'react';

import { Margin } from 'src/components/layouts/Margin';

import { FONT_WEIGHT } from 'src/styles/font_weight';

type SnackBarProps = {
  snackBarTypes: 'success' | 'fail';
  message: string;
};

export const SnackBar: VFC<SnackBarProps> = ({ snackBarTypes, message }) => {
  return (
    <StSnackBarRoot>
      {snackBarTypes === 'success' ? (
        <StSuccessContainer>
          <IoMdCheckmark />
          <Margin right='16px' />
          <p>{message}</p>
        </StSuccessContainer>
      ) : null}
      {snackBarTypes === 'fail' ? (
        <StFailContainer>
          <IoMdWarning />
          <Margin right='16px' />
          <p>{message}</p>
        </StFailContainer>
      ) : null}
    </StSnackBarRoot>
  );
};

const StSnackBarRoot = styled.div``;

const StSuccessContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${FONT_WEIGHT.BOLD};
  background-color: #00f593;
  padding: 16px;
  border-radius: 10px;
`;

const StFailContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${FONT_WEIGHT.BOLD};
  background-color: #ff0033;
  padding: 16px;
  border-radius: 10px;
`;
