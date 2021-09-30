import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import type { VFC } from 'react';

type SkeletonProps = {
  width: string;
  height: string;
  borderRadius?: string;
};

export const Skeleton: VFC<SkeletonProps> = ({ width, height, borderRadius }) => {
  return <StSkeleton width={width} height={height} borderRadius={borderRadius} />;
};

const skeletonLoading = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const StSkeleton = styled.div<SkeletonProps>`
  position: relative;
  overflow: hidden;
  width: ${({ width }): string => width};
  height: ${({ height }): string => height};
  border-radius: ${({ borderRadius }): string => borderRadius ?? ''};
  background-color: #e4e4e4;

  &::before {
    content: '';
    display: block;
    width: ${({ width }): string => width};
    height: ${({ height }): string => height};
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    position: absolute;
    top: 0;
    left: 0;
    animation: ${skeletonLoading} 1.2s linear infinite;
  }
`;
