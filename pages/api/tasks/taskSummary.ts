import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { token, refreshToken } = req.cookies;

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/getTaskSummary`, {
        headers: {
          'Cookie': `token=${token}; refreshToken=${refreshToken}`,
        },
      });

      res.status(response.status).json(response.data);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to get task summary', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
