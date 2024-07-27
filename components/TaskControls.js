import React from 'react';
import { MdDelete } from 'react-icons/md';
import ToolTip from './ToolTip';
import { FaPlus } from 'react-icons/fa';

const TaskControls = ({  handleDeleteSelected,selectedTasks, setShowForm }) => (
  <div className="flex justify-between items-center my-4">


    {
      selectedTasks.length > 0 && 
        <ToolTip tooltip="Delete Selected Tasks">
      <div className="flex items-center cursor-pointer" onClick={handleDeleteSelected}>
        <MdDelete size={17} color='#DC3545' />
      <span className="ml-1 text-red-600">Bulk Delete</span>
    </div>
        </ToolTip>
    }


    

<button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
          style={{ marginLeft: 'auto' }}
        >
          <FaPlus />
          <span> New Task</span>
        </button>


  </div>
);

export default TaskControls;
