// 参考文献
// https://github.com/auth0/auth0-react/blob/master/src/auth-state.tsx

import type { User } from '@auth0/auth0-spa-js';

/**
 * @概要 The auth state which
 * @説明 when combined with the auth methods, make up the return object of the `useAuth0` hook.
 */
export type AuthState<TUser extends User = User> = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: Error;
  user?: TUser;
};

/**
 * @概要 The initial auth state.
 */
export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
};
