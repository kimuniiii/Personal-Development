import type { GetTokenSilentlyOptions } from '@auth0/auth0-react';
import type { User } from '@auth0/auth0-spa-js';

type DeleteUserArgs = {
  getAccessTokenSilently: (options?: GetTokenSilentlyOptions) => Promise<string>;
  auth0Domain?: string;
  auth0ClientId?: string;
  user?: User;
};

/**
 * @概要 退会するボタンをクリックしたときに発火する関数
 */
export const deleteUser = async ({
  auth0Domain,
  auth0ClientId,
  user,
  getAccessTokenSilently,
}: DeleteUserArgs): Promise<Response> => {
  console.log('delete-user');
  console.log('===================');
  console.log('user', user);
  console.log('user?.sub', user?.sub);

  console.log('auth0Domain は 値が入っているはず');
  console.log('auth0Domain', auth0Domain);

  console.log('process.env.NEXT_PUBLIC_AUTH0_DOMAIN は undefined');
  console.log('process.env.NEXT_PUBLIC_AUTH0_DOMAIN', process.env.NEXT_PUBLIC_AUTH0_DOMAIN);

  console.log('auth0ClientId は 値が入っているはず');
  console.log('auth0ClientId', auth0ClientId);

  console.log('process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID は undefined');
  console.log('process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID', process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID);

  console.log('process.env.NEXT_PUBLIC_VERCEL_ENV', process.env.NEXT_PUBLIC_VERCEL_ENV);
  console.log('===================');

  const AUTH0_DOMAIN = auth0Domain || process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '';

  const accessToken = await getAccessTokenSilently({
    audience: `https://${AUTH0_DOMAIN}/api/v2/`,
    scope: 'delete:users',
  });

  console.log('accessToken', accessToken);

  const userDeleteByIdUrl = `https://${AUTH0_DOMAIN}/api/v2/users/${user?.sub}`;

  console.log('userDeleteByIdUrl', userDeleteByIdUrl);

  const userDeleteResponse = await fetch(userDeleteByIdUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return userDeleteResponse;
};
