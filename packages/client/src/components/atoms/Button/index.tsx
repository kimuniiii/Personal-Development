import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { buttonStyleTypes } from 'src/components/atoms/Button/buttonStyleTypes';

import { FONT_SIZE } from 'src/styles/font_size';
import { FONT_WEIGHT } from 'src/styles/font_weight';

import type { ValueOf } from 'src/typings/utils/ValueOf';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  type: 'button' | 'submit' | 'reset';
  styleTypes: 'primary' | 'secondary' | 'tertiary' | 'textLink';
  /**
   * 単位を含めた数値を当てはめる
   * e.g : width='200px'
   */
  width: string;
  fontSizeValue: ValueOf<typeof FONT_SIZE>;
  buttonContent: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  padding?: string;
  fontWeight?: ValueOf<typeof FONT_WEIGHT>;
  maxWidth?: string;
  disabled?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type,
      styleTypes,
      buttonContent,
      onClick,
      width,
      fontSizeValue,
      padding,
      fontWeight,
      maxWidth,
      disabled = false,
      ...buttonProps
    },
    ref,
  ) => (
    <StButton
      {...buttonProps}
      ref={ref}
      type={type}
      styleTypes={styleTypes}
      width={width}
      fontSizeValue={fontSizeValue}
      padding={padding}
      fontWeight={fontWeight}
      maxWidth={maxWidth}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonContent}
    </StButton>
  ),
);

Button.displayName = 'Button';

const StButton = styled.button<Omit<ButtonProps, 'buttonContent'>>`
  display: block;
  width: ${({ width }): string => width};
  max-width: ${({ maxWidth }): string | null => (maxWidth !== undefined ? maxWidth : null)};
  padding: ${({ padding }): string => padding ?? '16px'};
  border-radius: 3px;
  outline: none;
  font-size: ${({ fontSizeValue }): string => fontSizeValue};
  font-weight: ${({ fontWeight }): ValueOf<typeof FONT_WEIGHT> => fontWeight ?? FONT_WEIGHT.BOLD};
  text-align: center;
  white-space: nowrap;
  cursor: pointer;

  ${({ disabled }): SerializedStyles | null =>
    disabled !== undefined && disabled
      ? css`
          pointer-events: none;
          opacity: 0.45;
        `
      : null}

  ${({ styleTypes, disabled }): SerializedStyles => {
    switch (styleTypes) {
      case 'primary':
        return disabled
          ? css`
              ${buttonStyleTypes.PRIMARY_DISABLED}
            `
          : css`
              ${buttonStyleTypes.PRIMARY}
            `;
      case 'secondary':
        return disabled
          ? css`
              ${buttonStyleTypes.SECONDARY_DISABLED}
            `
          : css`
              ${buttonStyleTypes.SECONDARY}
            `;
      case 'tertiary':
        return disabled
          ? css`
              ${buttonStyleTypes.TERTIARY_DISABLED}
            `
          : css`
              ${buttonStyleTypes.TERTIARY}
            `;
      case 'textLink':
        return disabled
          ? css`
              ${buttonStyleTypes.TEXT_LINK_DISABLED}
            `
          : css`
              ${buttonStyleTypes.TEXT_LINK}
            `;
    }
  }}
`;
