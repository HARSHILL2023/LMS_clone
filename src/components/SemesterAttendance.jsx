import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SemesterAttendance = ({ role: initialRole }) => {
    const navigate = useNavigate();
    const lmsUser = JSON.parse(localStorage.getItem('lms_user') || '{}');
    const role = initialRole || lmsUser.role || 'Student';
    const rolePath = role.toLowerCase() === 'admin' ? '/admin' : '/student';

    const [selectedSemester, setSelectedSemester] = useState(1);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const sem1Data = {
        name: "Semester 1",
        dates: "7/31/2025 - 1/28/2026",
        overall: 51,
        totalMarked: 272,
        presentCount: 140,
        absentCount: 132,
        duration: "181 days",
        leaveDays: 0,
        internLeaveDays: 0
    };

    const sem2Data = {
        name: "Semester 2",
        dates: "1/29/2026 - 6/30/2026",
        overall: 78,
        totalMarked: 131,
        presentCount: 102,
        absentCount: 29,
        bonusAttendance: 8,
        duration: "153 days",
        leaveDays: 5,
        internLeaveDays: 0
    };

    const currentSem = selectedSemester === 1 ? sem1Data : sem2Data;
    const bonusPct = currentSem.bonusAttendance
        ? Math.round(((currentSem.presentCount + currentSem.bonusAttendance) * 100) / currentSem.totalMarked)
        : null;

    const navItems = [
        { name: 'Dashboard', path: `${rolePath}/dashboard` },
        { name: 'Attendance', path: `${rolePath}/attendance` },
        { name: 'Calendar', path: `${rolePath}/calendar` },
        { name: 'Chat', path: '#' }
    ];

    const moreItems = [
        { name: 'Semester Attendance', path: `${rolePath}/semester-attendance` },
        { name: 'Feedback', path: '#' },
        { name: 'Weekly Subject Feedback', path: '#' },
        { name: 'Apply Leave', path: '#' }
    ];

    return (
        <div className="min-h-screen bg-[#070707] text-[#e5e5e5] font-sans">
            {/* Top Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a] bg-[#0a0a0a] sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-purple-900/20">
                            PH
                        </div>
                        <span className="bg-[#e5e7eb] text-black px-3 py-1 rounded-md text-xs font-bold leading-none">
                            {role}
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-2 text-sm font-medium">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => item.path !== '#' && navigate(item.path)}
                                className={`px-3 py-1.5 rounded-md transition-colors ${item.name === 'More' ? 'bg-[#2a2a2a] text-white' : 'text-[#a3a3a3] hover:text-white hover:bg-[#1a1a1a]'
                                    }`}
                            >
                                {item.name}
                            </button>
                        ))}

                        <div className="relative">
                            <button
                                onClick={() => setIsMoreOpen(!isMoreOpen)}
                                className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${isMoreOpen ? 'bg-[#2a2a2a] text-white shadow-md' : 'text-[#a3a3a3] hover:text-white hover:bg-[#1a1a1a]'
                                    }`}
                            >
                                More
                                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isMoreOpen && (
                                <div className="absolute top-full left-0 mt-2 w-56 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl py-2 z-[60]">
                                    {moreItems.map((item) => (
                                        <button
                                            key={item.name}
                                            onClick={() => {
                                                if (item.path !== '#' && window.location.pathname !== item.path) {
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
                    <button className="text-[#a3a3a3] hover:text-white transition-colors bg-[#2a2a2a] p-1.5 rounded-md">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                    <div className="relative">
                        <button 
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            className="w-8 h-8 rounded-full overflow-hidden border border-[#2a2a2a] focus:outline-none focus:border-white transition-colors"
                        >
                            <img src="https://icy-teal-ylwx7c4jy1.edgeone.app/h.jpeg" alt="Profile" className="w-full h-full object-cover" />
                        </button>
                        
                        {isProfileDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 w-64 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl py-2 z-50">
                                <div className="px-4 py-3 border-b border-[#2a2a2a] flex items-center gap-3">
                                    <img src="https://icy-teal-ylwx7c4jy1.edgeone.app/h.jpeg" alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                                    <div className="overflow-hidden">
                                        <div className="text-sm font-semibold truncate text-white">PATEL HARSHIL HITENDR...</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { navigate(`${rolePath}/profile`); setIsProfileDropdownOpen(false); }}
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
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-[1400px] mx-auto p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Semester Attendance</h1>
                    <p className="text-[#a3a3a3] text-sm">View your attendance statistics by semester</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Semesters Sidebar */}
                    <div className="lg:w-80">
                        <section className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-4 shadow-xl">
                            <h2 className="text-sm font-semibold mb-4 px-2">Semesters</h2>
                            <div className="space-y-2">
                                {[1, 2].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setSelectedSemester(num)}
                                        className={`w-full text-left p-4 rounded-xl border transition-all ${selectedSemester === num
                                                ? 'bg-blue-500/10 border-blue-500/50 ring-1 ring-blue-500/20'
                                                : 'bg-[#0d0d0d] border-[#2a2a2a] hover:border-[#404040]'
                                            }`}
                                    >
                                        <div className="font-semibold text-sm">Semester {num}</div>
                                        <div className="text-[10px] text-[#a3a3a3] mt-1 uppercase tracking-wider tabular-nums">
                                            {num === 1 ? sem1Data.dates : sem2Data.dates}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Main Stats Content */}
                    <div className="flex-1 space-y-6">
                        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 relative overflow-hidden shadow-2xl">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-xl font-bold mb-1">Semester {selectedSemester}</h2>
                                    <p className="text-xs text-[#a3a3a3] tabular-nums font-medium tracking-tight uppercase">
                                        {currentSem.dates}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold tabular-nums tracking-tighter">{currentSem.overall}%</div>
                                    <div className="text-[10px] text-[#888] font-bold uppercase tracking-[0.1em] mt-0.5">Attendance</div>
                                </div>
                            </div>

                            <div className="mb-10">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-[#a3a3a3] uppercase tracking-wider">Overall Attendance</span>
                                    <span className="text-xs font-bold tabular-nums">{currentSem.overall}%</span>
                                </div>
                                <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#2a2a2a]/50">
                                    <div
                                        className={`h-full transition-all duration-1000 ${currentSem.overall < 75 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.3)]'}`}
                                        style={{ width: `${currentSem.overall}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: 'Total Marked', value: currentSem.totalMarked, color: 'text-white' },
                                    { label: 'Present Count', value: currentSem.presentCount, color: 'text-[#10b981]' },
                                    { label: 'Absent Count', value: currentSem.absentCount, color: 'text-red-500' },
                                    { label: 'Bonus Attendance', value: `+${currentSem.bonusAttendance || 0}`, color: 'text-blue-500' }
                                ].map((stat) => (
                                    <div key={stat.label} className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4 group hover:border-[#3a3a3a] transition-all hover:translate-y-[-2px]">
                                        <div className="text-[10px] text-[#a3a3a3] font-bold uppercase tracking-wider mb-2">{stat.label}</div>
                                        <div className={`text-2xl font-bold tabular-nums tracking-tight ${stat.color}`}>{stat.value}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Attendance with Bonus Section */}
                            {currentSem.bonusAttendance > 0 && (
                                <div className="mt-12 py-8 px-6 bg-[#0d0d0d]/50 border border-blue-500/20 rounded-2xl">
                                    <div className="flex justify-between items-end mb-4">
                                        <div>
                                            <h3 className="text-base font-bold text-[#10b981]">Attendance with Bonus</h3>
                                            <p className="text-[9px] text-gray-500 italic mt-1 font-medium">Formula: ((Present + Bonus) * 100) / Total Marked</p>
                                        </div>
                                        <div className="text-2xl font-bold text-[#10b981] tabular-nums tracking-tighter">{bonusPct}%</div>
                                    </div>
                                    <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#2a2a2a]/50">
                                        <div className="h-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all duration-1000" style={{ width: `${bonusPct}%` }}></div>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 pt-8 border-t border-[#2a2a2a]/50">
                                <section>
                                    <h3 className="text-[10px] font-bold text-[#a3a3a3] uppercase tracking-[0.15em] mb-6">Status Breakdown</h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Present Count', value: currentSem.presentCount, color: 'bg-[#10b981]' },
                                            { label: 'Absent Count', value: currentSem.absentCount, color: 'bg-red-500' },
                                            { label: 'Leave Days', value: currentSem.leaveDays, color: 'bg-orange-500' },
                                            { label: 'Intern Leave Days', value: currentSem.internLeaveDays, color: 'bg-purple-500' },
                                            { label: 'Bonus Attendance', value: currentSem.bonusAttendance || 0, color: 'bg-green-600' }
                                        ].map((item) => (
                                            <div key={item.label} className="flex justify-between items-center group">
                                                <span className="text-sm text-[#a3a3a3] group-hover:text-white transition-colors">{item.label}</span>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-bold tabular-nums">{item.value}</span>
                                                    <div className={`w-4 h-4 rounded-md ${item.color} shadow-sm transition-transform group-hover:scale-110`}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-[10px] font-bold text-[#a3a3a3] uppercase tracking-[0.15em] mb-6">Period Information</h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Start Date', value: currentSem.dates.split(' - ')[0] },
                                            { label: 'End Date', value: currentSem.dates.split(' - ')[1] },
                                            { label: 'Duration', value: currentSem.duration }
                                        ].map((item) => (
                                            <div key={item.label} className="flex justify-between items-center">
                                                <span className="text-sm text-[#a3a3a3]">{item.label}</span>
                                                <span className="text-sm font-semibold tabular-nums">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* Critical Warning */}
                        {currentSem.overall < 75 && currentSem.totalMarked > 0 && (
                            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 flex items-center gap-4 text-red-500">
                                <div className="p-2 bg-red-500/10 rounded-lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l18 18" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium">Your attendance is critically low. Please prioritize attending classes.</p>
                            </div>
                        )}

                        {/* Status Footer Placeholder */}
                        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6">
                            <h3 className="text-sm font-semibold mb-2">Attendance Status</h3>
                            <div className="h-px bg-[#2a2a2a] my-4"></div>
                            {currentSem.totalMarked === 0 ? (
                                <p className="text-sm text-[#a3a3a3]">No attendance data available for this semester.</p>
                            ) : currentSem.overall < 75 ? (
                                <div className="flex items-center gap-3 text-red-500/80">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l18 18" />
                                    </svg>
                                    <p className="text-xs font-medium uppercase tracking-wider">Your attendance is critically low. Please prioritize attending classes.</p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 text-[#10b981]">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p className="text-sm font-semibold italic">Your attendance is good. Keep up the consistent attendance!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SemesterAttendance;
