const StatusFilter = ({ status, setStatus }) => {
  return (
    <div className="flex space-x-4 mb-4">
      {['All', 'To Do', 'In Progress', 'Done'].map(s => (
        <button
          key={s}
          onClick={() => setStatus(s)}
          className={`p-2 rounded-md ${status === s ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {s}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
