import styled from '@emotion/styled';
import Link from 'next/link';

import { OuterLink } from 'src/components/atoms/OuterLink';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';
import { FONT_SIZE } from 'src/styles/font_size';

import type { VFC } from 'react';

type ErrorTemplateProps = {
  error: Error;
};

/**
 * @概要 カスタマイズした`Error Template`
 * @説明 statusCode と errorMessage の紐付けを全てカスタマイズしたいなら使用する
 */
export const ErrorTemplate: VFC<ErrorTemplateProps> = ({ error }) => {
  return (
    <StErrorContainer>
      <h1>
        {error.name}: {error.message}
      </h1>
      <Margin bottom='16px' />
      <p>{error.stack}</p>
      <Margin bottom='16px' />
      <Link href='/' passHref prefetch={false}>
        <OuterLink className='error-outer-link' href='/' fontSizeValue={FONT_SIZE.FS_24}>
          Go back to home page
        </OuterLink>
      </Link>
    </StErrorContainer>
  );
};

const StErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  background-color: ${COLOR_PALETTE.WARNING_COLOR};
  color: ${COLOR_PALETTE.ERROR_COLOR};

  .error-outer-link {
    background-color: ${COLOR_PALETTE.WARNING_COLOR};
    color: ${COLOR_PALETTE.ERROR_COLOR};

    &:hover {
      border-bottom: 1px solid ${COLOR_PALETTE.ERROR_COLOR};
    }
  }
`;
