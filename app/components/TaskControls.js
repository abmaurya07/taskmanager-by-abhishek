import React from 'react';
import { MdDelete } from 'react-icons/md';
import ToolTip from './ToolTip';

const TaskControls = ({ handleSelectAll, handleDeleteSelected,selectedTasks, allSelected }) => (
  <div className="flex justify-between items-center my-4">
    <div>
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
);

export default TaskControls;
