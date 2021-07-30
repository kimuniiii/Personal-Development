import styled from '@emotion/styled';

type MarginProps = {
  bottom?: string;
  right?: string;
};

/**
 * @概要 Marginを持つという一点のみに責務を持つコンポーネント
 * @説明 基本的には「8の倍数」でpx指定を行うようにする
 */
export const Margin = styled.span<MarginProps>`
  display: block;
  margin-right: ${({ right }): string => (right !== undefined ? right : '0px')};
  margin-bottom: ${({ bottom }): string => (bottom !== undefined ? bottom : '0px')};
`;
