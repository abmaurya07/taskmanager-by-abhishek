import { NextApiRequest, NextApiResponse } from 'next';
import { axiosInstance } from '@utils/axiosInstance';
import { cookies } from 'next/headers'
import axios from 'axios';


export default async (req: NextApiRequest, res: NextApiResponse) => {


  if (req.method === 'POST') {
    const { username, password } = req.body;

    console.log('username', username, 'password', password)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/logins`, { username, password });

      // Set a cookie with the token received from the backend
      cookies().set('token', response.data.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1, // 1 hour
      });

      // Set a cookie with the refresh token recieved from the backend
      cookies().set('refreshToken', response.data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })


      res.status(200).json(response.data.username);
    } catch (error) {
      res.status(401).json({ error: 'Invalid credentials', message: error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
