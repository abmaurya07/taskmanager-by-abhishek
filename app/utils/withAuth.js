'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
      if (!token) {
        router.push('/login');
      }
    }, [token]);

    if (!token) {
      return null; // Or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
