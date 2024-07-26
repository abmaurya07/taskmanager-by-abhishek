'use client';
import withAuth from './utils/withAuth';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTasks, setPage } from './redux/TasksData/tasksSlice';
import { addTask, deleteSelectedTasks, deleteTask, fetchTasks, getTaskSummary, updateTaskStatus } from './redux/TasksData/tasksActions';
import TaskTable from './components/TaskTable';
import TaskSummary from './components/TaskSummary';
import TaskControls from './components/TaskControls';
import TaskModal from './components/TaskModal';
import UserSection from './components/UserSection';
import { FaPlus } from "react-icons/fa";


const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showViewForm, setShowViewForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const dispatch = useDispatch();
  const { tasks, status, loading, hasMore, page, selectedTasks, taskSummary } = useSelector((state) => state.tasks);
  const observer = useRef();



  useEffect(() => {

    dispatch(getTaskSummary())
    

  },[tasks])

  useEffect(() => {

      dispatch(fetchTasks(page));

    
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



  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowEditForm(true);
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowViewForm(true);
  };

  return (
    <div className="p-8">
      <UserSection username="User" />

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold text-gray-800">Tasks Dashboard</h1>
        <button
    onClick={() => setShowForm(true)}
    className="flex items-center space-x-2 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
  >
    <FaPlus />
    <span> New Task</span>
  </button>
      </div>
      <TaskSummary taskSummary={taskSummary} />
      {tasks.length !== 0 && <TaskControls 
        handleSelectAll={handleSelectAll} 
        handleDeleteSelected={handleDeleteSelected} 
        selectedTasks={selectedTasks}
        allSelected={selectedTasks.length === filteredTasks.length}
      />}
      
      <TaskTable 
        tasks={filteredTasks} 
        selectedTasks={selectedTasks} 
        handleSelectTask={handleSelectTask} 
        handleStatusChange={handleStatusChange} 
        handleEditTask={handleEditTask} 
        handleViewTask={handleViewTask}
        lastTaskRef={lastTaskRef}
        handleDelete={handleDelete}
        
      />
      <TaskModal showForm={showForm} setShowForm={setShowForm}  />
      {showEditForm && selectedTask && (
        <TaskModal showForm={showEditForm} setShowForm={setShowEditForm} selectedTask={selectedTask} />
      )}
      {showViewForm && selectedTask && (
        <TaskModal showForm={showViewForm} viewTask={true} setShowForm={setShowViewForm} selectedTask={selectedTask} />
      )}
    </div>
  );
};

export default withAuth(Home);
