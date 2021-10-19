/* eslint-disable @typescript-eslint/no-var-requires */
const ManagementClient = require('auth0').ManagementClient;
// const AuthenticationClient = require('auth0').AuthenticationClient;
// eslint-disable-next-line import/order
const express = require('express');

const app = express();

const hostname = 'localhost';
const port = 8000;

const DEVELOPMENT_AUTH0_CLIENT_ID = 'lGXhyxHZ7KcY035Ng4zbvBYduiJBNBHY';
const DEVELOPMENT_AUTH0_CLIENT_SECRET =
  '4h_F-vUcsS9kgoUAnxw4JfMwKxg8S_xY50sVVhsEj2ZFeoOhKz5O0nkmcMmr0WzA';

// const auth0 = new AuthenticationClient({
//   domain: 'dev-dt8p9ro2.us.auth0.com',
//   clientId: DEVELOPMENT_AUTH0_CLIENT_ID,
//   clientSecret: DEVELOPMENT_AUTH0_CLIENT_SECRET,
// });

app.get('/user-delete', (_req, res) => {
  console.log('Auth0 user deleted start');

  // auth0.clientCredentialsGrant(
  //   {
  //     audience: 'https://dev-dt8p9ro2.us.auth0.com/api/v2/',
  //     scope: 'delete:users',
  //   },
  //   function (err, response) {
  //     if (response) {
  //       console.log(response.access_token);

  const TEST_ACCESS_TOKEN =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImR4UzF0Um9LVnY2NzV6SGxEcVdJUCJ9.eyJpc3MiOiJodHRwczovL2Rldi1kdDhwOXJvMi51cy5hdXRoMC5jb20vIiwic3ViIjoialB6dHpDVHZmczZyb2dFOHJNM1RjNERMbFU1RjlVdTdAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LWR0OHA5cm8yLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjM0NjA3Mjg5LCJleHAiOjE2MzQ2OTM2ODksImF6cCI6ImpQenR6Q1R2ZnM2cm9nRThyTTNUYzRETGxVNUY5VXU3Iiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.L-j9Yxn6YxDNlVyXl4RxusgkmvnVtOxct53DF8-LqNlYn1XEVjNUyg7-xN3tZst8iwCpdnurDzoSjGFKlgXQtVW0PTbgdfEg7jDE-ErfEI9wbM-DQULxPQYiEJIOOEx0CMoR0o74QfKOs2MIMV65-tQRvLAXH1viGr8XSFC7OTGdAhRIvQVgrDjboDVcTRFJWEbBiQY6BZVeZSUzzgbZdH1DztquWCABHPcqTxIhWctjE6HsK1u1MhEzPrRgBF2zGRzSb-eshSySqvQsRfMlvlAugBnX0qiN1h1iPQbF-FSc8QMjdRketdHCkrjb61h8W-9MBo2JfPO9XEcKX09lIQ';

  const management = new ManagementClient({
    token: TEST_ACCESS_TOKEN,
    domain: 'dev-dt8p9ro2.us.auth0.com',
    clientId: DEVELOPMENT_AUTH0_CLIENT_ID,
    clientSecret: DEVELOPMENT_AUTH0_CLIENT_SECRET,
    scope: 'delete:users',
  });

  // const WITHDRAW_USER_ID = 'auth0|616cfc3033f69200704acab4';
  const KOKK_NP_USER_ID = 'auth0|615afce4c69eb200704af5e3';

  management.deleteUser({ id: KOKK_NP_USER_ID }, function (err) {
    if (err) {
      // Handle error.
      console.log('> Delete Auth0 user, err = ', err);
      res.send('User Delete Failed');
      return;
    }
    // User deleted.
    console.log('Auth0 user deleted complete');
    res.send('User Delete Complete');
  });
});

app.get('/user-update', (_req, res) => {
  res.send('User Update');
});

app.listen(port, hostname, () => {
  console.log(`Express app listening at http://${hostname}:${port}`);
});
