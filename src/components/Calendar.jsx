import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Calendar = ({ role: initialRole }) => {
    const navigate = useNavigate();
    const lmsUser = JSON.parse(localStorage.getItem('lms_user') || '{}');
    const role = initialRole || lmsUser.role || 'Student';
    const rolePath = role.toLowerCase() === 'admin' ? '/admin' : '/student';

    const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 28)); // March 28, 2026
    const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 28));

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const startDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const setToday = () => {
        const today = new Date(2026, 2, 28);
        setCurrentDate(today);
        setSelectedDate(today);
    };

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <button onClick={prevMonth} className="p-1.5 hover:bg-[#2a2a2a] rounded transition-colors bg-[#1a1a1a] border border-[#2a2a2a]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button onClick={setToday} className="px-3 py-1 text-sm bg-[#1a1a1a] border border-[#2a2a2a] rounded hover:bg-[#2a2a2a] transition-colors">
                        Today
                    </button>
                    <button onClick={nextMonth} className="p-1.5 hover:bg-[#2a2a2a] rounded transition-colors bg-[#1a1a1a] border border-[#2a2a2a]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <h2 className="text-lg font-semibold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <div className="w-20"></div> {/* Spacer for symmetry if needed */}
            </div>
        );
    };

    const legendItems = [
        { name: "Assignment", color: "bg-[#3b82f6]" },
        { name: "holiday", color: "bg-[#ec4899]" },
        { name: "exam", color: "bg-[#ef4444]" },
        { name: "class test", color: "bg-[#f59e0b]" },
        { name: "result announcement", color: "bg-[#a855f7]" },
        { name: "orientation", color: "bg-[#06b6d4]" },
        { name: "convocation", color: "bg-[#d946ef]" },
        { name: "Personal reasons", color: "bg-[#eab308]" },
        { name: "Festival celebration", color: "bg-[#f97316]" },
        { name: "Hackathon participation", color: "bg-[#0ea5e9]" },
        { name: "College events (seminars, workshops, competitions, etc.)", color: "bg-[#2563eb]" },
        { name: "Sick leave / medical reasons", color: "bg-[#dc2626]" },
        { name: "Placement drives", color: "bg-[#10b981]" },
        { name: "Company work (official tasks or visits)", color: "bg-[#6366f1]" },
        { name: "Interviews", color: "bg-[#14b8a6]" },
        { name: "Family functions", color: "bg-[#f472b6]" },
        { name: "Emergency situations", color: "bg-[#ef4444]" },
        { name: "Travel-related reasons", color: "bg-[#06b6d4]" },
        { name: "Duty leave", color: "bg-[#8b5cf6]" },
        { name: "Others", color: "bg-[#6b7280]" }
    ];

    const generateDays = () => {
        const totalDays = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
        const startDay = startDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
        const days = [];

        // Add padding for start of month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="bg-transparent border border-[#2a2a2a]/30 h-28"></div>);
        }

        for (let i = 1; i <= totalDays; i++) {
            const isToday = i === 28 && currentDate.getMonth() === 2 && currentDate.getFullYear() === 2026;
            const isSelected = selectedDate.getDate() === i && selectedDate.getMonth() === currentDate.getMonth() && selectedDate.getFullYear() === currentDate.getFullYear();
            
            days.push(
                <div 
                    key={i} 
                    onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), i))}
                    className={`h-28 border border-[#2a2a2a]/30 p-3 cursor-pointer transition-all hover:bg-[#1a1a1a] group relative ${
                        isSelected ? 'ring-2 ring-blue-500/50 bg-[#151515]/50 z-10' : ''
                    } ${isToday ? 'bg-[#151515]/30' : ''}`}
                >
                    <span className={`text-sm font-medium transition-colors ${
                        isToday ? 'text-white' : isSelected ? 'text-white' : 'text-[#a3a3a3]'
                    }`}>
                        {i}
                    </span>
                    
                    {/* Event indicators (dummy) */}
                    <div className="mt-auto flex flex-wrap gap-1">
                        {i % 7 === 0 && <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
                        {i % 10 === 0 && <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>}
                    </div>
                </div>
            );
        }
        return days;
    };

    return (
        <div className="min-h-screen bg-[#070707] text-[#e5e5e5] font-sans selection:bg-purple-500/30">
            {/* Top Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a] bg-[#0a0a0a] sticky top-0 z-10">
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
                        <button 
                            onClick={() => navigate(`${rolePath}/dashboard`)}
                            className="px-3 py-1.5 text-[#a3a3a3] hover:text-white transition-colors hover:bg-[#1a1a1a] rounded-md"
                        >
                            Dashboard
                        </button>
                        <button 
                            onClick={() => navigate(`${rolePath}/attendance`)}
                            className="px-3 py-1.5 text-[#a3a3a3] hover:text-white transition-colors hover:bg-[#1a1a1a] rounded-md"
                        >
                            Attendance
                        </button>
                        <button className="px-3 py-1.5 bg-[#2a2a2a] text-white rounded-md transition-colors shadow-sm">
                            Calendar
                        </button>
                        <button className="px-3 py-1.5 text-[#a3a3a3] hover:text-white transition-colors hover:bg-[#1a1a1a] rounded-md">
                            Chat
                        </button>
                        <button className="px-3 py-1.5 text-[#a3a3a3] hover:text-white transition-colors hover:bg-[#1a1a1a] rounded-md flex items-center gap-1">
                            More
                            <svg className="w-3 h-3 translate-y-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="text-[#a3a3a3] hover:text-white transition-all transform hover:scale-105 active:scale-95 px-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                    <button onClick={() => navigate('/login')} className="bg-[#2a2a2a]/50 p-2 rounded-lg text-[#a3a3a3] hover:text-white hover:bg-[#2a2a2a] transition-all border border-transparent hover:border-[#3a3a3a]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </nav>

            <main className="max-w-[1500px] mx-auto p-6 md:p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Section: Calendar Grid and Legend */}
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold mb-8 tracking-tight">Calendar</h1>
                        
                        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="p-8 border-b border-[#2a2a2a]">
                                {renderHeader()}
                                
                                {/* Legend */}
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-6 gap-y-3 mt-6 text-[11px] text-[#a3a3a3] font-medium uppercase tracking-wider">
                                    {legendItems.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2.5 group cursor-default">
                                            <div className={`w-2 h-2 rounded-full ${item.color} group-hover:scale-125 transition-transform`}></div>
                                            <span className="truncate group-hover:text-white transition-colors">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Calendar Days Header */}
                            <div className="grid grid-cols-7 bg-[#0d0d0d]">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="py-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] border-r border-[#2a2a2a]/30 last:border-r-0">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 border-t border-[#2a2a2a]">
                                {generateDays()}
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Day Details */}
                    <div className="w-full lg:w-[380px] space-y-6">
                        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl h-full sticky top-[100px]">
                            <h2 className="text-xl font-bold mb-8 text-white tabular-nums border-b border-[#2a2a2a] pb-4">
                                {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}
                            </h2>
                            
                            <div className="space-y-8">
                                <section>
                                    <h3 className="text-[#a3a3a3] text-[10px] font-bold uppercase tracking-[0.1em] mb-4">Events</h3>
                                    <div className="p-4 rounded-xl bg-[#0a0a0a]/50 border border-[#2a2a2a]/50">
                                        <p className="text-sm text-gray-600 font-medium italic">No events.</p>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-[#a3a3a3] text-[10px] font-bold uppercase tracking-[0.1em] mb-4">Leaves</h3>
                                    <div className="p-4 rounded-xl bg-[#0a0a0a]/50 border border-[#2a2a2a]/50">
                                        <p className="text-sm text-gray-600 font-medium italic">No leaves.</p>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-[#a3a3a3] text-[10px] font-bold uppercase tracking-[0.1em] mb-4">Attendance</h3>
                                    <div className="space-y-3">
                                        <p className="text-[11px] text-[#a3a3a3] font-medium">Subject entries:</p>
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#064e3b]/10 border border-[#059669]/20 group">
                                            <div className="w-2 h-2 rounded-full bg-[#059669] group-hover:scale-125 transition-transform"></div>
                                            <span className="text-sm font-semibold text-[#10b981]">ReactJS — present</span>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-[#a3a3a3] text-[10px] font-bold uppercase tracking-[0.1em] mb-4">Assignments</h3>
                                    <div className="p-4 rounded-xl bg-[#0a0a0a]/50 border border-[#2a2a2a]/50">
                                        <p className="text-sm text-gray-600 font-medium italic">None due.</p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Calendar;
