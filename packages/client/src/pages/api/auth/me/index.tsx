import { NextApiRequest, NextApiResponse } from 'next';

import auth0 from 'src/pages/api/lib/auth0';

/**
 * @概要 プロフィール情報を取得するAPI関数
 * @説明 SNSでログインを行った場合、ユーザー名やアイコンに設定している画像などが表示される
 */
const me = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    await auth0.handleProfile(req, res);
  } catch (error) {
    console.error(error);
    // res.status(error.status || 500).end(error.message);
  }
};

export default me;
