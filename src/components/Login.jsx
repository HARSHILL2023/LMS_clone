import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [role, setRole] = useState('Student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            const userData = { role, email, timestamp: new Date().toISOString() };
            localStorage.setItem('lms_user', JSON.stringify(userData));
            alert(`Logged in successfully as ${role}`);
            
            const dashboardPath = role === 'Student' ? '/student/dashboard' : '/admin/dashboard';
            navigate(dashboardPath);
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md bg-[#121212] border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8 flex justify-center items-center">
                    <div className="bg-[#104cba] px-3 py-1 mr-1">
                        <h1 className="text-white text-3xl font-bold tracking-tight">Coding</h1>
                    </div>
                    <h1 className="text-[#cfcfcf] text-3xl font-bold tracking-tight">Gita</h1>
                </div>

                <p className="text-[#a3a3a3] text-center mb-6">Sign in to your account</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Role Selection */}
                    <div className="flex bg-[#1a1a1a] p-1 rounded-lg">
                        {['Student', 'Mentor', 'Admin'].map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setRole(r)}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${role === r
                                        ? 'bg-[#104cba] text-white shadow-md'
                                        : 'text-[#888888] hover:text-white hover:bg-[#2a2a2a]'
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[#a3a3a3] mb-1.5">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#104cba] focus:ring-1 focus:ring-[#104cba] transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#a3a3a3] mb-1.5">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#104cba] focus:ring-1 focus:ring-[#104cba] transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#104cba] hover:bg-[#0c3a8e] text-white font-semibold py-3 rounded-lg transition-colors mt-2"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
