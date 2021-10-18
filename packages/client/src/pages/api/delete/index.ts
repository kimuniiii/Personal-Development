import { NextApiResponse } from 'next';
// import ManagementClient from 'auth0';

import type { NextApiRequest } from 'next';

// const DEVELOPMENT_AUTH0_CLIENT_ID = 'lGXhyxHZ7KcY035Ng4zbvBYduiJBNBHY';
// const DEVELOPMENT_AUTH0_CLIENT_SECRET =
//   '4h_F-vUcsS9kgoUAnxw4JfMwKxg8S_xY50sVVhsEj2ZFeoOhKz5O0nkmcMmr0WzA';

// const management = new ManagementClient.ManagementClient({
//   domain: 'dev-dt8p9ro2.us.auth0.com',
//   clientId: DEVELOPMENT_AUTH0_CLIENT_ID,
//   clientSecret: DEVELOPMENT_AUTH0_CLIENT_SECRET,
//   scope: 'delete:users',
// });

export default async function deleteAuth0User(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const { auth0UserId } = req.query;
    console.log('auth0UserId', auth0UserId);
    res.status(200).json({ auth0UserId });
    // await management.deleteUser({ id: auth0UserId[0] }, function (err) {
    //   if (err) {
    //     // Handle error.
    //     console.log('> Delete Auth0 user, err = ', err);
    //   }
    //   // User deleted.
    //   console.log('Auth0 user deleted');
    // });
  } catch (error) {
    console.error(error);
  }
}
