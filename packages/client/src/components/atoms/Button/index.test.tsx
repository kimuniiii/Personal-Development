/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from 'src/components/atoms/Button';

import { FONT_SIZE } from 'src/styles/font_size';

import type { ValueOf } from 'src/typings/utils/ValueOf';

const testProps = {
  buttonContent: 'Button',
  fontSizeValue: '16px' as ValueOf<typeof FONT_SIZE>,
  onClick: jest.fn(),
  styleTypes: 'primary' as const,
  type: 'button' as const,
  width: '200px',
};

describe('Button', () => {
  describe('初回描画時', () => {
    describe('contents', () => {
      test('props.buttonContentをbutton要素に適用すること', () => {
        render(<Button {...testProps} />);
        expect(screen.getByText('Button')).toBeInTheDocument();
      });
      test('props.typeをbutton要素に適用すること', () => {
        render(<Button {...testProps} />);
        expect(screen.getByText('Button')).toHaveAttribute('type', 'button');
      });
    });
    describe('style', () => {
      test('props.fontSizeValueをbutton要素に適用すること', () => {
        render(<Button {...testProps} />);
        expect(screen.getByText('Button')).toHaveStyle('font-size: 16px;');
      });
      test('props.styleTypesをbutton要素に適用すること', () => {
        render(<Button {...testProps} />);
        expect(screen.getByText('Button')).toHaveStyle('background-color: #ffc11c; color: #222;');
      });
      test('props.widthをbutton要素に適用すること', () => {
        render(<Button {...testProps} />);
        expect(screen.getByText('Button')).toHaveStyle('width: 200px;');
      });
      test('props.paddingをbutton要素に適用すること', () => {
        render(<Button {...testProps} />);
        expect(screen.getByText('Button')).toHaveStyle('padding: 16px;');
      });
      test('props.fontWeightをbutton要素に適用すること', () => {
        render(<Button {...testProps} />);
        expect(screen.getByText('Button')).toHaveStyle('font-weight: 600;');
      });
      test('props.maxWidthをbutton要素に適用すること', () => {
        render(<Button {...testProps} />);
        expect(screen.getByText('Button').style.maxWidth).toBe('');
      });
    });
    describe('event', () => {
      test('クリックした場合に、props.onClickが発火すること', () => {
        render(<Button {...testProps} />);
        userEvent.click(screen.getByText('Button'));
        expect(testProps.onClick).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('再描画時', () => {
    describe('contents', () => {
      test('props.buttonContentをbutton要素に適用すること', () => {
        render(<Button {...testProps} />);
        expect(screen.getByText('Button')).toBeInTheDocument();
      });
      describe('props.type全てのパターン', () => {
        test('props.type="submit"をbutton要素に適用すること', () => {
          render(<Button {...testProps} type={'submit'} />);
          expect(screen.getByText('Button')).toHaveAttribute('type', 'submit');
        });
        test('props.type="reset"をbutton要素に適用すること', () => {
          render(<Button {...testProps} type={'reset'} />);
          expect(screen.getByText('Button')).toHaveAttribute('type', 'reset');
        });
      });
    });
    describe('style', () => {
      test('props.fontSizeValueをbutton要素に適用すること', () => {
        render(<Button {...testProps} fontSizeValue={'18px'} />);
        expect(screen.getByText('Button')).toHaveStyle('font-size: 18px;');
      });
      describe('props.disabled=falseの場合', () => {
        test('props.disabledをbutton要素に適用すること', () => {
          render(<Button {...testProps} />);
          expect(screen.getByText('Button').style.pointerEvents).toBe('');
        });
        describe('props.styleType全てのパターン', () => {
          test('props.styleTypes="secondary"をbutton要素に適用すること', () => {
            render(<Button {...testProps} styleTypes={'secondary'} />);
            expect(screen.getByText('Button')).toHaveStyle(
              'background-color: #1ba1ff; color: #fff;',
            );
          });
          test('props.styleTypes="tertiary"をbutton要素に適用すること', () => {
            render(<Button {...testProps} styleTypes={'tertiary'} />);
            expect(screen.getByText('Button')).toHaveStyle(
              'background-color: #fff; color: #1ba1ff; border: 1px solid #1ba1ff',
            );
          });
          test('props.styleTypes="textLink"をbutton要素に適用すること', () => {
            render(<Button {...testProps} styleTypes={'textLink'} />);
            expect(screen.getByText('Button')).toHaveStyle('color: #1ba1ff;');
            expect(screen.getByText('Button').style.border).toBe('');
          });
        });
      });
      describe('props.disabled=trueの場合', () => {
        test('props.disabledをbutton要素に適用すること', () => {
          render(<Button {...testProps} disabled={true} />);
          expect(screen.getByText('Button')).toHaveStyle('pointer-events: none;');
        });
        describe('props.styleType全てのパターン', () => {
          test('props.styleTypes="primary"をbutton要素に適用すること', () => {
            render(<Button {...testProps} styleTypes={'primary'} disabled={true} />);
            expect(screen.getByText('Button')).toHaveStyle(
              'background-color: #e4e4e4; color: #222;',
            );
          });
          test('props.styleTypes="secondary"をbutton要素に適用すること', () => {
            render(<Button {...testProps} styleTypes={'secondary'} disabled={true} />);
            expect(screen.getByText('Button')).toHaveStyle(
              'background-color: #e4e4e4; color: #222; border: none',
            );
          });
          test('props.styleTypes="tertiary"をbutton要素に適用すること', () => {
            render(<Button {...testProps} styleTypes={'tertiary'} disabled={true} />);
            expect(screen.getByText('Button')).toHaveStyle(
              'background-color: #e4e4e4; color: #222; border: none',
            );
          });
          test('props.styleTypes="textLink"をbutton要素に適用すること', () => {
            render(<Button {...testProps} styleTypes={'textLink'} disabled={true} />);
            expect(screen.getByText('Button')).toHaveStyle(
              'background-color: #e4e4e4; color: #222;',
            );
          });
        });
      });
      test('props.widthをbutton要素に適用すること', () => {
        render(<Button {...testProps} width={'201px'} />);
        expect(screen.getByText('Button')).toHaveStyle('width: 201px;');
      });
      test('props.paddingをbutton要素に適用すること', () => {
        render(<Button {...testProps} padding={'20px'} />);
        expect(screen.getByText('Button')).toHaveStyle('padding: 20px;');
      });
      test('props.fontWeightをbutton要素に適用すること', () => {
        render(<Button {...testProps} fontWeight={300} />);
        expect(screen.getByText('Button')).toHaveStyle('font-weight: 300;');
      });
      test('props.maxWidthをbutton要素に適用すること', () => {
        render(<Button {...testProps} maxWidth={'200px'} />);
        expect(screen.getByText('Button')).toHaveStyle('max-width: 200px;');
      });
    });
  });
});
