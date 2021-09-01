import { NextApiRequest, NextApiResponse } from 'next';

import auth0 from 'src/pages/api/lib/auth0';

/**
 * @概要 auth0のページで認証後、このAPIにリダイレクトされてクッキーを生成する関数
 * @説明 クッキーを生成した後は、auth0で設定した「callback」にリダイレクトされる
 */
const callback = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    await auth0.handleCallback(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default callback;
