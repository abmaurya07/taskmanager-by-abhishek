import React from 'react';
import TaskForm from './TaskForm';
import TaskView from './TaskView'

const TaskModal = ({ showForm, setShowForm, selectedTask, viewTask }) => (
  showForm && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg relative">
        <button 
          onClick={() => setShowForm(false)} 
          className="absolute top-2 right-2 text-black text-xl"
        >
          &times;
        </button>
        
        {viewTask ? <TaskView task={selectedTask} /> : <TaskForm task={selectedTask} /> }
      </div>
    </div>
  )
);

export default TaskModal;
