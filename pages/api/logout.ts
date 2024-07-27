import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async (req: NextApiRequest, res: NextApiResponse) =>{

    const cookies = [
        cookie.serialize('token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: -1, // 1 hour
          path: '/'
        }),
        cookie.serialize('refreshToken', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: -1, // 1 week
          path: '/'
        })
      ];

      res.setHeader('Set-Cookie', cookies);

      res.status(200).json({ message: 'logged out' });

    }
