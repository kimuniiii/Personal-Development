/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Textarea } from 'src/components/atoms/Textarea';

import { COLOR_PALETTE } from 'src/styles/color_palette';

const testRequiredProps = {
  name: 'test-textarea',
  placeholder: 'placeholder',
  labelText: 'textarea',
  labelType: 'optionalMarker' as const,
  width: '320px',
  height: '454px',
  isError: false,
  errors: { text: 'text' },
  register: {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
    name: 'text',
  },
};

describe('Textarea', () => {
  describe('初回描画時', () => {
    test('textarea要素が描画されること', () => {
      render(<Textarea {...testRequiredProps} />);
      expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument();
    });
  });
  describe('イベント', () => {
    describe('K という文字を1文字入力した場合', () => {
      test('K が textarea要素 に適用されること', () => {
        render(<Textarea {...testRequiredProps} />);
        userEvent.type(screen.getByRole('textbox'), 'K');
        expect(screen.getByRole('textbox')).toHaveValue('K');
      });
      test('onChangeイベントが発火すること', () => {
        render(<Textarea {...testRequiredProps} />);
        userEvent.type(screen.getByRole('textbox'), 'K');
        expect(testRequiredProps.register.onChange).toHaveBeenCalled();
      });
    });
    describe('Hello World（11文字）を入力した場合', () => {
      test('Hello World が textarea要素 に適用されること', () => {
        render(<Textarea {...testRequiredProps} />);
        userEvent.type(screen.getByRole('textbox'), 'Hello World!');
        expect(screen.getByRole('textbox')).toHaveValue('Hello World!');
      });
      test('onChangeイベントが発火すること', () => {
        render(<Textarea {...testRequiredProps} />);
        userEvent.type(screen.getByRole('textbox'), 'Hello World!');
        expect(testRequiredProps.register.onChange).toHaveBeenCalled();
      });
    });
  });
});
describe('labelText', () => {
  describe('Falsy な値を渡す場合', () => {
    test('label要素なしの textarea要素 が描画されること', () => {
      render(<Textarea {...testRequiredProps} />);
      expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument();
    });
  });
  describe('Truthy な値を渡す場合', () => {
    test('label要素ありの textarea要素 が描画されること', () => {
      render(<Textarea {...testRequiredProps} labelText='labelText' />);
      expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument();
    });
  });
});
describe('fontSizeValue', () => {
  describe('何も渡さない場合（undefinedを渡す場合）', () => {
    test('font-size: 16px が描画されること', () => {
      render(<Textarea {...testRequiredProps} />);
      expect(screen.getByPlaceholderText('placeholder')).toHaveStyle('font-size: 16px;');
    });
  });
  describe('Truthy な値を渡す場合', () => {
    test('propsで渡した fontSizeValue が適用されること', () => {
      render(<Textarea {...testRequiredProps} fontSizeValue='14px' />);
      expect(screen.getByPlaceholderText('placeholder')).toHaveStyle('font-size: 14px;');
    });
  });
});
describe('bgColor', () => {
  describe('何も渡さない場合（undefinedを渡す場合）', () => {
    test('COLOR_PALETTE.WHITE が描画されること', () => {
      render(<Textarea {...testRequiredProps} />);
      expect(screen.getByPlaceholderText('placeholder')).toHaveStyle('background-color: #fff;');
    });
  });
  describe('Truthy な値を渡す場合', () => {
    test('propsで渡した COLOR_PALETTE.GRAY が適用されること', () => {
      render(<Textarea {...testRequiredProps} bgColor={COLOR_PALETTE.GRAY} />);
      expect(screen.getByPlaceholderText('placeholder')).toHaveStyle('background-color: #e4e4e4;');
    });
  });
});
describe('disabled', () => {
  describe('非活性状態の場合（disabled = trueの場合）', () => {
    test('非活性状態のスタイル が適用されること', () => {
      render(<Textarea {...testRequiredProps} disabled={true} />);
      expect(screen.getByPlaceholderText('placeholder')).toHaveStyle(
        'background-color:#e4e4e4; cursor: not-allowed; opacity: 0.3;',
      );
    });
  });
  describe('活性状態の場合（disabled = falseの場合）', () => {
    test('活性状態のスタイル が適用されること', () => {
      render(<Textarea {...testRequiredProps} bgColor={COLOR_PALETTE.GRAY} />);
      expect(screen.getByPlaceholderText('placeholder')).not.toHaveStyle(
        'background-color:#e4e4e4; cursor: not-allowed; opacity: 0.3;',
      );
    });
  });
});
