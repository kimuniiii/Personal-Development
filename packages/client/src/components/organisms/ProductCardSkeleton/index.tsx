import styled from '@emotion/styled';

import type { VFC } from 'react';

import { Skeleton } from 'src/components/atoms/Skeleton';

export const ProductCardSkeleton: VFC = () => {
  return (
    <StProductList>
      {[...Array(5)].map((_, idx) => {
        return <Skeleton key={idx} width='126px' height='180px' />;
      })}
    </StProductList>
  );
};

const StProductList = styled.ul`
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
  /*
  ** 128 + 16 + 128 + 16 + 128 + 8 = 416
  */
  width: 416px;
`;
