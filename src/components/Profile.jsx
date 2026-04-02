            import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ role: initialRole }) => {
    const navigate = useNavigate();
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const lmsUser = JSON.parse(localStorage.getItem('lms_user') || '{}');
    const role = initialRole || lmsUser.role || 'Student';
    const rolePath = role.toLowerCase() === 'admin' ? '/admin' : '/student';

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-10">
            {/* Top Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a] bg-[#0a0a0a] sticky top-0 z-10 w-full">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold text-white">
                            PH
                        </div>
                        <span className="text-white text-sm font-semibold">
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
                                        { name: 'Apply Leave', path: `${rolePath}/apply-leave` }
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

            <main className="max-w-5xl mx-auto p-6 md:p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-1">Profile</h1>
                    <p className="text-[#a3a3a3] text-sm">View and update your personal information</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Sidebar - Profile Card */}
                    <div className="w-full md:w-80 bg-[#121212] border border-[#2a2a2a] rounded-xl p-6 flex flex-col items-center text-center h-fit">
                        <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border border-[#2a2a2a]">
                            <img src="https://icy-teal-ylwx7c4jy1.edgeone.app/h.jpeg" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-[17px] font-semibold leading-tight mb-1 uppercase">PATEL HARSHIL HITENDRAKUMAR</h2>
                        <p className="text-[#a3a3a3] text-sm mb-1">{role}</p>
                        <p className="text-[#a3a3a3] text-xs mb-6">SUxCG 714 • 108543</p>
                        
                        <div className="flex gap-3 w-full">
                            <button className="flex-1 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-sm font-medium py-2 rounded-lg transition-colors">
                                Edit Profile
                            </button>
                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors">
                                Reset Password
                            </button>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1 space-y-6">
                        {/* Top Grid Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InfoBox label="ENROLLMENT NUMBER" value="—" />
                            <InfoBox label="COURSE" value="—" />
                            <InfoBox label="BRANCH" value="—" />
                            <InfoBox label="SEMESTER" value="—" />
                            <InfoBox label="GENDER" value="—" />
                            <InfoBox label="ALTERNATE EMAIL" value="harshil.hkpatel@gmail.com" isLink />
                            <InfoBox label="ALTERNATE PHONE" value="—" />
                            <InfoBox label="GUARDIAN" value="—" />
                        </div>

                        {/* Contact & Links */}
                        <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-6">
                            <h3 className="text-base font-semibold mb-5">Contact & Links</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoBox label="MOBILE" value="6357245646" />
                                <InfoBox label="PARENT MOBILE" value="—" />
                                <InfoBox label="UNIVERSITY EMAIL" value="harshil.hkpatel@gmail.com" isLink />
                                <InfoBox label="CURRENT EMAIL" value="harshil.hkpatel@gmail.com" isLink />
                                <InfoBox label="ADDRESS" value="Q-503, Ganesh Gensis, gota, ahemdabad" />
                                <InfoBox label="PORTFOLIO" value="—" />
                                <InfoBox label="RESUME" value="—" />
                                <InfoBox label="GITHUB" value="https://github.com/HARSHILL2023" isLink />
                                <InfoBox label="LINKEDIN" value="https://www.linkedin.com/in/harshil-patel-b00063395/" isLink />
                                <InfoBox label="TWITTER" value="https://x.com/HarshilPat74943" isLink />
                                <InfoBox label="YOUTUBE" value="https://www.youtube.com/channel/UCyG1E7CKkS6FamAaBx3KvkQ" isLink />
                            </div>
                        </div>

                        {/* Academics */}
                        <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-6">
                            <h3 className="text-base font-semibold mb-5">Academics</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoBox label="UNIVERSITY" value="SUxCG 714" />
                                <InfoBox label="UNIVERSITY UID" value="108543" />
                                <InfoBox label="DATE OF BIRTH" value="—" />
                                <InfoBox label="ADMISSION YEAR" value="—" />
                                <InfoBox label="CURRENT YEAR" value="—" />
                                <InfoBox label="SECTION" value="—" />
                                <InfoBox label="SUBJECTS" value="SU11, SU12, SU13, SU14, SU15, SU16, SU0201, SU0202, SU0203, SU020..." />
                                <InfoBox label="MENTORS" value="Ankita" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const InfoBox = ({ label, value, isLink }) => (
    <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4">
        <div className="text-[#a3a3a3] text-[11px] font-medium tracking-wider mb-1.5">{label}</div>
        {isLink && value !== '—' ? (
            <a href={value.startsWith('http') ? value : `mailto:${value}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-sm truncate block">
                {value}
            </a>
        ) : (
            <div className="text-white text-sm truncate block">{value}</div>
        )}
    </div>
);

export default Profile;
