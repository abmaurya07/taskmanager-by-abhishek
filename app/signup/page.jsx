'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import axios from 'axios';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signup', { username, password });
      router.push('/login');
    } catch (err) {
      setError('Error creating account');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Sign Up</h1>
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
        <button type="submit" className="p-2 bg-blue-500 text-white">Sign Up</button>
      </form>
      <p className="mt-4">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
    </div>
  );
};

export default Signup;
