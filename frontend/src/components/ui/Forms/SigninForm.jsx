import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const SigninForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle signin logic here
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl px-8 py-10 border border-blue-100 font-[Inter,sans-serif]"
            style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}
        >
            <div className="mb-5 text-center">
                <h3 className="text-xl font-semibold text-blue-900 mb-1 tracking-tight">Sign in to your account</h3>
                <p className="text-xs text-blue-400">Welcome back! Please enter your details.</p>
            </div>
            <div className="space-y-6">
                <div className="relative">
                    <input
                        className="peer w-full px-4 py-2 border border-blue-100 rounded-lg bg-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-50 outline-none transition placeholder-transparent text-blue-900 font-medium shadow-sm"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        placeholder=" "
                        style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}
                    />
                    <label
                        htmlFor="email"
                        className="absolute left-4 top-2 text-blue-300 text-sm transition-all
                            peer-placeholder-shown:top-2
                            peer-placeholder-shown:text-sm
                            peer-placeholder-shown:text-blue-300
                            peer-focus:-top-4
                            peer-focus:text-xs
                            peer-focus:text-blue-500
                            peer-focus:bg-white/80
                            px-1 pointer-events-none font-medium
                            peer-not-placeholder-shown:-top-4
                            peer-not-placeholder-shown:text-xs
                            peer-not-placeholder-shown:text-blue-500
                            bg-white/80"
                        style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}
                    >
                        Email
                    </label>
                </div>
                <div className="relative">
                    <input
                        className="peer w-full px-4 py-2 border border-blue-100 rounded-lg bg-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-50 outline-none transition placeholder-transparent text-blue-900 font-medium shadow-sm"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                        autoComplete="current-password"
                        placeholder=" "
                        style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}
                    />
                    <label
                        htmlFor="password"
                        className="absolute left-4 top-2 text-blue-300 text-sm transition-all
                            peer-placeholder-shown:top-2
                            peer-placeholder-shown:text-sm
                            peer-placeholder-shown:text-blue-300
                            peer-focus:-top-4
                            peer-focus:text-xs
                            peer-focus:text-blue-500
                            peer-focus:bg-white/80
                            px-1 pointer-events-none font-medium
                            peer-not-placeholder-shown:-top-4
                            peer-not-placeholder-shown:text-xs
                            peer-not-placeholder-shown:text-blue-500
                            bg-white/80"
                        style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}
                    >
                        Password
                    </label>
                </div>
            </div>
            <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-blue-400 to-indigo-400 text-white font-semibold rounded-lg shadow hover:from-blue-500 hover:to-indigo-500 transition text-base tracking-wide"
                style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}
            >
                Sign In
            </button>
            <p className="text-center text-xs text-blue-400 mt-3">
                Don't have an account?{' '}
                <Link to="/signup" className="text-indigo-500 hover:underline font-medium">
                    Sign up
                </Link>
            </p>
            <p className="text-center text-xs text-blue-400 mt-2">
                Forgot your password?{' '}
                <Link to='/forgot-password' className="text-indigo-500 hover:underline font-medium">
                    Reset it
                </Link>
            </p>
        </form>
    );
};

export default SigninForm