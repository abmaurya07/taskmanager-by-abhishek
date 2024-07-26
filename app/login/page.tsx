'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import { FaLock, FaUser } from 'react-icons/fa';
import { SiNextdotjs, SiNodedotjs, SiMongodb, SiRedux, SiTailwindcss } from 'react-icons/si';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/login', { username, password });
      Cookie.set('token', data.token, { expires: 1, sameSite: 'lax' });
      router.push('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
<div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-purple-200 to-blue-200">
      {/* Left Side - Platform Details */}
      <div className="lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center items-center lg:items-start">
        <h1 className="text-3xl lg:text-4xl font-extrabold mb-6 text-center lg:text-left text-gray-800">Task Management App</h1>
        <p className="text-base lg:text-lg text-gray-700 mb-6 text-center lg:text-left">
          A personal project to showcase skills in full-stack development. Manage your tasks efficiently with a clean, intuitive interface.
        </p>
        <div className="overflow-hidden w-full relative">
          <div className="absolute inset-0 flex items-center space-x-4 animate-scroll">
            {/* Technology Icons */}
            <div className="flex items-center space-x-4 p-4">
              <SiNextdotjs className="text-4xl lg:text-5xl text-gray-600" />
              <span className="text-lg lg:text-xl font-semibold">Next.js</span>
            </div>
            <div className="flex items-center space-x-4 p-4">
              <SiNodedotjs className="text-4xl lg:text-5xl text-gray-600" />
              <span className="text-lg lg:text-xl font-semibold">Node.js</span>
            </div>
            <div className="flex items-center space-x-4 p-4">
              <SiMongodb className="text-4xl lg:text-5xl text-gray-600" />
              <span className="text-lg lg:text-xl font-semibold">MongoDB</span>
            </div>
            <div className="flex items-center space-x-4 p-4">
              <SiRedux className="text-4xl lg:text-5xl text-gray-600" />
              <span className="text-lg lg:text-xl font-semibold">Redux</span>
            </div>
            <div className="flex items-center space-x-4 p-4">
              <SiTailwindcss className="text-4xl lg:text-5xl text-gray-600" />
              <span className="text-lg lg:text-xl font-semibold">Tailwind CSS</span>
            </div>
            {/* Repeat items to ensure seamless scrolling */}
            <div className="flex items-center space-x-4 p-4">
              <SiNextdotjs className="text-4xl lg:text-5xl text-gray-600" />
              <span className="text-lg lg:text-xl font-semibold">Next.js</span>
            </div>
            <div className="flex items-center space-x-4 p-4">
              <SiNodedotjs className="text-4xl lg:text-5xl text-gray-600" />
              <span className="text-lg lg:text-xl font-semibold">Node.js</span>
            </div>
            <div className="flex items-center space-x-4 p-4">
              <SiMongodb className="text-4xl lg:text-5xl text-gray-600" />
              <span className="text-lg lg:text-xl font-semibold">MongoDB</span>
            </div>
            <div className="flex items-center space-x-4 p-4">
              <SiRedux className="text-4xl lg:text-5xl text-gray-600" />
              <span className="text-lg lg:text-xl font-semibold">Redux</span>
            </div>
            <div className="flex items-center space-x-4 p-4">
              <SiTailwindcss className="text-4xl lg:text-5xl text-gray-600" />
              <span className="text-lg lg:text-xl font-semibold">Tailwind CSS</span>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center lg:text-left text-gray-800">Technologies Used</h2>
          <div className="text-gray-700 space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Frontend Libraries</h3>
              <ul className="list-disc pl-5">
                <li><strong>Next.js:</strong> Framework for server-rendered React applications</li>
                <li><strong>React:</strong> JavaScript library for building user interfaces</li>
                <li><strong>Redux Toolkit:</strong> A set of tools for managing global state</li>
                <li><strong>Axios:</strong> Promise-based HTTP client for the browser and Node.js</li>
                <li><strong>js-cookie:</strong> JavaScript API for handling cookies</li>
                <li><strong>React Icons:</strong> Collection of popular icon libraries as React components</li>
                <li><strong>React Datepicker:</strong> Date picker component for React</li>
                <li><strong>React Redux:</strong> React bindings for Redux</li>
                <li><strong>Redux Persist:</strong> Persist and rehydrate Redux state across sessions</li>
                <li><strong>Tailwind CSS:</strong> Utility-first CSS framework</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Backend Libraries</h3>
              <ul className="list-disc pl-5">
                <li><strong>Express:</strong> Fast, unopinionated, minimalist web framework for Node.js</li>
                <li><strong>Mongoose:</strong> MongoDB object modeling tool designed to work in an asynchronous environment</li>
                <li><strong>jsonwebtoken:</strong> Library for generating and verifying JSON Web Tokens</li>
                <li><strong>bcryptjs:</strong> Library to hash passwords</li>
                <li><strong>cookie-parser:</strong> Middleware for handling cookies</li>
                <li><strong>cors:</strong> Package to enable Cross-Origin Resource Sharing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center lg:justify-center m-2 lg:w-1/2 p-6 lg:p-12">
        <div className="w-full max-w-md rounded-xl shadow-lg p-8 bg-white/30 backdrop-blur-md border border-gray-300">
          <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <FaUser className="absolute top-3 right-3 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
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
            Don't have an account?{' '}
            <a href="/signup" className="text-purple-600 font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
