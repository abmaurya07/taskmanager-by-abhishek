import React from 'react';

const TaskTable = ({ tasks, selectedTasks, handleSelectTask, handleStatusChange, handleEditTask, lastTaskRef }) => (
  <div className="overflow-x-auto bg-white shadow rounded mt-4">
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="px-4 py-2 border"></th>
          <th className="px-4 py-2 border">Task Name</th>
          <th className="px-4 py-2 border">Description</th>
          <th className="px-4 py-2 border">Due Date</th>
          <th className="px-4 py-2 border">Status</th>
          <th className="px-4 py-2 border"></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task._id} ref={index === tasks.length - 1 ? lastTaskRef : null}>
            <td className="px-4 py-2 border">
              <input 
                type="checkbox" 
                onChange={() => handleSelectTask(task._id)} 
                checked={selectedTasks.includes(task._id)} 
              />
            </td>
            <td className="px-4 py-2 border">{task.title}</td>
            <td className="px-4 py-2 border">{task.description}</td>
            <td className="px-4 py-2 border">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
            <td className="px-4 py-2 border">
              <select 
                value={task.status} 
                onChange={(e) => handleStatusChange(e.target.value, task._id)} 
                className="p-2 border"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </td>
            <td className="px-4 py-2 border">
              <button 
                onClick={() => handleEditTask(task)} 
                className="p-2 bg-yellow-500 text-white"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TaskTable;
