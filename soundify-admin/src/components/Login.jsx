import React, { useState } from 'react';
import useAuth from '../context/useAuth';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

// Inline styles so no other CSS can turn the inputs white
const inputStyle = {
    backgroundColor: '#000000',
    color: '#ffffff',
    caretColor: '#ffffff',
    WebkitTextFillColor: '#ffffff',
};

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !password.trim()) {
            setError('Please enter both username and password.');
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const result = login(username, password);
            if (result.success) {
                toast.success(`Welcome back, ${result.admin.name}!`);
            } else {
                setError(result.message);
                toast.error(result.message);
            }
            setLoading(false);
        }, 300);
    };

    return (
        <div className='min-h-screen w-full bg-[#121212] flex items-center justify-center p-4 selection:bg-[#1db954] selection:text-black'>
            <div className='w-full max-w-md bg-[#181818] border border-gray-800 rounded-2xl shadow-2xl p-8 sm:p-10'>
                <div className='flex flex-col items-center text-center mb-8'>
                    <div className='bg-[#003A10] p-4 rounded-2xl mb-4 shadow-lg flex items-center justify-center'>
                        <img src={assets.logo} alt="Soundify Logo" className='h-9 object-contain' />
                    </div>
                    <h1 className='text-2xl sm:text-3xl font-bold text-white tracking-tight'>
                        Admin Portal
                    </h1>
                </div>

                {error && (
                    <div className='mb-6 p-3.5 bg-red-950/80 border border-red-800/80 rounded-lg flex items-start gap-3 text-red-200 text-sm'>
                        <svg className='w-5 h-5 flex-shrink-0 mt-0.5 text-red-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                        <span className='leading-relaxed'>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label htmlFor='username' className='block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2'>
                            Username
                        </label>
                        <input
                            id='username'
                            type='text'
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                if (error) setError('');
                            }}
                            placeholder='Enter your username'
                            autoComplete='username'
                            style={inputStyle}
                            className='login-input w-full px-4 py-3 border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#1db954] focus:ring-1 focus:ring-[#1db954] transition text-sm'
                        />
                    </div>

                    <div>
                        <label htmlFor='password' className='block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2'>
                            Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (error) setError('');
                            }}
                            placeholder='Enter your password'
                            autoComplete='current-password'
                            style={inputStyle}
                            className='login-input w-full px-4 py-3 border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#1db954] focus:ring-1 focus:ring-[#1db954] transition text-sm'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='text-white w-full py-3.5 px-4 bg-[#1db954] hover:bg-[#1ed760] disabled:opacity-60 text-black font-bold rounded-full transition duration-200 transform active:scale-[0.98] cursor-pointer mt-2 flex items-center justify-center gap-2 shadow-lg shadow-[#1db954]/20'
                    >
                        {loading ? (
                            <>
                                <span className='inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin'></span>
                                <span>Authenticating...</span>
                            </>
                        ) : (
                            <span>SIGN IN</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;