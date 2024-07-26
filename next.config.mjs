/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/dashboard',
          permanent: true, // Set to false if you might want to change this behavior in the future
        },
      ];
    },
  };
  
  export default nextConfig;
  