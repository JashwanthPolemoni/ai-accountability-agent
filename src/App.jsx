import React, { useState } from "react";
import Chat from "./components/Chat";
import TaskPanel from "./components/TaskPanel";

export default function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <div className="app">
      <h1>⚡ AI Accountability Agent</h1>
      <div className="container">
        <TaskPanel tasks={tasks} setTasks={setTasks} />
        <Chat tasks={tasks} />
      </div>
    </div>
  );
}
