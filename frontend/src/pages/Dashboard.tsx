// src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  pendingMeetings: number;
  projectProgress: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    pendingMeetings: 0,
    projectProgress: 0
  });

  useEffect(() => {
    // Load data from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const meetings = JSON.parse(localStorage.getItem("meetings") || "[]");
    
    const completedTasks = tasks.filter((task: any) => task.status === "completed").length;
    const pendingMeetings = meetings.filter((meeting: any) => meeting.status === "pending").length;

    setStats({
      totalTasks: tasks.length,
      completedTasks,
      pendingTasks: tasks.length - completedTasks,
      pendingMeetings,
      projectProgress: tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0
    });
  }, []);

  return (
    <div className="page-container max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-blue-400 mb-2">Project Dashboard</h1>
        <p className="text-gray-400">Overview of your project progress and activities</p>
      </div>

      {/* Quick Stats Cards */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="task-card p-6 rounded-md bg-[#212021] flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white mb-4">Total Tasks</h2>
          <h2 className="text-xl font-semibold text-white mb-4">{stats.totalTasks}</h2>
        </div>

        <div className="task-card p-6 rounded-md bg-[#212021] flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white mb-4">Completed Tasks</h2>
          <h2 className="text-xl font-semibold text-white mb-4">{stats.completedTasks}</h2>
        </div>

        <div className="task-card p-6 rounded-md bg-[#212021] flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white mb-4">Pending Tasks</h2>
          <h2 className="text-xl font-semibold text-white mb-4">{stats.pendingTasks}</h2>
        </div>

        <div className="task-card p-6 rounded-md bg-[#212021] flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white mb-4">Upcoming Meetings</h2>
          <h2 className="text-xl font-semibold text-white mb-4">{stats.pendingMeetings}</h2>
        </div>
      </div>

      {/* Progress Section */}
      <div className="task-card p-6 rounded-md bg-[#212021] mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Project Progress</h2>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <h2 className="text-xl font-semibold text-white mb-4">{stats.projectProgress}%</h2>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-blue-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${stats.projectProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="task-card p-6 rounded-md bg-[#212021]">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex gap-6">
          <Link to="/tasks" className="flex-1">
            <button className="task-toggle-btn w-100 h-20 text-xl text-white px-7 text-center">
                MANAGE<br />TASKS
            </button>
          </Link>

          <Link to="/meetings" className="flex-1">
            <button className="task-toggle-btn w-100 h-20 text-xl text-white px-4">
              SCHEDULE MEETINGS
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;