import React from 'react';
import { useNavigate } from 'react-router-dom';

const Attendance = ({ role: initialRole }) => {
    const navigate = useNavigate();
    const lmsUser = JSON.parse(localStorage.getItem('lms_user') || '{}');
    const role = initialRole || lmsUser.role || 'Student';
    const rolePath = role.toLowerCase() === 'admin' ? '/admin' : '/student';
    
    const today = new Date();
    const formattedDate = `${today.getFullYear()} ${String(today.getMonth() + 1).padStart(2, '0')} ${String(today.getDate()).padStart(2, '0')}`;

    const attendanceData = [
        {
            code: "SU0204",
            name: "OOPS(C++)",
            markedBy: "Ankita",
            status: "present"
        },
        {
            code: "SU0203",
            name: "NoSQL Database(MongoDB/Redis)",
            markedBy: "Ankita",
            status: "present"
        },
        {
            code: "SU0202",
            name: "NodeJS",
            markedBy: "Ankita",
            status: "present"
        }
    ];

    return (
        <div className="min-h-screen bg-[#070707] text-white font-sans">
            {/* Top Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a] bg-[#0a0a0a] sticky top-0 z-10">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold text-white">
                            PH
                        </div>
                        <span className="bg-[#e5e7eb] text-black px-3 py-1 rounded-md text-sm font-semibold">
                            {role}
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-1 text-sm font-medium">
                        <button 
                            onClick={() => navigate(`${rolePath}/dashboard`)}
                            className="px-3 py-1.5 text-[#a3a3a3] hover:text-white transition-colors"
                        >
                            Dashboard
                        </button>
                        <button 
                            onClick={() => navigate(`${rolePath}/attendance`)}
                            className="px-3 py-1.5 bg-[#2a2a2a] text-white rounded-md transition-colors"
                        >
                            Attendance
                        </button>
                        <button 
                            onClick={() => navigate(`${rolePath}/calendar`)}
                            className="px-3 py-1.5 text-[#a3a3a3] hover:text-white transition-colors"
                        >
                            Calendar
                        </button>
                        <button className="px-3 py-1.5 text-[#a3a3a3] hover:text-white transition-colors">
                            Chat
                        </button>
                        <button className="px-3 py-1.5 text-[#a3a3a3] hover:text-white transition-colors flex items-center gap-1">
                            More
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="text-[#a3a3a3] hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                    <button onClick={() => navigate('/login')} className="text-[#a3a3a3] hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-6 flex flex-col items-center">
                <div className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl p-8">
                    <h1 className="text-xl font-bold mb-8">Overview</h1>
                    
                    <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl p-6 shadow-2xl">
                        <div className="mb-8">
                            <h2 className="text-lg font-bold text-white">Today's Attendance</h2>
                            <p className="text-[#a3a3a3] text-sm mt-1">Date: {formattedDate}</p>
                        </div>

                        <div className="space-y-4">
                            {attendanceData.map((item, index) => (
                                <div 
                                    key={index}
                                    className="bg-[#121212] border border-[#2a2a2a] rounded-xl px-5 py-4 flex items-center justify-between hover:border-[#404040] transition-all hover:bg-[#161616]"
                                >
                                    <div>
                                        <h3 className="text-sm font-semibold tracking-wide text-white">
                                            {item.code} - {item.name}
                                        </h3>
                                        <p className="text-[#a3a3a3] text-[11px] mt-1 font-medium italic">
                                            Marked by: {item.markedBy}
                                        </p>
                                    </div>
                                    <div className="px-4 py-1.5 rounded-full bg-[#064e3b]/40 border border-[#10b981]/20 text-[#10fbbf] text-xs font-bold tracking-tight">
                                        {item.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Attendance;
