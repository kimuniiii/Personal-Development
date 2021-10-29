import styled from '@emotion/styled';

type PositionProps = {
  type: 'absolute' | 'relative' | 'fixed';
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  translateX?: string;
  translateY?: string;
  zIndex?: number;
};

/**
 * @概要 Position Utility Component
 * @説明 positionに依存しないコンポーネントを作成するために使用する
 */
export const Position = styled.div<PositionProps>`
  position: ${({ type }): 'absolute' | 'relative' | 'fixed' => type};
  top: ${({ top }): string | null => (top !== undefined ? top : null)};
  bottom: ${({ bottom }): string | null => (bottom !== undefined ? bottom : null)};
  left: ${({ left }): string | null => (left !== undefined ? left : null)};
  right: ${({ right }): string | null => (right !== undefined ? right : null)};
  transform: translateX(
      ${({ translateX }): string | null => (translateX !== undefined ? translateX : null)}
    )
    translateY(${({ translateY }): string | null => (translateY !== undefined ? translateY : null)});
  z-index: ${({ zIndex }): number | null => (zIndex !== undefined ? zIndex : null)};
`;
