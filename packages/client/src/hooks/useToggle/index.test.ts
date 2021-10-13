/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react-hooks';

import { useToggle } from '.';

describe('useToggle Custom Hooks Test', () => {
  describe('initialState = false の場合', () => {
    test('state は `false` になること', () => {
      const { result } = renderHook(() => useToggle(false));
      expect(result.current.state).toBeFalsy();
    });
    test('toggle関数が呼び出されたら`true`になること', () => {
      const { result } = renderHook(() => useToggle(false));
      act(() => result.current.toggle());
      expect(result.current.state).toBeTruthy();
    });
  });
  describe('initialState = true の場合', () => {
    test('state は `true` になること', () => {
      const { result } = renderHook(() => useToggle(true));
      expect(result.current.state).toBeTruthy();
    });
    test('toggle関数が呼び出されたら`false`になること', () => {
      const { result } = renderHook(() => useToggle(true));
      act(() => result.current.toggle());
      expect(result.current.state).toBeFalsy();
    });
  });
});
