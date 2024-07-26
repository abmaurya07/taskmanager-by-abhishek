'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import WithRedux from '@utils/WithRedux';
import Cookie from 'js-cookie';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Retrieve the token from cookies
      const token = Cookie.get('token');

      console.log('Retrieved token:', token);

      // Check token and redirect if not present
      if (!token) {
        router.push('/login');
      } else {
        setLoading(false); // Token exists, stop loading
      }
    }, [router]);

    if (loading) {
      return <div className='flex min-h-screen items-center justify-center'>Loading...</div>; // Optional: Show a loading spinner or message
    }

    return <WithRedux><WrappedComponent {...props} /></WithRedux>;
  };
};

export default withAuth;
