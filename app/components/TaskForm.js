import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, fetchTasks, updateTask } from '../redux/TasksData/tasksActions';

const TaskForm = ({ task = null, setShowForm }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('To Do');
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const {page} = useSelector((state) => state.tasks);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
      setStatus(task.status);
      setIsEditing(true);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description, dueDate, status };

    if (isEditing) {
      dispatch(updateTask({ id: task._id, task: newTask }));
    } else {
      dispatch(addTask(newTask));
    }

    dispatch(fetchTasks(page));

    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('To Do');
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6  bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
   

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="block p-2 text-xl w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-200 ease-in-out"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          required
          className="block p-2 text-xl w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-200 ease-in-out"
        />
      </div>
      <div className='flex gap-5'>
      <div className='flex-1'>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-200 ease-in-out"
        />
      </div>
      <div >
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-200 ease-in-out"
        >
          <option className='text-sm' value="To Do">To Do</option>
          <option className='text-sm' value="In Progress">In Progress</option>
          <option className='text-sm' value="Done">Done</option>
        </select>
      </div>
      </div>
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-3xl shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 ease-in-out "
      >
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
