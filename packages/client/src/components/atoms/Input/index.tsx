import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';

import { FormLabel } from 'src/components/atoms/FormLabel';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

import type { SerializedStyles } from '@emotion/react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import type { ValueOf } from 'src/typings/utils/ValueOf';

type InputProps = JSX.IntrinsicElements['input'] & {
  type: string;
  name: string;
  placeholder: string;
  isError: boolean;
  errors: Record<string, unknown>;
  register: UseFormRegisterReturn;
  width: string;
  labelText: string;
  labelType: 'requiredMarker' | 'optionalMarker';
  id?: string;
  disabled?: boolean;
  fontSizeValue?: ValueOf<typeof FONT_SIZE>;
  bgColor?: ValueOf<typeof COLOR_PALETTE>;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      placeholder,
      isError,
      errors,
      register,
      width,
      labelText,
      labelType,
      id = 'text-input',
      disabled = false,
      fontSizeValue,
      bgColor,
      ...textInputProps
    },
    ref,
  ) => {
    return (
      <StTextField>
        {labelText !== '' ? (
          <>
            <FormLabel htmlFor={id} labelType={labelType} labelText={labelText} />
            <Margin bottom='8px' />
          </>
        ) : null}
        <StInput
          {...textInputProps}
          type={type}
          id={id}
          placeholder={placeholder}
          isError={isError}
          width={width}
          disabled={disabled}
          fontSizeValue={fontSizeValue}
          bgColor={bgColor}
          {...register}
          ref={ref}
        />
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
      </StTextField>
    );
  },
);

Input.displayName = 'TextInput';

const StTextField = styled.div`
  display: flex;
  flex-direction: column;
`;

type StInputProps = Pick<
  InputProps,
  'width' | 'fontSizeValue' | 'bgColor' | 'disabled' | 'isError'
>;

const StInput = styled.input<StInputProps>`
  /* 通常時のスタイル */
  display: block;
  width: ${({ width }): string => width};
  height: 52px;
  padding: 0 16px;
  border: solid 1px ${COLOR_PALETTE.DARK_GRAY};
  border-radius: 3px;
  outline: 0;
  font-size: ${({ fontSizeValue }): ValueOf<typeof FONT_SIZE> => fontSizeValue ?? FONT_SIZE.FS_16};
  color: ${COLOR_PALETTE.BLACK};
  background-color: ${({ bgColor }): ValueOf<typeof COLOR_PALETTE> =>
    bgColor ?? COLOR_PALETTE.WHITE};
  cursor: pointer;

  &:hover {
    border: 1px solid ${COLOR_PALETTE.MAIN_COLOR};
  }

  &:focus {
    border: 2px solid ${COLOR_PALETTE.MAIN_COLOR};
  }

  &::placeholder {
    font-size: ${({ fontSizeValue }): ValueOf<typeof FONT_SIZE> =>
      fontSizeValue ?? FONT_SIZE.FS_16};
    color: ${COLOR_PALETTE.DARK_GRAY};
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

  /* 非活性状態のスタイル */
  ${({ disabled }): SerializedStyles | null =>
    disabled
      ? css`
          background-color: ${COLOR_PALETTE.GRAY};
          cursor: not-allowed;
          opacity: 0.3;

          &:hover {
            border: 1px solid ${COLOR_PALETTE.DARK_GRAY};
          }

          &:focus {
            border: 1px solid ${COLOR_PALETTE.DARK_GRAY};
          }
        `
      : null}
`;

const StErrorMessage = styled.div`
  color: ${COLOR_PALETTE.ERROR_COLOR};
`;
