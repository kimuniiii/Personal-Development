import { IoIosArrowDown } from 'react-icons/io/index';
import React from 'react';
import styled from '@emotion/styled';

import type { UseFormRegisterReturn } from 'react-hook-form';
import type { ValueOf } from 'typings/ValueOf';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

type SelectBoxProps = {
  id: string;
  top: string;
  width: `${number}px` | `${number}%` | `${number}vw`;
  optionList: string[];
  register: UseFormRegisterReturn;
  fontSizeValue?: ValueOf<typeof FONT_SIZE>;
  labelText?: string;
  subText?: string;
};

export const SelectBox = React.forwardRef<HTMLSelectElement, SelectBoxProps>(
  ({ id, top, width, optionList, register, fontSizeValue, labelText = '', subText = '' }, ref) => {
    return (
      <StSelectBoxWrapper width={width} top={top}>
        {labelText !== '' ? (
          <StLabel htmlFor={id} fontSizeValue={fontSizeValue}>
            {labelText}
          </StLabel>
        ) : null}
        <StSelectBoxArea>
          {subText !== '' ? <StSubText>{subText}</StSubText> : null}
          <StSelect id={id} fontSizeValue={fontSizeValue} {...register} ref={ref}>
            {optionList.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </StSelect>
          <IoIosArrowDown width={12} height={12} fill={COLOR_PALETTE.DARK_GRAY} />
        </StSelectBoxArea>
      </StSelectBoxWrapper>
    );
  },
);

SelectBox.displayName = 'SelectBox';

const StSelectBoxWrapper = styled.div<Pick<SelectBoxProps, 'width' | 'top'>>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ width }): `${number}px` | `${number}%` | `${number}vw` => width};

  svg {
    position: absolute;
    top: ${({ top }): string => top};
    left: ${({ width }): string => `calc(${width} - 24px) `};
    pointer-events: none;
    cursor: pointer;
  }
`;

const StSelectBoxArea = styled.div`
  position: relative;
`;

const StSubText = styled.div`
  position: absolute;
  top: -4px;
  left: 8px;
  padding: 0 4px;
  background-color: ${COLOR_PALETTE.WHITE};
  font-size: ${FONT_SIZE.FS_12};
  color: ${COLOR_PALETTE.SPEAR_GRAY};
`;

const StSelect = styled.select<Pick<SelectBoxProps, 'fontSizeValue'>>`
  width: 100%;
  padding: 16px 8px;
  border: 1px solid ${COLOR_PALETTE.DARK_GRAY};
  border-radius: 3px;
  outline: 0;
  font-size: ${({ fontSizeValue }): ValueOf<typeof FONT_SIZE> => fontSizeValue ?? FONT_SIZE.FS_14};
  color: ${COLOR_PALETTE.DARK_GRAY};
  cursor: pointer;

  /* セレクトボックスのデフォルトの下矢印を消すため */
  appearance: none;

  &:hover {
    border: 1px solid ${COLOR_PALETTE.MAIN_COLOR};
  }

  &:focus {
    border: 2px solid ${COLOR_PALETTE.MAIN_COLOR};
  }
`;

const StLabel = styled.label<Pick<SelectBoxProps, 'fontSizeValue'>>`
  padding-bottom: 8px;
  font-size: ${({ fontSizeValue }): ValueOf<typeof FONT_SIZE> => fontSizeValue ?? FONT_SIZE.FS_14};
`;
