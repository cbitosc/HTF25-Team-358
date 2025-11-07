from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

tasks = [
    {"id": 1, "title": "Design project dashboard", "status": "In Progress"},
    {"id": 2, "title": "Integrate GitHub API", "status": "Pending"},
    {"id": 3, "title": "Prepare weekly report", "status": "Completed"},
]

@app.get("/tasks")
def get_tasks():
    return tasks

@app.post("/tasks")
def add_task(task: dict):
    task["id"] = len(tasks) + 1
    tasks.append(task)
    return task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    return {"message": "Task deleted"}

@app.put("/tasks/{task_id}")
def update_task(task_id: int, updated_task: dict):
    for t in tasks:
        if t["id"] == task_id:
            t["title"] = updated_task.get("title", t["title"])
            t["status"] = updated_task.get("status", t["status"])
            return t
    raise HTTPException(status_code=404, detail="Task not found")
