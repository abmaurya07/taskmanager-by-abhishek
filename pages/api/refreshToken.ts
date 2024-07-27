import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cookie from 'cookie';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {

      const { refreshToken } = req.cookies;

      // Forward the request to the backend server
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh-token`, '', {
        headers: {
          'Cookie': `refreshToken=${refreshToken}`, 
        },
      });

       // Setting cookies in a single `Set-Cookie` header
       const cookies = [
        cookie.serialize('token', response.data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 1, // 1 hour
          path: '/'
        })
      ];

      res.setHeader('Set-Cookie', cookies);

      res.status(200).json({ username: response.data.username });

      res.status(response.status).json(response.data);
    } catch (error:any) {
      res.status(500).json({ error: 'Failed to add task', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
