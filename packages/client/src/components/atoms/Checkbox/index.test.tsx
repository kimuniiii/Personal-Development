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
      test('文字列をlabelTextに適用すること', () => {
        render(<Checkbox {...testProps} />);
        expect(screen.getByText('labelText')).toBeInTheDocument();
      });
      test('undefinedをlabelTextに適用すること', () => {
        render(<Checkbox {...testProps} labelText={undefined} />);
        expect(screen.getByLabelText('', { selector: 'input' })).toBeInTheDocument();
      });
    });
  });
  describe('イベント', () => {
    describe('クリックした場合', () => {
      test('register.onChangeが1回発火すること', () => {
        render(<Checkbox {...testProps} />);
        userEvent.click(screen.getByLabelText('labelText'));
        expect(testProps.register.onChange).toHaveBeenCalledTimes(1);
      });
      test('Checkboxのチェックマークが付くこと', () => {
        render(<Checkbox {...testProps} />);
        userEvent.click(screen.getByLabelText('labelText'));
        expect(screen.getByLabelText('labelText')).toBeChecked();
      });
    });
    describe('ダブルクリックした場合', () => {
      test('register.onChangeが2回発火すること', () => {
        render(<Checkbox {...testProps} />);
        userEvent.dblClick(screen.getByRole('checkbox'));
        expect(testProps.register.onChange).toHaveBeenCalledTimes(4);
      });
      test('Checkboxのチェックマークが外れること', () => {
        render(<Checkbox {...testProps} />);
        userEvent.dblClick(screen.getByLabelText('labelText'));
        expect(screen.getByLabelText('labelText')).not.toBeChecked();
      });
    });
  });
  describe('非活性状態の場合', () => {
    test('disable = true が span要素 に適用されてスタイルが変更されること', () => {
      render(<Checkbox {...testProps} disabled={true} />);
      expect(screen.getByText('labelText')).toHaveStyle('color: #222;');
    });
  });
  describe('活性状態の場合', () => {
    test('disable = false が span要素 に適用されてスタイルが変更されること', () => {
      render(<Checkbox {...testProps} disabled={false} />);
      expect(screen.getByText('labelText')).toHaveStyle('color: #1c5db5;');
    });
  });
});
