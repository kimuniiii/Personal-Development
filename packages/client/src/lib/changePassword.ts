import type { User } from '@auth0/auth0-spa-js';

type ChangePasswordArgs = {
  auth0Domain?: string;
  auth0ClientId?: string;
  user?: User;
};

/**
 * @概要 パスワード変更ボタンをクリックしたときに発火する関数
 * @説明 FIXME : なぜかメールが送信されない問題が起きているので対応が必要
 * @エラー文 FIXME : SyntaxError: Unexpected token W in JSON at position 0"
 * @解決方法 JSON.stringify() を 変数 に格納した上で「body」に紐付ける
 */
export const changePassword = async ({
  auth0Domain,
  auth0ClientId,
  user,
}: ChangePasswordArgs): Promise<void> => {
  console.log('change-password');
  console.log('auth0Domain', auth0Domain);
  console.log('auth0Domain', process.env.NEXT_PUBLIC_AUTH0_DOMAIN);
  console.log('auth0ClientId', auth0ClientId);
  console.log('auth0ClientId', process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID);
  console.log('user?.email', user?.email);

  const jsonBodyData = JSON.stringify({
    client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    email: user?.email,
    connection: 'Username-Password-Authentication',
  });

  console.log('jsonBodyData', jsonBodyData);

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/dbconnections/change_password`,
    {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: jsonBodyData,
    },
  );

  console.log('res.text()');
  console.log(res.text());
};