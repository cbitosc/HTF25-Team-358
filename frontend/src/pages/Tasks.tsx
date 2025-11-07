import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface Task {
  id: number;
  title: string;
  status: "pending" | "completed";
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now(),
      title: newTask.trim(),
      status: "pending",
    };
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "pending" ? "completed" : "pending" }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="page-container max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-blue-400 mb-4">Tasks</h1>

      {/* Add Task */}
      <div className="add-task-container flex gap-2 mb-4 w-full">
        <Input
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 bg-[#212021] text-white border border-gray-700"
        />
        <Button
          variant="default"
          size="sm"
          className="px-3 py-1"
          onClick={addTask}
        >
          +
        </Button>
      </div>

      {/* Pending Tasks */}
      <div className="task-list flex flex-col gap-3 mb-4">
        {tasks
          .filter((task) => task.status === "pending")
          .map((task) => (
            <div
              key={task.id}
              className="task-card flex items-center justify-between gap-2 p-2 rounded-md bg-[#212021]"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={false}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 accent-blue-400"
                />
                <span className="text-white">{task.title}</span>
              </div>

              {/* Trash Icon Delete Button */}
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
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

      {/* Completed Tasks */}
      {showCompleted && (
        <div className="task-list flex flex-col gap-2 bg-[#1a1a1a] rounded-md p-2">
          {tasks
            .filter((task) => task.status === "completed")
            .map((task) => (
              <div
                key={task.id}
                className="task-card flex items-center justify-between gap-2 p-2 rounded-md bg-[#212021]"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 accent-blue-400"
                  />
                  <span className="text-gray-400 line-through">{task.title}</span>
                </div>

                {/* Trash Icon Delete Button */}
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
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
            ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
