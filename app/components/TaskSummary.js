import React from 'react';

const TaskSummary = ({ taskSummary }) => (
  <div className="bg-white p-4 shadow rounded mb-4 flex space-x-4">
    <div className="flex-1 text-center">
      <h3 className="font-bold">Total Tasks</h3>
      <p>{taskSummary.total}</p>
    </div>
    <div className="flex-1 text-center">
      <h3 className="font-bold">Yet to Start</h3>
      <p>{taskSummary.todo}</p>
    </div>
    <div className="flex-1 text-center">
      <h3 className="font-bold">In Progress</h3>
      <p>{taskSummary.inProgress}</p>
    </div>
    <div className="flex-1 text-center">
      <h3 className="font-bold">Completed</h3>
      <p>{taskSummary.done}</p>
    </div>
  </div>
);

export default TaskSummary;
