import styled from '@emotion/styled';

import { Skeleton } from 'src/components/atoms/Skeleton';

import type { VFC } from 'react';

export const PcProductCardSkeleton: VFC = () => {
  return (
    <StPcProductList>
      {[...Array(6)].map((_, idx) => {
        return <Skeleton key={idx} width='126px' height='180px' />;
      })}
    </StPcProductList>
  );
};

const StPcProductList = styled.ul`
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
  /*
  ** 128 + 16 + 128 + 16 + 128 + 8 = 416
  */
  width: 416px;
  padding: 16px 0 32px 0;
`;
