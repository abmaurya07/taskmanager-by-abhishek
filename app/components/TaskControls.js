import React from 'react';

const TaskControls = ({ handleSelectAll, handleDeleteSelected, allSelected }) => (
  <div className="flex justify-between items-center my-4">
    <div>
      <input 
        type="checkbox" 
        onChange={handleSelectAll} 
        checked={allSelected} 
      /> 
      Select All
    </div>
    <button 
      onClick={handleDeleteSelected} 
      className="p-2 bg-red-500 text-white"
    >
      Delete Selected
    </button>
  </div>
);

export default TaskControls;
