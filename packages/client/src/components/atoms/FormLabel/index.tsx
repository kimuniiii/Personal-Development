import styled from '@emotion/styled';
import React from 'react';

import type { VFC } from 'react';

import { Marker } from 'src/components/atoms/Marker';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_WEIGHT } from 'src/styles/font_weight';

type Props = {
  labelType: 'requiredMarker' | 'optionalMarker';
  labelText: string;
  htmlFor?: string;
};

export const FormLabel: VFC<Props> = ({ labelType, labelText, htmlFor }) => {
  return (
    <React.Fragment>
      {labelType === 'requiredMarker' ? (
        <StFormLabel htmlFor={htmlFor}>
          <StLabelText>{labelText}</StLabelText>
          <Margin right='8px' />
          <Marker text='必須' />
        </StFormLabel>
      ) : null}
      {labelType === 'optionalMarker' ? (
        <StFormLabel htmlFor={htmlFor}>
          <StLabelText>{labelText}</StLabelText>
          <Margin right='8px' />
          <Marker
            text='任意'
            color={COLOR_PALETTE.DARK_GRAY}
            bgColor={COLOR_PALETTE.WHITE}
            border={`1px solid ${COLOR_PALETTE.DARK_GRAY}`}
          />
        </StFormLabel>
      ) : null}
    </React.Fragment>
  );
};

const StFormLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  /* TODO : 固定値ではない対応を行いたい */
  /* TODO : width: 130px; */
`;

const StLabelText = styled.span`
  display: block;
  font-weight: ${FONT_WEIGHT.BOLD};
`;
