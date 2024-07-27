'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaLock, FaTimes, FaCheck } from 'react-icons/fa';
import CustomButton from './CustomButton';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const validateUsername = (username) => {
        const usernameRegex = /^[a-zA-Z]{6}/;
        if (!usernameRegex.test(username)) {
            return 'Username must be at least 6 characters long';
        }
        return '';
    };

    const validatePassword = (password) => {
        const conditions = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            digit: /\d/.test(password),
            special: /[@$!%*?&]/.test(password),
        };
        return conditions;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const usernameValidationError = validateUsername(username);
        const passwordConditions = validatePassword(password);
        const passwordValidationError = Object.values(passwordConditions).includes(false)
            ? 'Password must meet all the conditions'
            : '';

        if (usernameValidationError || passwordValidationError) {
            setUsernameError(usernameValidationError);
            setPasswordError(passwordValidationError);
            setLoading(false);
            return;
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, { username, password });
            setLoading(false);
            router.push('/login');
        } catch (err) {
            setError('Error creating account');
            setLoading(false);
        }
    };

    const passwordConditions = validatePassword(password);

    return (
        <div className="w-full max-w-md rounded-xl shadow-lg p-8 bg-white/30 backdrop-blur-md border border-gray-300">
            <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className={`w-full p-3 border ${usernameError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                    <FaUser className="absolute top-3 right-3 text-gray-400" />
                    {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
                </div>
                <div className="relative">
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`w-full p-3 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                    <FaLock className="absolute top-3 right-3 text-gray-400" />
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                </div>
                <ul className="space-y-1 text-sm mt-2">
                    <li className={`flex items-center ${passwordConditions.length ? 'text-green-500' : 'text-red-500'}`}>
                        {passwordConditions.length ? <FaCheck /> : <FaTimes />} At least 8 characters long
                    </li>
                    <li className={`flex items-center ${passwordConditions.uppercase ? 'text-green-500' : 'text-red-500'}`}>
                        {passwordConditions.uppercase ? <FaCheck /> : <FaTimes />} At least one uppercase letter
                    </li>
                    <li className={`flex items-center ${passwordConditions.lowercase ? 'text-green-500' : 'text-red-500'}`}>
                        {passwordConditions.lowercase ? <FaCheck /> : <FaTimes />} At least one lowercase letter
                    </li>
                    <li className={`flex items-center ${passwordConditions.digit ? 'text-green-500' : 'text-red-500'}`}>
                        {passwordConditions.digit ? <FaCheck /> : <FaTimes />} At least one digit
                    </li>
                    <li className={`flex items-center ${passwordConditions.special ? 'text-green-500' : 'text-red-500'}`}>
                        {passwordConditions.special ? <FaCheck /> : <FaTimes />} At least one special character
                    </li>
                </ul>
                <CustomButton type='submit' loading={loading}>
                    Sign Up
                </CustomButton>
            </form>
            <p className="mt-4 text-center text-gray-600">
                Already have an account?
                <a href="/login" className="text-purple-600 font-semibold hover:underline">
                    Login
                </a>
            </p>
        </div>
    );
};

export default SignupForm;
