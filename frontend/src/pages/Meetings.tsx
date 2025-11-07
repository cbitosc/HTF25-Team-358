import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface Meeting {
  id: number;
  title: string;
  date: string;
  status: "pending" | "completed";
}

const Meetings: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(() => {
    const saved = localStorage.getItem("meetings");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    localStorage.setItem("meetings", JSON.stringify(meetings));
  }, [meetings]);

  const addMeeting = () => {
    if (!newTitle.trim() || !newDate) return;
    const meeting: Meeting = {
      id: Date.now(),
      title: newTitle.trim(),
      date: newDate,
      status: "pending",
    };
    setMeetings([meeting, ...meetings]);
    setNewTitle("");
    setNewDate("");
  };

  const toggleMeeting = (id: number) => {
    setMeetings(
      meetings.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "pending" ? "completed" : "pending" }
          : m
      )
    );
  };

  const deleteMeeting = (id: number) => {
    setMeetings(meetings.filter((m) => m.id !== id));
  };

  return (
    <div className="page-container max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-blue-400 mb-4">Meetings</h1>

      {/* Add Meeting */}
      <div className="add-task-container flex gap-2 mb-4 w-full">
        <Input
          placeholder="Enter meeting title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 bg-[#212021] text-white border border-gray-700 rounded-md px-2 py-1"
        />
        <Input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="bg-[#212021] text-white border border-gray-700 rounded-md px-2 py-1"
        />
        <Button className="px-3 py-1" onClick={addMeeting}>
          +
        </Button>
      </div>

      {/* Pending Meetings */}
      <div className="task-list flex flex-col gap-3 mb-4">
        {meetings
          .filter((m) => m.status === "pending")
          .map((m) => (
            <div
              key={m.id}
              className="task-card flex justify-between items-center p-2 rounded-md bg-[#212021]"
            >
              {/* Left side: checkbox + title */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={false}
                  onChange={() => toggleMeeting(m.id)}
                  className="w-5 h-5 accent-blue-400"
                />
                <span className="text-white font-semibold">{m.title}</span>
              </div>

              {/* Right side: date box + delete */}
              <div className="flex items-center gap-4">
                <span className="text-white text-sm bg-[#333333] px-3 py-1.5 rounded-xl border border-[#444444]">
                  {m.date}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => deleteMeeting(m.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-red-600"
                  >
                    <path d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5a1 1 0 01-1 .5H7.5a1 1 0 01-1-.5L5 9zm5 3v6h2v-6H10zm4 0v6h2v-6h-2zM9 4V3a1 1 0 011-1h4a1 1 0 011 1v1h5v2H4V4h5z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Completed Toggle Button */}
      <div className="mb-2">
        <Button
          className={`task-toggle-btn ${showCompleted ? "open" : ""}`}
          onClick={() => setShowCompleted(!showCompleted)}
        >
          Completed
          <span className="arrow">▼</span>
        </Button>
      </div>

      {/* Completed Meetings */}
      {showCompleted && (
        <div className="task-list flex flex-col gap-2 bg-[#1a1a1a] rounded-md p-2">
          {meetings
            .filter((m) => m.status === "completed")
            .map((m) => (
              <div
                key={m.id}
                className="task-card flex justify-between items-center p-2 rounded-md bg-[#212021]"
              >
                {/* Left side: checkbox + title */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={() => toggleMeeting(m.id)}
                    className="w-5 h-5 accent-blue-400"
                  />
                  <span className="text-gray-400 font-semibold line-through">{m.title}</span>
                </div>

                {/* Right side: date box + delete */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-300 text-sm bg-[#2a2a2a] px-3 py-1.5 rounded-xl border border-[#3a3a3a]">
                    {m.date}
                  </span>
                  <button
                    className="delete-btn"
                    onClick={() => deleteMeeting(m.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-red-600"
                    >
                      <path d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5a1 1 0 01-1 .5H7.5a1 1 0 01-1-.5L5 9zm5 3v6h2v-6H10zm4 0v6h2v-6h-2zM9 4V3a1 1 0 011-1h4a1 1 0 011 1v1h5v2H4V4h5z"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Meetings;