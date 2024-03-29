import { css } from '@emotion/react';
import styled from '@emotion/styled';

import React from 'react';
import { IoIosArrowBack } from 'react-icons/io/index';
import { IoIosArrowForward } from 'react-icons/io/index';

import { IconButton } from 'src/components/atoms/IconButton';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

import type { SerializedStyles } from '@emotion/react';
import type { VFC } from 'react';

type PaginationProps = {
  defaultIndex: number;
  lastIndex: number;
  isPagerButton: boolean;
  onClick: (paginationIndex: number) => void;
  className?: string;
};

export const Pagination: VFC<PaginationProps> = ({
  defaultIndex,
  lastIndex,
  isPagerButton,
  onClick,
  className,
}) => {
  return (
    <StPaginationContainer className={className}>
      <IconButton
        aria-label='Go Back Button'
        type='button'
        svgComponent={<IoIosArrowBack size={20} fill={COLOR_PALETTE.DARK_GRAY} />}
        width='40px'
        height='40px'
        padding='8px'
        border='none'
        borderRadius='50%'
        backgroundColor={COLOR_PALETTE.WHITE}
        onClick={(): void => {
          onClick(defaultIndex - 1);
        }}
        disabled={defaultIndex <= 1}
      />
      <Margin right='16px' />
      <StPagerButtonContainer>
        {isPagerButton ? (
          <>
            {[...Array(lastIndex)].map((_, idx) => {
              return (
                <React.Fragment key={idx}>
                  {idx !== 0 ? <Margin right='24px' /> : null}
                  <StPaginationButton
                    disabled={idx + 1 === defaultIndex}
                    onClick={(): void => {
                      onClick(idx + 1);
                    }}
                  >
                    {idx + 1}
                  </StPaginationButton>
                </React.Fragment>
              );
            })}
          </>
        ) : (
          <>
            <span>{defaultIndex}</span>
            <Margin right='4px' />/<Margin right='4px' />
            <span>{lastIndex}</span>
          </>
        )}
      </StPagerButtonContainer>
      <Margin right='16px' />
      <IconButton
        aria-label='Go Forward Button'
        type='button'
        svgComponent={<IoIosArrowForward size={20} fill={COLOR_PALETTE.DARK_GRAY} />}
        width='40px'
        height='40px'
        padding='8px'
        border='none'
        borderRadius='50%'
        backgroundColor={COLOR_PALETTE.WHITE}
        onClick={(): void => {
          onClick(defaultIndex + 1);
        }}
        disabled={defaultIndex >= lastIndex}
      />
    </StPaginationContainer>
  );
};

const StPaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StPagerButtonContainer = styled.p`
  display: flex;
`;

const StPaginationButton = styled.button<{ disabled: boolean }>`
  width: 40px;
  height: 40px;
  border: solid 1px ${COLOR_PALETTE.DARK_GRAY};
  border-radius: 50%;
  background-color: ${COLOR_PALETTE.WHITE};
  font-size: ${FONT_SIZE.FS_16};
  cursor: pointer;

  ${({ disabled }): SerializedStyles | null =>
    disabled
      ? css`
          background-color: ${COLOR_PALETTE.SUB_COLOR};
          color: ${COLOR_PALETTE.WHITE};
          cursor: not-allowed;
        `
      : css`
          &:hover {
            background-color: #e9e9e9;
          }
        `}
`;
