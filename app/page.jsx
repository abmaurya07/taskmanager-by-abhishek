'use client'
import withAuth from './utils/withAuth';
import WithRedux from './utils/WithRedux'
import TaskForm from './components/TaskForm';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTasks, setPage } from './redux/TasksData/tasksSlice';
import { deleteSelectedTasks, deleteTask, fetchTasks, updateTaskStatus } from './redux/TasksData/tasksActions';





const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;


  const dispatch = useDispatch();
  const { tasks, status, loading, hasMore, page, selectedTasks } = useSelector((state) => state.tasks);
  const observer = useRef();

  console.log('tasks', tasks)
  console.log('status', status);


  useEffect(() => {
    if(tasks.length === 0){
      dispatch(fetchTasks(page));

    }
  }, [page, dispatch]);

  const handleSelectTask = (taskId) => {
    dispatch(setSelectedTasks(selectedTasks.includes(taskId)
      ? selectedTasks.filter(id => id !== taskId)
      : [...selectedTasks, taskId]));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      dispatch(setSelectedTasks(tasks.map(task => task._id)));
    } else {
      dispatch(setSelectedTasks([]));
    }
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleDeleteSelected = () => {
    dispatch(deleteSelectedTasks(selectedTasks));
  };

  const handleStatusChange = (status, taskId) => {
   
    dispatch(updateTaskStatus({ taskId, status }));
  };


  const lastTaskRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(setPage(page + 1));
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, page, dispatch]);






  const filteredTasks = tasks.filter(task => status === 'All' || task.status === status);
  console.log('filteredTasks', filteredTasks)

  const taskSummary = {
    total: tasks.length,
    todo: tasks.filter(task => task.status === 'To Do').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    done: tasks.filter(task => task.status === 'Done').length,
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
            {filteredTasks.map((task, index) => (
              <tr key={task._id} ref={index === filteredTasks.length - 1 ? lastTaskRef : null}>
                <td className="px-4 py-2 border">
                  <input type="checkbox" onChange={() => handleSelectTask(task._id)} checked={selectedTasks.includes(task._id)} />
                </td>
                <td className="px-4 py-2 border">{task.title}</td>
                <td className="px-4 py-2 border">{task.description}</td>
                <td className="px-4 py-2 border">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
                <td className="px-4 py-2 border">
                  <select value={task.status} onChange={(e) => handleStatusChange(e.target.value, task._id)} className="p-2 border">
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
          <div className="bg-white p-8 rounded shadow-lg relative">
            <button onClick={() => setShowForm(false)} className="absolute top-2 right-2 text-black text-xl">&times;</button>
            <TaskForm />
          </div>
        </div>
      )}

      {showEditForm && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg relative">
            <button onClick={() => setShowEditForm(false)} className="absolute top-2 right-2 text-black text-xl">&times;</button>
            <TaskForm task={selectedTask}  />
          </div>
        </div>
      )}
    </div>
  
  );
};



export default withAuth(Home);
