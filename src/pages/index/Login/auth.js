import axios from 'axios';
import { useJwt } from "react-jwt";

export function getJWT() {
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, '\n');
  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60,
    iss: process.env.GITHUB_APP_ID,
  };
  const token = useJwt.sign(payload, privateKey, { algorithm: 'RS256' });
  return token;
}

export async function getAccessToken(code) {
  const response = await axios.post(
    `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_APP_CLIENT_ID}&client_secret=${process.env.GITHUB_APP_CLIENT_SECRET}&code=${code}`,
    null,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );
  const accessToken = response.data.access_token;
  return accessToken;
}

export async function getUserData(accessToken) {
  const response = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  const userData = response.data;
  return userData;
}