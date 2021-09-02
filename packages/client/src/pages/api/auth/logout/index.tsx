import { NextApiRequest, NextApiResponse } from 'next';

import auth0 from 'src/pages/api/lib/auth0';

/**
 * @概要 auth0のhandleLogoutメソッドを使ってログアウト処理を行う関数
 * @説明 ログアウトボタン押下時には「/api/logout」にアクセスして、postLogoutRedirectでセットしたURLに遷移する
 */
const logout = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    await auth0.handleLogout(req, res);
  } catch (error) {
    console.error(error);
    // res.status(error.status || 500).end(error.message);
  }
};

export default logout;
