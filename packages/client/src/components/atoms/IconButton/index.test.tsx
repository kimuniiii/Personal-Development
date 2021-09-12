/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IoIosArrowForward } from 'react-icons/io/index';

import { IconButton } from 'src/components/atoms/IconButton';

const testProps = {
  type: 'button' as const,
  svgComponent: <IoIosArrowForward data-testid='svg-components' />,
  onClick: jest.fn(),
};

describe('IconButton', () => {
  describe('初回描画時', () => {
    describe('contents', () => {
      test('svgComponentをbutton要素に適用すること', () => {
        render(<IconButton {...testProps} />);
        expect(screen.getByTestId('svg-components')).toBeInTheDocument();
      });
    });
    describe('非活性状態の場合', () => {
      test('svgComponentをbutton要素に適用すること', () => {
        render(<IconButton {...testProps} disabled={true} />);
        expect(screen.getByRole('button')).toHaveStyle('cursor: not-allowed; opacity: 0.45;');
      });
    });
    describe('活性状態の場合', () => {
      test('svgComponentをbutton要素に適用すること', () => {
        render(<IconButton {...testProps} disabled={false} />);
        expect(screen.getByRole('button').style.cursor).toBe('');
      });
    });
  });
  describe('event', () => {
    describe('クリックした場合', () => {
      test('props.onClickが発火すること', () => {
        render(<IconButton {...testProps} />);
        userEvent.click(screen.getByTestId('svg-components'));
        expect(testProps.onClick).toHaveBeenCalled();
      });
    });
  });
});
