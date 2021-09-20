import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

import type { AuthState } from 'src/typings/lib/AuthState';

import { initialAuthState } from 'src/lib/initialAuthState';

export const useAuth0Api = (
  url: string,
  options: {
    audience: string;
  },
): AuthState => {
  const { audience } = options;
  const { getAccessTokenSilently } = useAuth0();

  const [state, setState] = useState<AuthState>(initialAuthState);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        // auth0-react ではクライアントサイドで「アクセストークン」を取得する
        const accessToken = await getAccessTokenSilently({ audience });
        const res = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            // Add the Authorization header to the existing headers
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.ok) {
          setState({
            isAuthenticated: true,
            isLoading: false,
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          setState({
            error,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      }
    })();
  }, [getAccessTokenSilently]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
};
