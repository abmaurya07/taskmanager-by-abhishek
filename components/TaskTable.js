import React, { useState, useEffect, useRef } from 'react';
import { FaSortAmountDownAlt, FaSortAmountUp, FaFilter, FaEye } from 'react-icons/fa'; 
import { MdModeEdit, MdDelete } from "react-icons/md";

import { useDispatch, useSelector } from 'react-redux';
import { sortByDate, setFilterStatus } from '../redux/TasksData/tasksSlice';
import ToolTip from './ToolTip';

const TaskTable = ({ tasks, selectedTasks, handleSelectTask, handleStatusChange, handleEditTask, handleViewTask, lastTaskRef, handleDelete }) => {
  const [sortingOrder, setSortingOrder] = useState('asc');
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();
  const filterRef = useRef(null);

  const { taskSummary } = useSelector((state) => state.tasks);

  const { 'All': allTasks, 'Done': doneTasks, 'In Progress': inProgressTasks, 'To Do': toDoTasks } = taskSummary;

  // Handle outside click to close the filter
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSort = (order) => {
    dispatch(sortByDate(order));
    setSortingOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = (status) => {
    dispatch(setFilterStatus(status));
    setShowFilter(false);
  };

  return (
    <>
      {tasks.length === 0 ? (
        <div className='flex items-center justify-center h-52'>
          <p className="text-center text-gray-500">No tasks found!</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow mt-4">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 border border-l-slate-400 border-b-slate-400 border-t-slate-400"></th>
                <th className="px-4 py-2 border border-slate-400">Task Name</th>
                <th className="px-4 py-2 border border-slate-400">Description</th>
                <th className="px-4 py-2 border border-slate-400">
                  <div className='flex items-center justify-center'>
                    Due Date 
                    <ToolTip tooltip="Sort by Date">
                      {sortingOrder === 'desc' ? 
                        <FaSortAmountDownAlt onClick={() => handleSort('desc')} className="ml-2 cursor-pointer"/> : 
                        <FaSortAmountUp onClick={() => handleSort('asc')} className="ml-2 cursor-pointer"/>
                      }
                    </ToolTip>
                  </div>
                </th>
                <th className="px-4 py-2 border border-slate-400">
                  <div className='relative flex items-center justify-center'>
                    <div className='flex items-center'>
                      Status
                      <ToolTip tooltip="Filter by Status">
                        <FaFilter onClick={() => setShowFilter(!showFilter)} className="ml-2 cursor-pointer" />
                      </ToolTip>
                    </div>
                    {showFilter && (
                      <div ref={filterRef} className="absolute bg-white shadow-lg p-2 mt-2 z-10">
                        <button 
                          onClick={() => handleFilterChange('All')} 
                          className={`block px-4 py-2 ${allTasks === 0 ? 'cursor-not-allowed text-gray-400' : ''}`} 
                          disabled={allTasks === 0}
                        >
                          All ({allTasks})
                        </button>
                        <button 
                          onClick={() => handleFilterChange('In Progress')} 
                          className={`block px-4 py-2 ${inProgressTasks === 0 ? 'cursor-not-allowed text-gray-400' : ''}`} 
                          disabled={inProgressTasks === 0}
                        >
                          In Progress ({inProgressTasks})
                        </button>
                        <button 
                          onClick={() => handleFilterChange('To Do')} 
                          className={`block px-4 py-2 ${toDoTasks === 0 ? 'cursor-not-allowed text-gray-400' : ''}`} 
                          disabled={toDoTasks === 0}
                        >
                          To Do ({toDoTasks})
                        </button>
                        <button 
                          onClick={() => handleFilterChange('Done')} 
                          className={`block px-4 py-2 ${doneTasks === 0 ? 'cursor-not-allowed text-gray-400' : ''}`} 
                          disabled={doneTasks === 0}
                        >
                          Done ({doneTasks})
                        </button>
                      </div>
                    )}
                  </div>
                </th>
                <th className="px-4 py-2 border border-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {tasks.map((task, index) => (
                <tr key={task._id} ref={index === tasks.length - 1 ? lastTaskRef : null} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  <td className="py-2 border">
                    <input 
                      type="checkbox" 
                      onChange={() => handleSelectTask(task._id)} 
                      checked={selectedTasks.includes(task._id)} 
                    />
                  </td>
                  <td className="px-4 py-2 border">{task.title}</td>
                  <td className="px-4 py-2 border text-start cell-max-width">{task.description.trim().length > 50 ? task.description.slice(0, 50) + '...' : task.description}</td>
                  <td className="px-4 py-2 border">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
                  <td className="px-4 py-2 border">
                    <select 
                      value={task.status} 
                      onChange={(e) => handleStatusChange(e.target.value, task._id)} 
                      className={`p-1 pl-2 pr-2 border text-center font-light rounded-3xl outline-none cursor-pointer
                        ${task.status === "To Do" ? "bg-red-100 text-red" : ""} 
                        ${task.status === "In Progress" ? "bg-purple-100 text-gray" : ""} 
                        ${task.status === "Done" ? "bg-green-100 text-green" : ""}`
                      }
                    >
                      <option value="To Do" className="bg-red-100 text-red">To Do</option>
                      <option value="In Progress" className="bg-purple-100 text-blue">In Progress</option>
                      <option value="Done" className="bg-green-100 text-green">Done</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border flex items-center justify-center">
                    <ToolTip tooltip="View Task" placement='bottom-full'>
                      <FaEye size={20} color='#58D68D' className='m-2 cursor-pointer' onClick={() => handleViewTask(task)} />
                    </ToolTip> 
                    <ToolTip tooltip="Edit Task" placement='bottom-full'>
                      <MdModeEdit size={20} color='#5DADE2' className='m-2 cursor-pointer' onClick={() => handleEditTask(task)} />
                    </ToolTip>
                    <ToolTip tooltip="Delete Task" placement='bottom-full'>
                      <MdDelete size={20} color='#E74C3C' className='cursor-pointer' onClick={() => handleDelete(task._id)} />
                    </ToolTip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TaskTable;
