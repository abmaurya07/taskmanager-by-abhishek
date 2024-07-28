import React from 'react';
import { FaCalendarAlt, FaClipboardList, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const TaskView = ({ task }) => {
  if (!task) {
    return <p className="text-center text-gray-500">No task selected.</p>;
  }

  const { title, description, dueDate, status } = task;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'Pending':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClipboardList className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white border border-gray-300 rounded-md shadow-sm">
      <div className='flex items-start'>
          <FaClipboardList size={20} className="mr-2" />
        <h2 className="text-xl font-bold break-the-work" style={{margintTop: '-2px'}}>
          {title}
        </h2>
      </div>
      <div>
        <p className="text-sm text-gray-700 break-the-work	"><strong>Description:</strong> {description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <FaCalendarAlt className="text-gray-500" />
        <p className="text-sm text-gray-700"><strong>Due Date:</strong> {dueDate ? new Date(dueDate).toLocaleDateString() : 'No due date'}</p>
      </div>
      <div className="flex items-center space-x-2">
        {getStatusIcon(status)}
        <p className="text-sm text-gray-700"><strong>Status:</strong> {status}</p>
      </div>
    </div>
  );
};

export default TaskView;
