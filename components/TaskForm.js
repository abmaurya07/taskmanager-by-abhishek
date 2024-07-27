import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, fetchTasks, updateTask } from '../redux/TasksData/tasksActions';
import CustomButton from './CustomButton';

const TaskForm = ({ task = null, setShowForm }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('To Do');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.tasks);

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
    setLoading(true);
    const newTask = { title, description, dueDate, status };

    if (isEditing) {
      dispatch(updateTask({ id: task._id, task: newTask }));
    } else {
      dispatch(addTask(newTask));
    }

    dispatch(fetchTasks(page));

    setLoading(false);

    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('To Do');
    setIsEditing(false);
    setShowForm(false);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{isEditing ? 'Edit Task' : 'Add New Task'}</h2>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="block p-2 text-lg w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-300 ease-in-out"
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
          className="block p-2 text-lg w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-300 ease-in-out"
        />
      </div>

      <div className='flex gap-5'>
        <div className='flex-1'>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            min={today}
            onChange={(e) => setDueDate(e.target.value)}
            className="block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-300 ease-in-out"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-300 ease-in-out"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <CustomButton type='submit' loading={loading}>
        {isEditing ? 'Update Task' : 'Add Task'}
      </CustomButton>
    </form>
  );
};

export default TaskForm;
