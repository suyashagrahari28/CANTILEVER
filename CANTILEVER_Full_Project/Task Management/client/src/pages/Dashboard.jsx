import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");

  const getTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/tasks?filter=${filter}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      alert("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    getTasks();
  }, [filter]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <select className="mb-4 p-2 border rounded" onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      {tasks.map((task) => (
        <div key={task._id} className="mb-3 p-3 border rounded">
          <h2 className="font-semibold">{task.title}</h2>
          <p>{task.description}</p>
          <span className="text-sm text-gray-500">{task.status}</span>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;