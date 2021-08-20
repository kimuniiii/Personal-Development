import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { BiLoaderCircle } from 'react-icons/bi';

import type { VFC } from 'react';

import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

type LoaderProps = {
  /**
   * loaderCircleSize の値と同じにする
   */
  width: `${number}px`;
  /**
   * loaderCircleSize の値と同じにする
   */
  height: `${number}px`;
  loaderCircleSize: number;
  loadingContent?: string;
};

export const Loader: VFC<LoaderProps> = ({
  width = '50px',
  height = '50px',
  loaderCircleSize = 50,
  loadingContent,
}) => {
  return (
    <StLoaderContainer>
      <StLoader width={width} height={height}>
        <BiLoaderCircle size={loaderCircleSize} fill={COLOR_PALETTE.DARK_GRAY} />
      </StLoader>
      {loadingContent ? (
        <>
          <Margin bottom='8px' />
          <StLoaderExplain>{loadingContent}</StLoaderExplain>
        </>
      ) : null}
    </StLoaderContainer>
  );
};

const loadingSpinner = keyframes`
  from {
    transform: rotate(0deg)
  } to {
    transform: rotate(360deg)
  }
`;

const StLoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StLoader = styled.div<Pick<LoaderProps, 'width' | 'height'>>`
  width: ${({ width }): `${number}px` => width};
  height: ${({ height }): `${number}px` => height};
  animation: ${loadingSpinner} 1.5s infinite linear;
`;

const StLoaderExplain = styled.div`
  width: 180px;
  font-size: ${FONT_SIZE.FS_12};
  color: ${COLOR_PALETTE.DARK_GRAY};
`;
