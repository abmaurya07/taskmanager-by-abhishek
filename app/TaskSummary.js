import React from 'react';

const TaskSummary = ({ taskSummary }) => (
  <div className="bg-white p-4 shadow-lg rounded-xl mb-10 flex flex-wrap gap-4 text-start">
    <div className="flex-1 min-w-[200px] border-b-2 border-gray-200 p-4 flex justify-center sm:border-r-2 sm:border-b-0">
      <div>
        <h3 className="font-bold text-slate-700 text-xl">TOTAL TASKS</h3>
        <p className='text-3xl font-semibold text-purple-600'>{taskSummary['All']}</p>
      </div>
    </div>
    <div className="flex-1 min-w-[200px] border-b-2 border-gray-200 p-4 flex justify-center sm:border-r-2 sm:border-b-0">
      <div>
        <h3 className="font-semibold text-gray-600 text-lg">YET TO START</h3>
        <p className='font-semibold text-gray-600 text-2xl'>{taskSummary['To Do']}</p>
      </div>
    </div>
    <div className="flex-1 min-w-[200px] border-b-2 border-gray-200 p-4 flex justify-center sm:border-r-2 sm:border-b-0">
      <div>
        <h3 className="font-semibold text-gray-600 text-lg">IN PROGRESS</h3>
        <p className='font-semibold text-gray-600 text-2xl'>{taskSummary['In Progress']}</p>
      </div>
    </div>
    <div className="flex-1 min-w-[200px]  p-4 flex justify-center ">
      <div>
        <h3 className="font-semibold text-gray-600 text-lg">COMPLETED</h3>
        <p className='font-semibold text-gray-600 text-2xl'>{taskSummary['Done']}</p>
      </div>
    </div>
  </div>
);

export default TaskSummary;
