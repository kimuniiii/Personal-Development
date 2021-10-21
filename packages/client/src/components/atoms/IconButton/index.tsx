import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import type { SerializedStyles } from '@emotion/react';

export type IconButtonProps = JSX.IntrinsicElements['button'] & {
  type: 'button';
  svgComponent: JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  width?: string;
  height?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
  backgroundColor?: string;
  disabled?: boolean;
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      type,
      svgComponent,
      onClick,
      width,
      height,
      padding,
      border,
      borderRadius,
      backgroundColor,
      disabled,
      ...iconButtonProps
    },
    ref,
  ) => {
    return (
      <StIconButton
        {...iconButtonProps}
        type={type}
        width={width}
        height={height}
        padding={padding}
        border={border}
        borderRadius={borderRadius}
        backgroundColor={backgroundColor}
        disabled={disabled}
        onClick={onClick}
        ref={ref}
      >
        {svgComponent}
      </StIconButton>
    );
  },
);

IconButton.displayName = 'IconButton';

const StIconButton = styled.button<Omit<IconButtonProps, 'type' | 'svgComponent' | 'onClick'>>`
  display: flex;
  width: ${({ width }): string => (width !== undefined ? width : 'auto')};
  height: ${({ height }): string => (height !== undefined ? height : 'auto')};
  padding: ${({ padding }): string | null => (padding !== undefined ? padding : null)};
  border: ${({ border }): string =>
    border !== undefined ? border : `1px solid ${COLOR_PALETTE.LIGHT_GRAY}`};
  border-radius: ${({ borderRadius }): string | null => (borderRadius ? borderRadius : null)};
  background-color: ${({ backgroundColor }): string =>
    backgroundColor ? backgroundColor : `${COLOR_PALETTE.WHITE}`};
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #e9e9e9;
  }

  ${({ disabled }): SerializedStyles | null =>
    disabled
      ? css`
          cursor: not-allowed;
          opacity: 0.45;

          &:hover {
            background-color: ${COLOR_PALETTE.WHITE};
          }
        `
      : null}
`;
