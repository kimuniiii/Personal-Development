import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io/index';

import { FormLabel } from 'src/components/atoms/FormLabel';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

import type { SerializedStyles } from '@emotion/react';

import type { UseFormRegisterReturn } from 'react-hook-form';
import type { ValueOf } from 'src/typings/utils/ValueOf';

type SelectBoxProps = {
  id: string;
  name: string;
  top: string;
  width: `${number}px` | `${number}%` | `${number}vw`;
  optionList: string[];
  isError: boolean;
  errors: Record<string, unknown>;
  register: UseFormRegisterReturn;
  labelType: 'requiredMarker' | 'optionalMarker';
  labelText: string;
  padding?: string;
  fontSizeValue?: ValueOf<typeof FONT_SIZE>;
};

export const SelectBox = React.forwardRef<HTMLSelectElement, SelectBoxProps>(
  (
    {
      id,
      name,
      top,
      width,
      optionList,
      isError,
      errors,
      register,
      labelType,
      labelText = '',
      padding,
      fontSizeValue,
    },
    ref,
  ) => {
    return (
      <StSelectBoxWrapper width={width} top={top}>
        {labelText ? (
          <>
            <FormLabel htmlFor={id} labelType={labelType} labelText={labelText} />
            <Margin bottom='8px' />
          </>
        ) : null}
        <StSelectBoxArea>
          <StSelect
            id={id}
            fontSizeValue={fontSizeValue}
            padding={padding}
            isError={isError}
            {...register}
            ref={ref}
          >
            {optionList.map((cur, idx) => (
              <React.Fragment key={cur}>
                {idx === 0 ? (
                  <option value='' selected disabled>
                    {cur}
                  </option>
                ) : (
                  <option value={cur}>{cur}</option>
                )}
              </React.Fragment>
            ))}
          </StSelect>
          <IoIosArrowDown width={12} height={12} fill={COLOR_PALETTE.BLACK} />
        </StSelectBoxArea>
        {isError ? (
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
      </StSelectBoxWrapper>
    );
  },
);

SelectBox.displayName = 'SelectBox';

const StSelectBoxWrapper = styled.div<Pick<SelectBoxProps, 'width' | 'top'>>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ width }): `${number}px` | `${number}%` | `${number}vw` => width};

  svg {
    position: absolute;
    top: ${({ top }): string => top};
    left: ${({ width }): string => `calc(${width} - 24px) `};
    pointer-events: none;
    cursor: pointer;
  }
`;

const StSelectBoxArea = styled.div`
  position: relative;
`;

const StSelect = styled.select<Pick<SelectBoxProps, 'fontSizeValue' | 'padding' | 'isError'>>`
  width: 100%;
  padding: ${({ padding }): string => padding ?? '16px 8px'};
  border: 1px solid ${COLOR_PALETTE.BLACK};
  border-radius: 3px;
  outline: 0;
  font-size: ${({ fontSizeValue }): ValueOf<typeof FONT_SIZE> => fontSizeValue ?? FONT_SIZE.FS_14};
  color: ${COLOR_PALETTE.BLACK};
  cursor: pointer;

  /* セレクトボックスのデフォルトの下矢印を消すため */
  appearance: none;

  &:hover {
    border: 1px solid ${COLOR_PALETTE.MAIN_COLOR};
  }

  &:focus {
    border: 2px solid ${COLOR_PALETTE.MAIN_COLOR};
  }

  /* エラー状態のスタイル */
  ${({ isError }): SerializedStyles | null =>
    isError
      ? css`
          border: solid 2px ${COLOR_PALETTE.ERROR_COLOR};
          background-color: ${COLOR_PALETTE.WARNING_COLOR};

          &:hover,
          &:focus {
            border: solid 2px ${COLOR_PALETTE.ERROR_COLOR};
            background-color: ${COLOR_PALETTE.WARNING_COLOR};
          }
        `
      : null}
`;

const StErrorMessage = styled.div`
  color: ${COLOR_PALETTE.ERROR_COLOR};
`;
