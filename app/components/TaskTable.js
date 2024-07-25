import React, { useState } from 'react';
import { FaSortAmountDownAlt, FaSortAmountUp, FaFilter, FaEye } from 'react-icons/fa'; 
import { MdModeEdit, MdDelete  } from "react-icons/md";

import { useDispatch } from 'react-redux';
import { sortByDate, setFilterStatus } from '../redux/TasksData/tasksSlice';
import ToolTip from './ToolTip';


const TaskTable = ({ tasks, selectedTasks, handleSelectTask, handleStatusChange, handleEditTask, handleViewTask, lastTaskRef, handleDelete }) => {
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
            <th className=" py-2 border"></th>
            <th className="px-4 py-2 border">Task Name</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">
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
            <th className="px-4 py-2 border">
            <div className='flex items-center justify-center'>

              Status
              <ToolTip tooltip="Filter by Status">
              <FaFilter onClick={() => setShowFilter(!showFilter)} className="ml-2 cursor-pointer" />
                </ToolTip>
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
        <tbody className='text-center'>
          {tasks.map((task, index) => (
            <tr key={task._id} ref={index === tasks.length - 1 ? lastTaskRef : null}>
              <td className="py-2 border  ">
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
  className={`p-1 pl-2 pr-2 border text-center font-light rounded-3xl	
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

               <ToolTip tooltip="View Task">
         <FaEye size={20} color='#58D68D' className='m-2 cursor-pointer' onClick={() => handleViewTask(task)} />
                </ToolTip> 
        <ToolTip tooltip="Edit Task">

                <MdModeEdit size={20} color='#5DADE2' className='m-2 cursor-pointer' onClick={() => handleEditTask(task)} />
                  </ToolTip>

                  <ToolTip tooltip="Delete Task">
                <MdDelete size={20} color='#E74C3C' className='cursor-pointer' onClick={() => handleDelete(task._id)} />

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
