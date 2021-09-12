/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from 'src/components/atoms/Checkbox';

const testProps = {
  labelText: 'labelText',
  register: {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
    name: 'Checkbox',
  },
};

describe('Checkbox', () => {
  describe('初回描画時', () => {
    describe('labelText', () => {
      test('props.labelTextをspan要素に適用すること', () => {
        render(<Checkbox {...testProps} />);
        expect(screen.getByText('labelText')).toBeInTheDocument();
      });
    });
  });
  describe('クリックした場合', () => {
    test('register.onChangeが発火すること', () => {
      render(<Checkbox {...testProps} />);
      userEvent.click(screen.getByText('labelText'));
      expect(testProps.register.onChange).toHaveBeenCalledTimes(1);
    });
  });
  describe('非活性の場合', () => {
    test('disable = true が適用されること', () => {
      render(<Checkbox {...testProps} disabled={true} />);
      expect(screen.getByText('labelText')).toHaveStyle('color: #222;');
    });
  });
});
