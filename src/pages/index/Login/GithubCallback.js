import { getAccessToken, getUserData } from './auth';

export default async function githubCallback(req, res) {
  try {
    const { code, state } = req.query;

    // Verify JWT
    const decoded = jwt.verify(state, process.env.GITHUB_APP_PRIVATE_KEY);
    if (decoded.iss !== process.env.GITHUB_APP_ID) {
      throw new Error('Invalid JWT');
    }

    // Get access token
    const accessToken = await getAccessToken(code);

    // Get user data
    const userData = await getUserData(accessToken);

    // TODO: Sign in user with user data

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
}