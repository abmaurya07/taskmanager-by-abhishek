'use client'

import withAuth from './utils/withAuth';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import StatusFilter from './components/StatusFilter';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get('http://localhost:5000/api/tasks', { headers: { Authorization: `Bearer ${token}` } });
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const refreshTasks = async () => {
    const { data } = await axios.get('http://localhost:5000/api/tasks', { headers: { Authorization: `Bearer ${token}` } });
    setTasks(data);
  };

  const filteredTasks = tasks.filter(task => status === 'All' || task.status === status);

  const taskSummary = {
    total: tasks.length,
    todo: tasks.filter(task => task.status === 'To Do').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    done: tasks.filter(task => task.status === 'Done').length,
  };

  const handleSelectTask = (taskId) => {
    setSelectedTasks((prevSelectedTasks) => {
      if (prevSelectedTasks.includes(taskId)) {
        return prevSelectedTasks.filter(id => id !== taskId);
      } else {
        return [...prevSelectedTasks, taskId];
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTasks(filteredTasks.map(task => task._id));
    } else {
      setSelectedTasks([]);
    }
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    refreshTasks();
  };
  const handleDeleteSelected = async () => {
    await axios.delete('http://localhost:5000/api/tasks/bulk-delete', {
      data: { ids: selectedTasks },
      headers: { Authorization: `Bearer ${token}` }
    });
    setSelectedTasks([]);
    refreshTasks();
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowEditForm(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Tasks</h1>
        <button onClick={() => setShowForm(true)} className="p-2 bg-blue-500 text-white">Add New Task</button>
      </div>
      <div className="bg-white p-4 shadow rounded mb-4 flex space-x-4">
        <div className="flex-1 text-center">
          <h3 className="font-bold">Total Tasks</h3>
          <p>{taskSummary.total}</p>
        </div>
        <div className="flex-1 text-center">
          <h3 className="font-bold">Yet to Start</h3>
          <p>{taskSummary.todo}</p>
        </div>
        <div className="flex-1 text-center">
          <h3 className="font-bold">In Progress</h3>
          <p>{taskSummary.inProgress}</p>
        </div>
        <div className="flex-1 text-center">
          <h3 className="font-bold">Completed</h3>
          <p>{taskSummary.done}</p>
        </div>
      </div>
      <StatusFilter status={status} setStatus={setStatus} />
      <div className="flex justify-between items-center my-4">
        <div>
          <input type="checkbox" onChange={handleSelectAll} checked={selectedTasks.length === filteredTasks.length} /> Select All
        </div>
        <button onClick={handleDeleteSelected} className="p-2 bg-red-500 text-white">Delete Selected</button>
      </div>
      <div className="overflow-x-auto bg-white shadow rounded mt-4">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border"></th>
              <th className="px-4 py-2 border">Task Name</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Due Date</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task._id}>
                <td className="px-4 py-2 border">
                  <input type="checkbox" onChange={() => handleSelectTask(task._id)} checked={selectedTasks.includes(task._id)} />
                </td>
                <td className="px-4 py-2 border">{task.title}</td>
                <td className="px-4 py-2 border">{task.description}</td>
                <td className="px-4 py-2 border">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
                <td className="px-4 py-2 border">
                  <select value={task.status} onChange={async (e) => {
                    await axios.put(`http://localhost:5000/api/tasks/${task._id}`, { ...task, status: e.target.value }, { headers: { Authorization: `Bearer ${token}` } });
                    refreshTasks();
                  }} className="p-2 border">
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  <button onClick={() => handleEditTask(task)} className="p-2 bg-yellow-500 text-white">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <button onClick={() => setShowForm(false)} className="absolute top-2 right-2 text-black">&times;</button>
            <TaskForm refreshTasks={refreshTasks} />
          </div>
        </div>
      )}

      {showEditForm && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <button onClick={() => setShowEditForm(false)} className="absolute top-2 right-2 text-black">&times;</button>
            <TaskForm task={selectedTask} refreshTasks={refreshTasks} />
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(Home);
