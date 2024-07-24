import { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ refreshTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [dueDate, setDueDate] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert('Title is required');
      return;
    }

    await axios.post('http://localhost:5000/api/tasks', { title, description, status, dueDate }, {
      headers: {
        'Authorization': `Bearer ${token}` // Set the Authorization header
      }
    });
    refreshTasks();
    setTitle('');
    setDescription('');
    setStatus('To Do');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="p-3 border rounded-md"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-3 border rounded-md"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="p-3 border rounded-md"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-3 border rounded-md"
      />
      <button type="submit" className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Task</button>
    </form>
  );
};

export default TaskForm;
