import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Meetings from "./pages/Meetings";
import Sidebar from "./components/Sidebar";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#121212] text-white">
        <Sidebar />
        <div className="flex-1 p-6 bg-[#121212]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);