import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ role: initialRole }) => {
    const navigate = useNavigate();
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const lmsUser = JSON.parse(localStorage.getItem('lms_user') || '{}');
    const role = initialRole || lmsUser.role || 'Student';
    const rolePath = role.toLowerCase() === 'admin' ? '/admin' : '/student';

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
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
                            className="px-3 py-1.5 bg-[#2a2a2a] text-white rounded-md transition-colors"
                        >
                            Dashboard
                        </button>
                        <button 
                            onClick={() => navigate(`${rolePath}/attendance`)}
                            className="px-3 py-1.5 text-[#a3a3a3] hover:text-white transition-colors"
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
                        
                        <div className="relative group">
                            <button 
                                onClick={() => setIsMoreOpen(!isMoreOpen)}
                                className={`px-3 py-1.5 text-[#a3a3a3] hover:text-white transition-colors flex items-center gap-1.5 rounded-md ${isMoreOpen ? 'bg-[#2a2a2a] text-white' : ''}`}
                            >
                                More
                                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {isMoreOpen && (
                                <div className="absolute top-full left-0 mt-2 w-56 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl py-2 z-50">
                                    {[
                                        { name: 'Semester Attendance', path: `${rolePath}/semester-attendance` },
                                        { name: 'Feedback', path: '#' },
                                        { name: 'Weekly Subject Feedback', path: '#' },
                                        { name: 'Apply Leave', path: '#' }
                                    ].map((item) => (
                                        <button
                                            key={item.name}
                                            onClick={() => {
                                                if (item.path !== '#') {
                                                    navigate(item.path);
                                                    setIsMoreOpen(false);
                                                }
                                            }}
                                            className="w-full text-left px-4 py-2.5 text-sm text-[#a3a3a3] hover:text-white hover:bg-[#2a2a2a] transition-colors"
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group pb-2 -mb-2">
                        <button className="text-[#a3a3a3] hover:text-white transition-colors bg-[#2a2a2a] p-1.5 rounded-md focus:outline-none">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        
                        <div className="absolute top-full right-0 mt-2 w-64 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="px-4 py-3 border-b border-[#2a2a2a] flex items-center gap-3">
                                <img src="https://icy-teal-ylwx7c4jy1.edgeone.app/h.jpeg" alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                                <div className="overflow-hidden">
                                    <div className="text-sm font-semibold truncate text-white">PATEL HARSHIL HITENDR...</div>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate(`${rolePath}/profile`)}
                                className="w-full text-left px-4 py-2.5 text-sm text-[#a3a3a3] hover:text-white hover:bg-[#2a2a2a] transition-colors mt-1"
                            >
                                View Profile
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full text-left px-4 py-2.5 text-sm text-[#a3a3a3] hover:text-white hover:bg-[#2a2a2a] transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto p-6 flex flex-col gap-6">
                {/* Top Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
                        <div className="text-[#a3a3a3] text-sm mb-1">University</div>
                        <div className="text-2xl font-semibold">SUxCG 714</div>
                    </div>
                    <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
                        <div className="text-[#a3a3a3] text-sm mb-1">UID</div>
                        <div className="text-2xl font-semibold">108543</div>
                    </div>
                    <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
                        <div className="text-[#a3a3a3] text-sm mb-1">Subjects</div>
                        <div className="text-2xl font-semibold">12</div>
                    </div>
                </div>

                {/* Attendance Progress Card */}
                <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-6">
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex items-center gap-4">
                            <h2 className="text-lg font-semibold">Semester 2 Attendance</h2>
                            <span className="bg-[#6b46c1]/20 text-[#9f7aea] px-2.5 py-0.5 rounded text-xs font-bold">
                                77 %
                            </span>
                        </div>
                        <span className="text-[#a3a3a3] text-sm hidden sm:block">76%</span>
                    </div>

                    <div className="w-full h-2.5 bg-[#2a2a2a] rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '76%' }}></div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-[#a3a3a3] gap-2">
                        <div>Present 92 / 121 marked sessions</div>
                        <div>1/29/2026 - 6/30/2026</div>
                    </div>
                </div>

                {/* Profile and Subjects Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* User Profile Card */}
                    <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-6 col-span-1">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-[#2a2a2a] flex-shrink-0">
                                <img
                                    src="https://icy-teal-ylwx7c4jy1.edgeone.app/h.jpeg"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="font-semibold text-[15px] truncate">PATEL HARSHIL HITENDRAKUMAR</h3>
                                <p className="text-[#a3a3a3] text-xs mt-0.5 truncate">harshil.hkpatel@gmail.com</p>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-[#a3a3a3]">Mobile</span>
                                <span>9664731583</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#a3a3a3]">DOB</span>
                                <span>23-01-2023</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#a3a3a3]">University</span>
                                <span>SUxCG 714</span>
                            </div>
                        </div>
                    </div>

                    {/* Subjects Grid Card */}
                    <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-6 col-span-1 lg:col-span-2">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-base font-semibold">Subjects</h2>
                            <button className="text-xs text-[#a3a3a3] hover:text-white transition-colors">
                                View attendance
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {[
                                "SU11 - GIT & GITHUB",
                                "SU12 - C Language",
                                "SU13 - HTML/CSS/JS",
                                "SU14 - UI/UX FIGMA",
                                "SU15 - MATHS",
                                "SU16 - JavaScript",
                                "SU0201 - ReactJS",
                                "SU0202 - NodeJS",
                                "SU0203 - NoSQL Database(Mon...",
                                "SU0204 - OOPS(C++)",
                                "SU0205 - Maths 2",
                                "SU0206 - EVS"
                            ].map((subject, index) => (
                                <div
                                    key={index}
                                    className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-3 text-[13px] text-[#cfcfcf] hover:border-[#404040] hover:bg-[#151515] transition-colors truncate"
                                >
                                    {subject}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mentors Card */}
                <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-6">
                    <h2 className="text-base font-semibold mb-4">Mentors</h2>
                    <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-4 w-fit pr-16 hover:border-[#404040] transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-[#059669] flex items-center justify-center text-sm font-bold text-white">
                            A
                        </div>
                        <div>
                            <div className="font-medium text-sm">Ankita</div>
                            <div className="text-[#a3a3a3] text-xs mt-0.5">SUxCG 714</div>
                        </div>
                    </div>
                </div>

                {/* Assignments Card */}
                <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-base font-semibold text-white">Assignments <span className="text-[#a3a3a3] font-normal text-sm ml-1">(0/0 - 0%)</span></h2>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="text-[#a3a3a3]">Pending: 0</span>
                            <button className="text-[#a3a3a3] hover:text-white transition-colors underline decoration-[#2a2a2a] hover:decoration-white underline-offset-4">View all</button>
                        </div>
                    </div>
                    <div className="w-full h-px bg-[#2a2a2a] my-4"></div>
                    <p className="text-[#a3a3a3] text-sm">No pending assignments. Great job!</p>
                </div>

                {/* Upcoming Events Card */}
                <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-base font-semibold text-white">Upcoming Events</h2>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="text-[#a3a3a3]">0 shown</span>
                            <button className="text-[#a3a3a3] hover:text-white transition-colors underline decoration-[#2a2a2a] hover:decoration-white underline-offset-4">View all</button>
                        </div>
                    </div>
                    <div className="w-full h-px bg-[#2a2a2a] my-4"></div>
                    <p className="text-[#a3a3a3] text-sm">No upcoming events.</p>
                </div>

                {/* Bottom Links Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
                    <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5 hover:border-[#404040] transition-colors cursor-pointer">
                        <div className="text-[#a3a3a3] text-xs mb-1">Need help?</div>
                        <div className="font-semibold text-[15px]">Contact your mentor</div>
                    </div>
                    <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5 hover:border-[#404040] transition-colors cursor-pointer">
                        <div className="text-[#a3a3a3] text-xs mb-1">Timetable</div>
                        <div className="font-semibold text-[15px]">Check classes (coming soon)</div>
                    </div>
                    <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5 hover:border-[#404040] transition-colors cursor-pointer">
                        <div className="text-[#a3a3a3] text-xs mb-1">Chat</div>
                        <div className="font-semibold text-[15px]">View Chat Groups</div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
