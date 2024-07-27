'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useRouter } from 'next/navigation'; 
import Cookie from 'js-cookie'; 
import { FaLock, FaUser } from 'react-icons/fa'; 
import {jwtDecode} from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUsername } from '@/redux/UserData/userSlice';
import WithRedux from '@/utils/WithRedux';

const LoginForm = () => { 
  const [username, setUsernameState] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('/api/login', { username, password });
      console.log(response.data);
      dispatch(setUsername(response.data.username));
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  useEffect(() => {
    const token = Cookie.get('token');
    if (token) {
      // Handle token expiration
      const tokenExpiry = jwtDecode(token).exp * 1000;
      const now = Date.now();
      if (tokenExpiry < now) {
        // Token has expired
        refreshToken();
      }
    }
  }, []);

  const refreshToken = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh-token`, {}, { withCredentials: true });
    } catch (err) {
      // Handle error (e.g., redirect to login)
      router.push('/login');
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl shadow-lg p-8 bg-white/30 backdrop-blur-md border border-gray-300">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Username"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setUsernameState(e.target.value)}
          />
          <FaUser className="absolute top-3 right-3 text-gray-400" />
        </div>
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <FaLock className="absolute top-3 right-3 text-gray-400" />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don&lsquo;t have an account?
        <a href="/signup" className="text-purple-600 font-semibold hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}

export default WithRedux(LoginForm);
