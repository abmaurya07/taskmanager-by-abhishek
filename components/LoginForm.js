// Componeny to renders login form.
// It uses React hooks to manage state for the username, password, and error messages.
// When the form is submitted, it sends a POST request to the server to authenticate the user.
// If the authentication is successful, it sets a cookie with the authentication token and redirects the user to the dashboard.
// If the authentication fails, it displays an error message.

'use client'
import React from 'react'
import { useState } from 'react';
import axios from 'axios'; 
import { useRouter } from 'next/navigation'; 
import Cookie from 'js-cookie'; 
import { FaLock, FaUser } from 'react-icons/fa'; 

const LoginForm = () => { 
  // state variables for the username, password, and error messages.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter(); // Next.js router object for routing.


  // function to handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.
    try {
      // Send a POST request to the server to authenticate the user.
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, { username, password });
      // Set a cookie with the authentication token.
      Cookie.set('token', data.token, { expires: 1, sameSite: 'lax' });
      // Redirect the user to the dashboard.
      router.push('/dashboard');
    } catch (err) {
      // If the authentication fails, display an error message.
      setError('Invalid credentials');
    }
  };
  
  // Render the login form.
  return (
    <div className="w-full max-w-md rounded-xl shadow-lg p-8 bg-white/30 backdrop-blur-md border border-gray-300">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display the error message if it exists. */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Username"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="absolute top-3 right-3 text-gray-400" /> {/* Display the username icon. */}
        </div>
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <FaLock className="absolute top-3 right-3 text-gray-400" /> {/* Display the password icon. */}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{' '}
        <a href="/signup" className="text-purple-600 font-semibold hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );}

export default LoginForm