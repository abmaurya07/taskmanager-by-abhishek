// component to render the signup form.
// It is a standalone component that can be used in any part of the application.
// It uses React hooks to manage state.

'use client'
import { useRouter } from 'next/navigation'; 
import React, { useState } from 'react'; 
import axios from 'axios'; 

import { FaUser, FaLock } from 'react-icons/fa'; 

const SignupForm = () => {
    // state variables using the useState hook
    const [username, setUsername] = useState(''); // Store the username input value
    const [password, setPassword] = useState(''); // Store the password input value
    const [error, setError] = useState(''); // Store any error messages
    const [usernameError, setUsernameError] = useState(''); // Store any username error messages
    const [passwordError, setPasswordError] = useState(''); // Store any password error messages

    const router = useRouter();

    //  username validation function
    const validateUsername = (username) => {
        const usernameRegex = /^[a-zA-Z]{6}/; // regular expression for validating the username
        if (!usernameRegex.test(username)) { // Check if the username does not match the regex
            return 'Username must be at least 6 characters long'; // Return the error message
        }
        return ''; // Return an empty string if the username is valid
    };

    //  password validation function
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // regular expression for validating the password
        if (!passwordRegex.test(password)) { // Check if the password does not match the regex
            return 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character'; // Return the error message
        }
        return ''; // Return an empty string if the password is valid
    };

    //  form submission handler function
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Validate the username and password
        const usernameValidationError = validateUsername(username);
        const passwordValidationError = validatePassword(password);

        // If there are validation errors, set the error state variables and return
        if (usernameValidationError || passwordValidationError) {
            setUsernameError(usernameValidationError);
            setPasswordError(passwordValidationError);
            return;
        }

        try {
            // Send a POST request to the server to create a new account
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/signup`, { username, password });
            // Redirect the user to the login page after successful signup
            router.push('/login');
        } catch (err) {
            // If there is an error creating the account, set the error state variable
            setError('Error creating account');
        }
    };

    // render the signup form
    return (
        <div className="w-full max-w-md rounded-xl shadow-lg p-8 bg-white/30 backdrop-blur-md border border-gray-300">
            <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>
            {/* Display any error messages */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {/*  the signup form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* The username input field */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className={`w-full p-3 border ${usernameError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                    <FaUser className="absolute top-3 right-3 text-gray-400" />
                    {/* Display any username error messages */}
                    {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
                </div>
                {/* The password input field */}
                <div className="relative">
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`w-full p-3 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                    <FaLock className="absolute top-3 right-3 text-gray-400" />
                    {/* Display any password error messages */}
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                </div>
                {/* The submit button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
                >
                    Sign Up
                </button>
            </form>
            {/* Display a link to the login page */}
            <p className="mt-4 text-center text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-purple-600 font-semibold hover:underline">
                    Login
                </a>
            </p>
        </div>
    );
};

export default SignupForm
