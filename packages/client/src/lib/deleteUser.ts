import type { User } from '@auth0/auth0-spa-js';

type DeleteUserArgs = {
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
}: DeleteUserArgs): Promise<Response> => {
  console.log('delete-user');
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

  const AUTH0_CONNECTION =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
      ? 'Riot-EC-Site-Development-Database'
      : process.env.NEXT_PUBLIC_VERCEL_ENV === 'staging'
      ? 'Riot-EC-Site-Staging-Database'
      : process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? 'Riot-EC-Site-Production-Database'
      : '';

  const jsonBodyData = JSON.stringify({
    client_id: auth0ClientId,
    email: user?.email,
    connection: AUTH0_CONNECTION,
  });

  console.log('jsonBodyData', jsonBodyData);

  const res = await fetch(`https://login.auth0.com/api/v2/users/${user?.sub}`, {
    method: 'DELETE',
    // mode: 'no-cors',
    // credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: jsonBodyData,
  });

  return res;
};
