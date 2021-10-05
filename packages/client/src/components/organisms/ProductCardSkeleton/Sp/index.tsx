import styled from '@emotion/styled';

import type { VFC } from 'react';

import { Skeleton } from 'src/components/atoms/Skeleton';

export const SpProductCardSkeleton: VFC = () => {
  return (
    <StSpProductList>
      {[...Array(6)].map((_, idx) => {
        return <Skeleton key={idx} width='348px' height='180px' />;
      })}
    </StSpProductList>
  );
};

const StSpProductList = styled.ul`
  display: flex;
  flex-flow: column wrap;
  /* TODO : Safari で表示崩れが起きるため */
  row-gap: 16px;
  width: 348px;
  padding-top: 16px;
`;
