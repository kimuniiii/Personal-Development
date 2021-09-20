import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { ErrorMessage } from '@hookform/error-message';
import React, { VFC } from 'react';

import type { UseFormRegisterReturn } from 'react-hook-form';
import type { ValueOf } from 'src/typings/utils/ValueOf';

import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

type TextareaProps = JSX.IntrinsicElements['textarea'] & {
  name: string;
  placeholder: string;
  isError: boolean;
  errors: Record<string, unknown>;
  register: UseFormRegisterReturn;
  width: string;
  height: string;
  id?: string;
  labelText?: string;
  disabled?: boolean;
  fontSizeValue?: ValueOf<typeof FONT_SIZE>;
  bgColor?: ValueOf<typeof COLOR_PALETTE>;
};

export const Textarea: VFC<TextareaProps> = ({
  name,
  placeholder,
  isError,
  errors,
  register,
  width,
  height,
  id = 'textarea',
  labelText = '',
  disabled = false,
  fontSizeValue,
  bgColor,
  ...textAreaProps
}) => {
  return (
    <StTextField>
      {labelText !== '' ? (
        <StLabel htmlFor={id} fontSizeValue={fontSizeValue}>
          {labelText}
        </StLabel>
      ) : null}
      <StTextarea
        {...textAreaProps}
        id={id}
        placeholder={placeholder}
        isError={isError}
        width={width}
        height={height}
        disabled={disabled}
        fontSizeValue={fontSizeValue}
        bgColor={bgColor}
        {...register}
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
};

Textarea.displayName = 'TextArea';

const StTextField = styled.div`
  display: flex;
  flex-direction: column;
`;

const StLabel = styled.label<Pick<TextareaProps, 'fontSizeValue'>>`
  padding-bottom: 8px;
  font-size: ${({ fontSizeValue }): ValueOf<typeof FONT_SIZE> => fontSizeValue ?? FONT_SIZE.FS_16};
  cursor: pointer;
`;

type StTextareaProps = Pick<
  TextareaProps,
  'width' | 'height' | 'fontSizeValue' | 'bgColor' | 'disabled' | 'isError'
>;

const StTextarea = styled.textarea<StTextareaProps>`
  display: block;
  width: ${({ width }): string => width};
  height: ${({ height }): string => height};
  padding: 8px 16px;
  border: solid 1px ${COLOR_PALETTE.DARK_GRAY};
  border-radius: 3px;
  outline: 0;
  font-size: ${({ fontSizeValue }): ValueOf<typeof FONT_SIZE> => fontSizeValue ?? FONT_SIZE.FS_16};
  color: ${COLOR_PALETTE.BLACK};
  background-color: ${({ bgColor }): ValueOf<typeof COLOR_PALETTE> =>
    bgColor ?? COLOR_PALETTE.WHITE};
  cursor: pointer;
  /*
  ** テキストエリアのサイズを変更不可にするため
  */
  resize: none;

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

  ${({ disabled }): SerializedStyles | null =>
    disabled
      ? css`
          background-color: ${COLOR_PALETTE.GRAY};
          cursor: not-allowed;
          opacity: 0.3;
        `
      : null}
`;

const StErrorMessage = styled.div`
  color: ${COLOR_PALETTE.ERROR_COLOR};
`;
