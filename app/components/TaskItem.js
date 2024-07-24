import axios from 'axios';
import { useState } from 'react';

const TaskItem = ({ task, refreshTasks, selectedTasks, setSelectedTasks }) => {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    refreshTasks();
  };

  const handleStatusChange = async (e) => {
    await axios.put(`http://localhost:5000/api/tasks/${task._id}`, { ...task, status: e.target.value }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    refreshTasks();
  };

  const handleSelect = () => {
    if (selectedTasks.includes(task._id)) {
      setSelectedTasks(selectedTasks.filter(id => id !== task._id));
    } else {
      setSelectedTasks([...selectedTasks, task._id]);
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 border">
      <input
        type="checkbox"
        checked={selectedTasks.includes(task._id)}
        onChange={handleSelect}
        className="mr-4"
      />
      <div className="flex-1">
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p>{task.description}</p>
        <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
      </div>
      <select value={task.status} onChange={handleStatusChange} className="p-2 border">
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button onClick={handleDelete} className="p-2 bg-red-500 text-white">Delete</button>
    </div>
  );
};

export default TaskItem;
