import React, { useRef, useEffect } from 'react';

const ConfirmationDialog = ({ onConfirm, onCancel }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onCancel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div ref={dialogRef} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="bg-red-100 p-4 rounded-lg mb-4">
          <p className="text-red-700 font-normal text-md">
          This action is irreversible and cannot be undone.
          </p>
        </div>
    
        <div className="flex justify-between space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
                onConfirm();
                onClose();
              }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
