import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landingpage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 font-sans">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-white text-[70px] leading-none font-bold tracking-tight">Coding</h1>
        <h1 className="text-[#cfcfcf] text-[70px] leading-none font-bold tracking-tight mt-1">Gita</h1>
      </div>

      {/* Subtitle */}
      <p className="text-[#a3a3a3] text-[16px] mb-10 text-center max-w-2xl">
        Smart, simple, and reliable attendance for modern classrooms.
      </p>

      {/* Login Button */}
      <button
        onClick={() => navigate('/login')}
        className="bg-white text-black font-semibold text-[15px] py-2 px-8 rounded-lg hover:bg-gray-200 transition-colors mb-14"
      >
        Login
      </button>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[800px]">
        {/* Card 1 */}
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#404040] transition-colors">
          <h3 className="text-white font-semibold text-[15px] mb-2">Role-based dashboards</h3>
          <p className="text-[#888888] text-[13px] leading-relaxed pr-8">
            Admin, Mentor, and Student experiences tailored to their needs.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#404040] transition-colors">
          <h3 className="text-white font-semibold text-[15px] mb-2">Fast and secure access</h3>
          <p className="text-[#888888] text-[13px] leading-relaxed">
            Encrypted sessions and streamlined navigation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;