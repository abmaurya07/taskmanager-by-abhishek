import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    try {
      const { ids } = req.body;
      const { token, refreshToken } = req.cookies;

      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/bulk-delete`, {
        headers: {
          'Cookie': `token=${token}; refreshToken=${refreshToken}`,
        },
        data: { ids },
      });

      res.status(response.status).json(response.data);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to delete selected tasks', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
