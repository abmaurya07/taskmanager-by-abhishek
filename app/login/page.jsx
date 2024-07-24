'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/login', { username, password });
      localStorage.setItem('token', data.token); // Store token in local storage
      router.push('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="p-2 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">Login</button>
      </form>
      <p className="mt-4">Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
    </div>
  );
};

export default Login;
