import React from 'react';
import TaskForm from './TaskForm';
import TaskView from './TaskView';

const TaskModal = ({ showForm, setShowForm, selectedTask, viewTask }) => (
  showForm && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="rounded-lg  relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
        <button 
          onClick={() => setShowForm(false)} 
          className="absolute top-2 right-2 text-gray-900 text-3xl "
        >
          &times;
        </button>
        
        {viewTask ? <TaskView task={selectedTask}/> : <TaskForm task={selectedTask} setShowForm={setShowForm}/>}
      </div>
    </div>
  )
);

export default TaskModal;
