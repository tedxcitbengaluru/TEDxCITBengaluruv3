import VIPAccess from '../components/VIPAccess';
import React, { useState } from 'react';

const VIPPage: React.FC = () => {
    const [enteredPassword, setEnteredPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [authorized, setAuthorized] = useState(false);

    const handleLogin = () => {
        const correctPassword = process.env.NEXT_PUBLIC_VIP_PASS || '';
        if (enteredPassword === correctPassword) {
            setAuthorized(true);
        } else {
            setError('Invalid password');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl mb-8">VIP Access</h1>
            {!authorized && (
                <div className="flex">
                    <input
                        className="rounded-l-lg px-4 py-2 border-t border-b border-l text-gray-800 border-gray-200 bg-white"
                        type="password"
                        placeholder="Enter password"
                        value={enteredPassword}
                        onChange={(e) => setEnteredPassword(e.target.value)}
                    />
                    <button
                        className="rounded-r-lg bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 border border-blue-500 border-l-0"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            )}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {authorized && <VIPAccess />}
        </div>
    );
};

export default VIPPage;
