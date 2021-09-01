import { NextApiRequest, NextApiResponse } from 'next';

import auth0 from 'src/pages/api/lib/auth0';

/**
 * @概要 auth0のhandleLoginメソッドを使ってauth0のログインページにリダイレクトする関数
 * @説明 ログインボタン押下時には「/api/login」にアクセスして、Auth0のログイン認証画面に遷移する
 */
const login = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    await auth0.handleLogin(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default login;
