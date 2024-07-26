'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaUser, FaLock } from 'react-icons/fa';
import { SiNextdotjs, SiNodedotjs, SiMongodb, SiRedux, SiTailwindcss, SiExpress } from 'react-icons/si';

const TechIcon = ({ icon: Icon, label }) => (
  <div className="flex items-center space-x-4 p-4">
    <Icon className="text-4xl lg:text-5xl text-gray-600" />
    <span className="text-lg lg:text-xl font-semibold">{label}</span>
  </div>
);

const SignupForm = ({ onSubmit, error, setUsername, setPassword }) => (
  <div className="w-full max-w-md rounded-xl shadow-lg p-8 bg-white/30 backdrop-blur-md border border-gray-300">
    <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>
    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Username"
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
        Sign Up
      </button>
    </form>
    <p className="mt-4 text-center text-gray-600">
      Already have an account?{' '}
      <a href="/login" className="text-purple-600 font-semibold hover:underline">
        Login
      </a>
    </p>
  </div>
);

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  console.log(username, password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signup', { username, password });
      router.push('/login');
    } catch (err) {
      setError('Error creating account');
    }
  };

  const techStack = [
    { icon: SiNextdotjs, label: 'Next.js' },
    { icon: SiNodedotjs, label: 'Node.js' },
    { icon: SiMongodb, label: 'MongoDB' },
    { icon: SiRedux, label: 'Redux' },
    { icon: SiTailwindcss, label: 'Tailwind CSS' },
    { icon: SiExpress, label: 'Express' }
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-purple-200 to-blue-200">
      {/* Left Side - Platform Details */}
      <div className="lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center items-center lg:items-start">
        <h1 className="text-3xl lg:text-4xl font-extrabold mb-6 text-center lg:text-left text-gray-800">
          Task Management App
          <strong className="text-base lg:text-lg text-gray-700 ml-4 mb-6 text-center lg:text-left">
            by Abhishek Maurya
          </strong>
        </h1>
        <h3 className="text-xl lg:text-2xl font-bold mb-6 text-center lg:text-left text-gray-800">
          Tech Stack Used
        </h3>
        <div className="overflow-hidden w-full">
          <div className="flex animate-scroll">
            {techStack.map((tech, index) => (
              <TechIcon key={index} icon={tech.icon} label={tech.label} />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <SignupForm setPassword={setPassword}
        setUsername={setUsername} onSubmit={handleSubmit} error={error} />
      </div>
    </div>
  );
};

export default Signup;
