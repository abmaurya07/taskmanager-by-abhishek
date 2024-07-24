import TaskItem from './TaskItem';

const TaskList = ({ tasks, refreshTasks }) => {
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} refreshTasks={refreshTasks} />
      ))}
    </div>
  );
};

export default TaskList;
