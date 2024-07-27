import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      const { taskId, status } = req.body;
      const { token, refreshToken } = req.cookies;

      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/status/${taskId}`, { status }, {
        headers: {
          'Cookie': `token=${token}; refreshToken=${refreshToken}`,
        },
      });

      res.status(response.status).json(response.data);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to update task status', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
