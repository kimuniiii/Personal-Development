import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';
import { FONT_WEIGHT } from 'src/styles/font_weight';

import type { SerializedStyles } from '@emotion/react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import type { ValueOf } from 'src/typings/utils/ValueOf';

type CheckboxProps = JSX.IntrinsicElements['input'] & {
  register: UseFormRegisterReturn;
  labelText?: string;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ register, labelText, ...inputProps }, ref) => {
    // undefined を取り除くため
    const isDisabled = !!inputProps['disabled'];

    return (
      <StLabel disabled={isDisabled}>
        <input {...inputProps} type='checkbox' {...register} ref={ref} />
        {labelText ? <StLabelText disabled={isDisabled}>{labelText}</StLabelText> : ''}
      </StLabel>
    );
  },
);

Checkbox.displayName = 'Checkbox';

const StLabel = styled.label<Pick<CheckboxProps, 'disabled'>>`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  ${({ disabled }): SerializedStyles | null =>
    disabled
      ? css`
          cursor: not-allowed;
          opacity: 0.3;
        `
      : null}
`;

const StLabelText = styled.span<Pick<CheckboxProps, 'disabled'>>`
  padding-left: 8px;
  font-size: ${FONT_SIZE.FS_16};
  font-weight: ${FONT_WEIGHT.BOLD};
  color: ${({ disabled }): ValueOf<typeof COLOR_PALETTE> =>
    disabled ? COLOR_PALETTE.BLACK : COLOR_PALETTE.SUB_COLOR};
`;
