import React from 'react';

const TaskView = ({ task }) => {
  if (!task) {
    return <p>No task selected.</p>;
  }

  const { title, description, dueDate, status } = task;

  return (
    <div className="space-y-4 p-4 border border-gray-300 rounded-md shadow-sm">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div>
        <p className="text-sm text-gray-700"><strong>Description:</strong> {description}</p>
      </div>
      <div>
        <p className="text-sm text-gray-700"><strong>Due Date:</strong> {dueDate ? new Date(dueDate).toLocaleDateString() : 'No due date'}</p>
      </div>
      <div>
        <p className="text-sm text-gray-700"><strong>Status:</strong> {status}</p>
      </div>
    </div>
  );
};

export default TaskView;
