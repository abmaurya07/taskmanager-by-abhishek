import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cookie from 'cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, { username, password });

      res.setHeader('Set-Cookie', cookie.serialize('token', response.data.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1, // 1 hour
        path: '/'
      }));

      res.setHeader('Set-Cookie', cookie.serialize('refreshToken', response.data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/'
      }));

      res.status(200).json({ username: response.data.username });
    } catch (error:any) {
      res.status(401).json({ error: 'Invalid credentials', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
