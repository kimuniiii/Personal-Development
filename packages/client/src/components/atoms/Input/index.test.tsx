/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from 'src/components/atoms/Input';

import { COLOR_PALETTE } from 'src/styles/color_palette';

const testProps = {
  type: 'text',
  name: 'text',
  placeholder: 'メールアドレスを入力',
  isError: false,
  errors: { text: 'text' },
  register: {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
    name: 'text',
  },
  width: '320px',
  labelText: 'labelText',
};

describe('Input', () => {
  describe('初回描画時', () => {
    test('input要素が描画されること', () => {
      render(<Input {...testProps} />);
      expect(screen.getByPlaceholderText('メールアドレスを入力')).toBeInTheDocument();
    });
  });
  describe('イベント', () => {
    describe('何らかの文字 を入力した場合', () => {
      test('register.onChangeイベントが発火すること', () => {
        render(<Input {...testProps} />);
        userEvent.type(screen.getByRole('textbox'), 'K');
        expect(testProps.register.onChange).toHaveBeenCalledTimes(1);
      });
    });
    describe('Hello World を入力した場合', () => {
      test('Hello World が input要素 に適用されること', () => {
        render(<Input {...testProps} />);
        userEvent.type(screen.getByRole('textbox'), 'Hello World!');
        expect(screen.getByRole('textbox')).toHaveValue('Hello World!');
      });
    });
  });
  describe('labelText', () => {
    describe('空文字を渡す場合', () => {
      test('label要素なしの input要素 が描画されること', () => {
        render(<Input {...testProps} labelText='' />);
        expect(screen.getByPlaceholderText('メールアドレスを入力')).toBeInTheDocument();
      });
    });
    describe('空文字以外の文字列を渡す場合', () => {
      test('label要素ありの input要素 が描画されること', () => {
        render(<Input {...testProps} />);
        expect(screen.getByLabelText('labelText')).toBeInTheDocument();
      });
    });
  });
  describe('fontSizeValue', () => {
    describe('何も渡さない場合（undefinedを渡す場合）', () => {
      test('font-size: 16px が描画されること', () => {
        render(<Input {...testProps} />);
        expect(screen.getByPlaceholderText('メールアドレスを入力')).toHaveStyle('font-size: 16px;');
      });
    });
    describe('Truthy な値を渡す場合', () => {
      test('propsで渡した fontSizeValue が適用されること', () => {
        render(<Input {...testProps} fontSizeValue='14px' />);
        expect(screen.getByPlaceholderText('メールアドレスを入力')).toHaveStyle('font-size: 14px;');
      });
    });
  });
  describe('bgColor', () => {
    describe('何も渡さない場合（undefinedを渡す場合）', () => {
      test('COLOR_PALETTE.WHITE が描画されること', () => {
        render(<Input {...testProps} />);
        expect(screen.getByPlaceholderText('メールアドレスを入力')).toHaveStyle(
          'background-color: #fff;',
        );
      });
    });
    describe('Truthy な値を渡す場合', () => {
      test('propsで渡した COLOR_PALETTE.GRAY が適用されること', () => {
        render(<Input {...testProps} bgColor={COLOR_PALETTE.GRAY} />);
        expect(screen.getByPlaceholderText('メールアドレスを入力')).toHaveStyle(
          'background-color: #e4e4e4;',
        );
      });
    });
  });
  describe('disabled', () => {
    describe('非活性状態の場合（disabled = trueの場合）', () => {
      test('非活性状態のスタイル が適用されること', () => {
        render(<Input {...testProps} disabled={true} />);
        expect(screen.getByPlaceholderText('メールアドレスを入力')).toHaveStyle(
          'background-color:#e4e4e4; cursor: not-allowed; opacity: 0.3;',
        );
      });
    });
    describe('活性状態の場合（disabled = falseの場合）', () => {
      test('活性状態のスタイル が適用されること', () => {
        render(<Input {...testProps} bgColor={COLOR_PALETTE.GRAY} />);
        expect(screen.getByPlaceholderText('メールアドレスを入力')).not.toHaveStyle(
          'background-color:#e4e4e4; cursor: not-allowed; opacity: 0.3;',
        );
      });
    });
  });
});
