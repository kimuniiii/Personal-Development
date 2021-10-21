// import { AuthenticationClient } from 'auth0';
import { ManagementClient } from 'auth0';

import type { NextApiRequest, NextApiResponse } from 'next';

// 403エラーを解消するために絶対に必要な工程
// これは`テスト用アクセストークン`なので、本当は本番環境ではアクセストークンを動的に生成したい
// トークンの有効期限 : 604800(s) = 7日間
// 参考文献 : https://auth0.com/docs/security/tokens/access-tokens/get-management-api-access-tokens-for-production#prerequisites
const TEST_ACCESS_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImR4UzF0Um9LVnY2NzV6SGxEcVdJUCJ9.eyJpc3MiOiJodHRwczovL2Rldi1kdDhwOXJvMi51cy5hdXRoMC5jb20vIiwic3ViIjoialB6dHpDVHZmczZyb2dFOHJNM1RjNERMbFU1RjlVdTdAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LWR0OHA5cm8yLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjM0NzkyMjU5LCJleHAiOjE2MzUzOTcwNTksImF6cCI6ImpQenR6Q1R2ZnM2cm9nRThyTTNUYzRETGxVNUY5VXU3Iiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.i5aExR3jg_gomiRNk1-iouuhgoWxbaspluQ7DN71KQndIGiPL25b_rivry3Xh9TUvyJ9Ayt9DF-K4leKfxtE79CwCbk1b5VnnrYXMqY_Wy9bXgrKIgpd_k30grgRhH_uMyMPMNgWp6PsPxDBb2YbtKD8DUcs6z4WEPhmhdX1QTBGpE808NwRLQsqtjqRnGIxJKuepHni_BvQLHkPpxwAqjVLjqEm0y50zd7hWFKb1mjyzQPL4DknE12lySZJJS2vq0PuPJyiG4QWvN2u7s-_9pRXY1NgzTDM73pdlXx3Whs28K2nDzOWwe9BeUM7QSFcILCdCAAaRFP0zfOPcUFJkw';

console.log('pages / api / [user_id]');
console.log('process.env.AUTH0_DOMAIN', process.env.AUTH0_DOMAIN);
console.log('process.env.AUTH0_CLIENT_ID', process.env.AUTH0_CLIENT_ID);
console.log('process.env.AUTH0_CLIENT_SECRET', process.env.AUTH0_CLIENT_SECRET);

// const authClient = new AuthenticationClient({
//   domain: `${process.env.AUTH0_DOMAIN || 'dev-dt8p9ro2.us.auth0.com'}`,
//   clientId: `${process.env.AUTH0_CLIENT_ID}`,
//   clientSecret: `${process.env.AUTH0_CLIENT_SECRET}`,
// });

// Auth0 GUI Application 側で 以下の観点 でチェックを行う必要がある
// チェック観点1 : Token Endpoint Authentication Method を `POST or Basic` にしているかどうか（None以外）| OK
// チェック観点2 : Grant Types の Client Credentials に チェック を入れているかどうか | OK
// チェック観点3 : MyPage に リダイレクトできるかどうか | NG
// 参考文献 : https://stackoverflow.com/questions/60984893/unauthorized-client-grant-type-authorization-code-not-allowed-for-the-client
export default function deleteAuth0User(req: NextApiRequest, res: NextApiResponse): void {
  try {
    // await authClient.clientCredentialsGrant(
    //   {
    //     audience: `https://${process.env.AUTH0_DOMAIN || 'dev-dt8p9ro2.us.auth0.com'}/api/v2/`,
    //     scope: 'create:client_grants',
    //   },
    //   (err, response) => {
    //     if (err) {
    //       return console.error(err);
    //     }

    //     console.log(response.access_token);

    const management = new ManagementClient({
      token: TEST_ACCESS_TOKEN,
      domain: process.env.AUTH0_DOMAIN || 'dev-dt8p9ro2.us.auth0.com',
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      scope: 'delete:users',
    });

    const { user_id } = req.query;
    console.log('user_id', user_id);

    // string | string[] → string に絞り込む
    if (typeof user_id === 'object') {
      return;
    }

    management.deleteUser({ id: user_id });
    console.log('res.statusCode', res.statusCode);
    res.status(res.statusCode).end();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).end(error.message);
    }
  }
}
