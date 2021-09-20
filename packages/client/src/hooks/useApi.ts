import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

export const useApi = (
  url: string,
): {
  loading: boolean;
  error: boolean;
  data: null;
} => {
  const { getAccessTokenSilently } = useAuth0();

  const [state, setState] = useState({
    loading: true,
    error: false,
    data: null,
  });

  console.log('useEffectの前');

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        console.log('useEffectの中・getAccessTokenSilentlyの前');
        // auth0-react ではクライアントサイドで「アクセストークン」を取得する
        const accessToken = await getAccessTokenSilently();
        console.log('accessToken', accessToken);
        const res = await fetch(url, {
          headers: {
            // Add the Authorization header to the existing headers
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        console.log('data', data);
        setState({
          ...state,
          data,
          error: false,
          loading: false,
        });
      } catch (error: unknown) {
        setState({
          ...state,
          error: true,
          loading: false,
        });
      }
    })();
  }, [getAccessTokenSilently]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
};
