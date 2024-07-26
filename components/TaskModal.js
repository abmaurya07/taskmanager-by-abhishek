import React from 'react';
import TaskForm from './TaskForm';
import TaskView from './TaskView';

const TaskModal = ({ showForm, setShowForm, selectedTask, viewTask }) => (
  showForm && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
        <button 
          onClick={() => setShowForm(false)} 
          className="absolute top-2 right-2 text-gray-800 text-3xl hover:text-gray-600 transition duration-300 ease-in-out"
        >
          &times;
        </button>
        
        {viewTask ? <TaskView task={selectedTask}/> : <TaskForm task={selectedTask} setShowForm={setShowForm}/>}
      </div>
    </div>
  )
);


export default TaskModal;
