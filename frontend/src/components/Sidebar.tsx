// src/components/Sidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiClipboard, FiCalendar } from "react-icons/fi";

const Sidebar: React.FC = () => {
  const location = useLocation();

  // Function to check if link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-20 bg-[#212021] min-h-screen p-4 flex flex-col items-center gap-4">
      {/* Dashboard Button */}
      <Link to="/" className="group relative w-full flex justify-center">
        <button className={`sidebar-button ${isActive("/") ? "bg-blue-400" : ""}`}>
          <FiHome className={`w-8 h-8 ${isActive("/") ? "text-black" : "text-white"}`} />
        </button>
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Dashboard
        </span>
      </Link>

      {/* Tasks Button */}
      <Link to="/tasks" className="group relative w-full flex justify-center">
        <button className={`sidebar-button ${isActive("/tasks") ? "bg-blue-400" : ""}`}>
          <FiClipboard className={`w-8 h-8 ${isActive("/tasks") ? "text-black" : "text-white"}`} />
        </button>
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Tasks
        </span>
      </Link>

      {/* Meetings Button */}
      <Link to="/meetings" className="group relative w-full flex justify-center">
        <button className={`sidebar-button ${isActive("/meetings") ? "bg-blue-400" : ""}`}>
          <FiCalendar className={`w-8 h-8 ${isActive("/meetings") ? "text-black" : "text-white"}`} />
        </button>
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Meetings
        </span>
      </Link>
    </div>
  );
};

export default Sidebar;
