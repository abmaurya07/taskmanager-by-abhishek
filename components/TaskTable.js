import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaSortAmountDownAlt, FaSortAmountUp, FaFilter } from 'react-icons/fa';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { sortByDate, setFilterStatus } from '../redux/TasksData/tasksSlice';
import ToolTip from './ToolTip';

const TaskTable = ({ tasks, selectedTasks, handleSelectTask, handleStatusChange, handleEditTask, handleViewTask, lastTaskRef, handleDelete, handleSelectAll, allSelected }) => {
  const [sortingOrder, setSortingOrder] = useState('asc');
  const [filterStatus, setFilterStatusState] = useState('All');
  const dispatch = useDispatch();
  const { taskSummary } = useSelector((state) => state.tasks);

  const { 'All': allTasks, 'Done': doneTasks, 'In Progress': inProgressTasks, 'To Do': toDoTasks } = taskSummary;

  const handleSort = (order) => {
    dispatch(sortByDate(order));
    setSortingOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = (event) => {
    const status = event.target.value;
    setFilterStatusState(status);
    dispatch(setFilterStatus(status));
  };

  return (
    <>
      {tasks.length === 0 ? (
        <div className='flex items-center justify-center h-52'>
          <p className="text-center text-gray-500">No tasks found!</p>
        </div>
      ) : (
        <div className="relative">
          <div className="block lg:hidden">
            {/* Mobile Card Layout */}
            <div className="space-y-4">
              {/* Status Filter for Mobile */}
              <div className='flex items-center justify-start mb-4'>
                      Filter by Status
                      <ToolTip tooltip="Filter by Status">
                        <div className="relative flex items-center ml-2">
                          <FaFilter className="absolute left-2"/>
                          <select 
                            onChange={handleFilterChange} 
                            className="pl-8 border rounded p-1 cursor-pointer outline-none bg-transparent"
                            defaultValue="All"
                          >
                            <option value="All">All ({allTasks})</option>
                            <option disabled={inProgressTasks === 0} value="In Progress">In Progress ({inProgressTasks})</option>
                            <option disabled={toDoTasks === 0} value="To Do">To Do ({toDoTasks})</option>
                            <option disabled={doneTasks === 0} value="Done">Done ({doneTasks})</option>
                          </select>
                        </div>
                      </ToolTip>
                    </div>

              {tasks.map((task, index) => (
                <div key={task._id} className={`p-4 border rounded-lg ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ToolTip tooltip="View Task">
                        <FaEye size={20} color='#58D68D' className='cursor-pointer' onClick={() => handleViewTask(task)} />
                      </ToolTip>
                      <ToolTip tooltip="Edit Task">
                        <MdModeEdit size={20} color='#5DADE2' className='cursor-pointer' onClick={() => handleEditTask(task)} />
                      </ToolTip>
                      <ToolTip tooltip="Delete Task">
                        <MdDelete size={20} color='#E74C3C' className='cursor-pointer' onClick={() => handleDelete(task._id)} />
                      </ToolTip>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                    <span>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</span>
                    <select 
                      value={task.status} 
                      onChange={(e) => handleStatusChange(e.target.value, task._id)} 
                      className="p-1 pl-2 pr-2 border rounded-lg outline-none cursor-pointer"
                      style={{ 
                        backgroundColor: task.status === "To Do" ? "#FEE2E2" :
                                        task.status === "In Progress" ? "#E0E7FF" :
                                        task.status === "Done" ? "#D1FAE5" : "",
                        color: task.status === "To Do" ? "#EF4444" :
                               task.status === "In Progress" ? "#4F46E5" :
                               task.status === "Done" ? "#10B981" : ""
                      }}
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden lg:block overflow-x-auto bg-white shadow mt-4">
            <table className="min-w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 border border-l-slate-400 border-b-slate-400 border-t-slate-400">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={allSelected} 
                      className='mr-2'
                    /> 
                  </th>
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
                    <div className='flex items-center justify-center'>
                      Status
                      <ToolTip tooltip="Filter by Status">
                        <div className="relative flex items-center ml-2">
                          <FaFilter className="absolute left-2"/>
                          <select 
                            onChange={handleFilterChange} 
                            className="pl-8 border rounded p-1 cursor-pointer outline-none bg-transparent"
                            defaultValue="All"
                          >
                            <option value="All">All ({allTasks})</option>
                            <option disabled={inProgressTasks === 0} value="In Progress">In Progress ({inProgressTasks})</option>
                            <option disabled={toDoTasks === 0} value="To Do">To Do ({toDoTasks})</option>
                            <option disabled={doneTasks === 0} value="Done">Done ({doneTasks})</option>
                          </select>
                        </div>
                      </ToolTip>
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
                    <td className="px-4 py-2 border cell-max-width">{task.title.trim().length > 20 ? task.title.slice(0, 20) + '...' : task.title}</td>
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
                    <td className="px-4 py-2 ">
                      <div className='flex items-center justify-center'>
                        <ToolTip tooltip="View Task" placement='bottom-full'>
                          <FaEye size={20} color='#58D68D' className='m-2 cursor-pointer' onClick={() => handleViewTask(task)} />
                        </ToolTip> 
                        <ToolTip tooltip="Edit Task" placement='bottom-full'>
                          <MdModeEdit size={20} color='#5DADE2' className='m-2 cursor-pointer' onClick={() => handleEditTask(task)} />
                        </ToolTip>
                        <ToolTip tooltip="Delete Task" placement='bottom-full'>
                          <MdDelete size={20} color='#E74C3C' className='m-2 cursor-pointer' onClick={() => handleDelete(task._id)} />
                        </ToolTip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskTable;
