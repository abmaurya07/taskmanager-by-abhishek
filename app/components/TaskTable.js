import React, { useState } from 'react';
import { FaSortAmountDownAlt, FaSortAmountUp, FaFilter } from 'react-icons/fa'; 
import { MdModeEdit, MdDelete  } from "react-icons/md";

import { useDispatch } from 'react-redux';
import { sortByDate, setFilterStatus } from '../redux/TasksData/tasksSlice';
import ToolTip from './ToolTip';

const TaskTable = ({ tasks, selectedTasks, handleSelectTask, handleStatusChange, handleEditTask, lastTaskRef, handleDelete }) => {
  const [sortingOrder, setSortingOrder] = useState('asc');
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();

  const handleSort = (order) => {
    dispatch(sortByDate(order));
    setSortingOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = (status) => {
    dispatch(setFilterStatus(status));
    setShowFilter(false);
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded mt-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 border"></th>
            <th className="px-4 py-2 border">Task Name</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">
              <div className='flex items-center justify-center'>
              Due Date 
              {sortingOrder === 'desc' ? 
                <FaSortAmountDownAlt onClick={() => handleSort('desc')} className="ml-2 cursor-pointer"/> : 
                <FaSortAmountUp onClick={() => handleSort('asc')} className="ml-2 cursor-pointer"/>
              }
              </div>
            </th>
            <th className="px-4 py-2 border">
            <div className='flex items-center justify-center'>

              Status
              <FaFilter onClick={() => setShowFilter(!showFilter)} className="ml-2 cursor-pointer" />
              {showFilter && (
                <div className="absolute bg-white shadow-lg p-2 mt-2">
                  <button onClick={() => handleFilterChange('All')} className="block px-4 py-2">All</button>
                  <button onClick={() => handleFilterChange('In Progress')} className="block px-4 py-2">In Progress</button>
                  <button onClick={() => handleFilterChange('To Do')} className="block px-4 py-2">To Do</button>
                  <button onClick={() => handleFilterChange('Done')} className="block px-4 py-2">Done</button>
                </div>
              )}

              </div>
            </th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id} ref={index === tasks.length - 1 ? lastTaskRef : null}>
              <td className="px-4 py-2 border">
                <input 
                  type="checkbox" 
                  onChange={() => handleSelectTask(task._id)} 
                  checked={selectedTasks.includes(task._id)} 
                />
              </td>
              <td className="px-4 py-2 border">{task.title}</td>
              <td className="px-4 py-2 border">{task.description}</td>
              <td className="px-4 py-2 border">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
              <td className="px-4 py-2 border">
                <select 
                  value={task.status} 
                  onChange={(e) => handleStatusChange(e.target.value, task._id)} 
                  className="p-2 border"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </td>
              <td className="px-4 py-2 border flex items-center justify-center">
        <ToolTip tooltip="Edit Task">

                <MdModeEdit size={20} color='#007BFF' className='m-2 cursor-pointer' onClick={() => handleEditTask(task)} />
                  </ToolTip>

                  <ToolTip tooltip="Delete Task">
                <MdDelete size={20} color='#DC3545' className='cursor-pointer' onClick={() => handleDelete(task._id)} />

                  </ToolTip>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
