/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { OuterLink } from 'src/components/atoms/OuterLink';

const testProps = {
  children: 'OuterLink',
  href: '/login',
};

describe('OuterLink', () => {
  describe('初回描画時', () => {
    test('children を anchor要素 に適用すること', () => {
      render(<OuterLink {...testProps} />);
      expect(screen.getByText('OuterLink')).toBeInTheDocument();
    });
  });
  describe('event', () => {
    describe('クリックした場合', () => {
      test('href で指定したパスに画面遷移すること', () => {
        render(<OuterLink {...testProps} />);
        userEvent.click(screen.getByText('OuterLink'));
        expect(testProps.href).toBe('/login');
      });
    });
  });
  describe('fontSizeValue', () => {
    describe('props で 16pxを 指定した場合', () => {
      test('16px の font-size が適用されること', () => {
        render(<OuterLink {...testProps} fontSizeValue='16px' />);
        expect(screen.getByText('OuterLink')).toHaveStyle('font-size: 16px;');
      });
    });
    describe('props で何も指定しなかった場合', () => {
      test('デフォルト値である 14px の font-size が適用されること', () => {
        render(<OuterLink {...testProps} />);
        expect(screen.getByText('OuterLink')).toHaveStyle('font-size: 14px;');
      });
    });
  });
});
