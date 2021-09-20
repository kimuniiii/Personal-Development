import type { AuthState } from 'src/typings/lib/AuthState';

/**
 * @概要 The initial auth state.
 */
export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
};
