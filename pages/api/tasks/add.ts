import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { task } = req.body;

      // Forward the request to the backend server
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, task, {
        headers: {
          Cookie: req.headers.cookie, // Forward cookies to the backend
        },
      });

      res.status(response.status).json(response.data);
    } catch (error:any) {
      res.status(500).json({ error: 'Failed to add task', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
