import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTasks, setPage } from '@redux/TasksData/tasksSlice';
import { deleteSelectedTasks, deleteTask, fetchTasks, getTaskSummary, updateTaskStatus } from '@redux/TasksData/tasksActions';
import ConfirmationDialog from '@components/ConfirmationDialog';  // Import the ConfirmationDialog
import TaskTable from '@components/TaskTable';
import TaskSummary from '@components/TaskSummary';
import TaskControls from '@components/TaskControls';
import TaskModal from '@components/TaskModal';
import UserSection from '@components/UserSection';
import WithRedux from '@/utils/WithRedux';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showViewForm, setShowViewForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDialog, setShowDialog] = useState(false);  // Add state for dialog
  const [taskToDelete, setTaskToDelete] = useState(null);  // State to hold the task being deleted

  const dispatch = useDispatch();
  const { tasks, status, loading, hasMore, page, selectedTasks, taskSummary } = useSelector((state) => state.tasks);
  const observer = useRef();

  useEffect(() => {
    dispatch(getTaskSummary());
  }, [dispatch]);

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
    setTaskToDelete(taskId);  // Set the task to be deleted
    setShowDialog(true);  // Show the confirmation dialog
  };

  const handleDeleteSelected = () => {
    setShowDialog(true);  // Show the confirmation dialog
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete));
      setTaskToDelete(null);
    } else {
      dispatch(deleteSelectedTasks(selectedTasks));
    }
    setShowDialog(false);  // Hide the dialog after confirming
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
    setShowDialog(false);  // Hide the dialog after canceling
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
    <div className="p-8" style={{paddingTop: '100px'}}>
      <UserSection />
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold text-gray-800">Tasks Summary</h1>
      </div>
      <TaskSummary taskSummary={taskSummary} />
      <TaskControls
        handleDeleteSelected={handleDeleteSelected}
        selectedTasks={selectedTasks}
        setShowForm={setShowForm}
      />
      <TaskTable
        tasks={filteredTasks}
        handleSelectAll={handleSelectAll}
        allSelected={selectedTasks.length === filteredTasks.length}
        selectedTasks={selectedTasks}
        handleSelectTask={handleSelectTask}
        handleStatusChange={handleStatusChange}
        handleEditTask={handleEditTask}
        handleViewTask={handleViewTask}
        lastTaskRef={lastTaskRef}
        handleDelete={handleDelete}
      />
      <TaskModal showForm={showForm} setShowForm={setShowForm} />
      {showEditForm && selectedTask && (
        <TaskModal showForm={showEditForm} setShowForm={setShowEditForm} selectedTask={selectedTask} />
      )}
      {showViewForm && selectedTask && (
        <TaskModal showForm={showViewForm} viewTask={true} setShowForm={setShowViewForm} selectedTask={selectedTask} />
      )}
      {showDialog && (
        <ConfirmationDialog
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default WithRedux(Dashboard);
