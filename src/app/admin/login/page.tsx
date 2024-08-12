'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const storedLogin = "admin";
        const storedPassword = "123456";

        if (login === storedLogin && password === storedPassword) {
            const authData = {
                authenticated: true,
                timestamp: new Date().getTime()
            };
            sessionStorage.setItem('admin-auth', JSON.stringify(authData));
            router.push('/admin');
        } else {
            setError('Invalid login or password');
        }
    };

    return (
        <div className="text-black flex flex-col md:flex-row gap-10 justify-start md:justify-center items-center h-screen bg-gray-100">
            <div className="pt-20 md:pt-0 flex flex-col gap-4">
                <p className="text-stone-600 italic text-xl">To enter admin page: </p>
                <p className="text-stone-600 italic text-xl"> Login: admin </p>
                <p className="text-stone-600 italic text-xl"> Password: 123456 </p>
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h1 className="text-xl font-bold mb-4">Admin Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Login</label>
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </div>
                <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">Login</button>
            </form>
        </div>
    );
};
export default LoginPage;
