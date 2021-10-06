import styled from '@emotion/styled';

import type { VFC } from 'react';
import type { ValueOf } from 'src/typings/utils/ValueOf';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

type Props = {
  text: string;
  color?: ValueOf<typeof COLOR_PALETTE>;
  bgColor?: ValueOf<typeof COLOR_PALETTE>;
  width?: `${number}px`;
  height?: `${number}px`;
  fontSizeValue?: ValueOf<typeof FONT_SIZE>;
  border?: string;
  opacity?: number;
};

export const Marker: VFC<Props> = ({
  text,
  width,
  height,
  fontSizeValue,
  color,
  bgColor,
  border,
  opacity,
}) => {
  return (
    <StMarkerContainer
      width={width}
      height={height}
      fontSizeValue={fontSizeValue}
      color={color}
      bgColor={bgColor}
      border={border}
      opacity={opacity}
    >
      {text}
    </StMarkerContainer>
  );
};

const StMarkerContainer = styled.div<Omit<Props, 'text'>>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 4px;
  font-size: ${({ fontSizeValue }): ValueOf<typeof FONT_SIZE> => fontSizeValue ?? '12px'};
  width: ${({ width }): `${number}px` => width ?? '40px'};
  height: ${({ height }): `${number}px` | undefined => height ?? '20px'};
  color: ${({ color }): ValueOf<typeof COLOR_PALETTE> | undefined => color ?? COLOR_PALETTE.BLACK};
  background-color: ${({ bgColor }): ValueOf<typeof COLOR_PALETTE> | null =>
    bgColor !== undefined ? bgColor : null};
  border: ${({ border }): string => border ?? `2px solid ${COLOR_PALETTE.ERROR_COLOR}`};
  opacity: ${({ opacity }): number | null => (opacity !== undefined ? opacity : null)};
`;
