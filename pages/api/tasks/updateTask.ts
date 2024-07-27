import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      const  {id,task}  = req.body;
      console.log(' task:', task);
      console.log('Body task:', req.body);

      console.log('Updating  task:', req.cookies);
      const { token, refreshToken } = req.cookies;

      // Forward the request to the backend server
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, task, {
        headers: {
          'Cookie': `token=${token}; refreshToken=${refreshToken}`, 
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
