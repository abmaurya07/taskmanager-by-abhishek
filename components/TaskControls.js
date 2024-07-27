import React from 'react';
import { MdDelete } from 'react-icons/md';
import ToolTip from './ToolTip';
import { FaPlus } from 'react-icons/fa';
import CustomButton from './CustomButton';

const TaskControls = ({ handleSelectAll, handleDeleteSelected,selectedTasks, allSelected }) => (
  <div className="flex justify-between items-center my-4">
    <div className="flex items-start">
    <div className='mr-2'>
      <input 
        type="checkbox" 
        onChange={handleSelectAll} 
        checked={allSelected} 
      /> 
      Select All
    </div>

    {
      selectedTasks.length > 0 && 
        <ToolTip tooltip="Delete Selected Tasks">
      <div className="flex items-center cursor-pointer" onClick={handleDeleteSelected}>
        <MdDelete size={20} color='#DC3545' />
      <span className="ml-2 text-red-600">Bulk Delete</span>
    </div>
        </ToolTip>
    }

    </div>

    

<button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <FaPlus />
          <span> New Task</span>
        </button>


  </div>
);

export default TaskControls;
