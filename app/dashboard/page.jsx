'use client';
// This is the main dashboard component of the application.
// It renders a table of tasks, a form to add new tasks, and a form to edit existing tasks.
// It also renders a summary of the number of tasks in each status.
// The component is wrapped in a withAuth HOC, which checks if the user is authenticated before rendering the component.

import withAuth from '@utils/withAuth';
// Import the withAuth HOC, which checks if the user is authenticated before rendering the component.

import { useState, useEffect, useRef, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setSelectedTasks, setPage } from '@redux/TasksData/tasksSlice';
import {  deleteSelectedTasks, deleteTask, fetchTasks, getTaskSummary, updateTaskStatus } from '@redux/TasksData/tasksActions';

// Components
import TaskTable from '@components/TaskTable';
import TaskSummary from '@components/TaskSummary';
import TaskControls from '@components/TaskControls';
import TaskModal from '@components/TaskModal';
import UserSection from '@components/UserSection';

import WithRedux from '@/utils/WithRedux';

const Dashboard = () => {
  // Set the initial state of the showForm variable to false.
  const [showForm, setShowForm] = useState(false);
  // Set the initial state of the showEditForm variable to false.
  const [showEditForm, setShowEditForm] = useState(false);
  // Set the initial state of the showViewForm variable to false.
  const [showViewForm, setShowViewForm] = useState(false);
  // Set the initial state of the selectedTask variable to null.
  const [selectedTask, setSelectedTask] = useState(null);

  const dispatch = useDispatch();

  // Get the tasks, status, loading, hasMore, page, selectedTasks, and taskSummary from the Redux store.
  const { tasks, status, loading, hasMore, page, selectedTasks, taskSummary } = useSelector((state) => state.tasks);

  const observer = useRef();
  // reference to the IntersectionObserver instance.


  useEffect(() => {
    // When the component mounts, fetch the tasks and set the initial state of the component.
    dispatch(getTaskSummary())
  }, [tasks, dispatch])

  useEffect(() => {
    // When the page changes, fetch the tasks and set the initial state of the component.
    dispatch(fetchTasks(page));
  }, [page, dispatch]);

  const handleSelectTask = (taskId) => {
    // When a task is selected, add it to the selectedTasks array.
    dispatch(setSelectedTasks(selectedTasks.includes(taskId)
      ? selectedTasks.filter(id => id !== taskId)
      : [...selectedTasks, taskId]));
  };

  const handleSelectAll = (e) => {
    // When the select all checkbox is clicked, add all tasks to the selectedTasks array if the checkbox is checked.
    if (e.target.checked) {
      dispatch(setSelectedTasks(tasks.map(task => task._id)));
    } else {
      dispatch(setSelectedTasks([]));
    }
  };

  const handleDelete = (taskId) => {
    // When a task is deleted, remove it from the selectedTasks array and dispatch the deleteTask action.
    dispatch(deleteTask(taskId));
  };

  const handleDeleteSelected = () => {
    // When the delete selected button is clicked, dispatch the deleteSelectedTasks action with the selectedTasks array.
    dispatch(deleteSelectedTasks(selectedTasks));
  };

  const handleStatusChange = (status, taskId) => {
    // When the status of a task is changed, dispatch the updateTaskStatus action with the new status and the task ID.
    dispatch(updateTaskStatus({ taskId, status }));
  };

  // Create an IntersectionObserver instance to detect when the last task in the list is visible.
  const lastTaskRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      // When the last task in the list is visible, fetch the next page of tasks if there are more tasks.
      if (entries[0].isIntersecting && hasMore) {
        dispatch(setPage(page + 1));
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, page, dispatch]);

  // Filter the tasks by the selected status.
  const filteredTasks = tasks.filter(task => status === 'All' || task.status === status);


  // When a task is edited, set the selectedTask state to the task and show the edit form.
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowEditForm(true);
  };

  // When a task is viewed, set the selectedTask state to the task and show the view form.
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
        tasks={tasks}
        handleSelectAll={handleSelectAll}
        handleDeleteSelected={handleDeleteSelected}
        selectedTasks={selectedTasks}
        allSelected={selectedTasks.length === filteredTasks.length}
        setShowForm={setShowForm}
      />
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
      <TaskModal showForm={showForm} setShowForm={setShowForm} />
      {showEditForm && selectedTask && (
        <TaskModal showForm={showEditForm} setShowForm={setShowEditForm} selectedTask={selectedTask} />
      )}
      {showViewForm && selectedTask && (
        <TaskModal showForm={showViewForm} viewTask={true} setShowForm={setShowViewForm} selectedTask={selectedTask} />
      )}
    </div>
  );
};

export default WithRedux(Dashboard);
