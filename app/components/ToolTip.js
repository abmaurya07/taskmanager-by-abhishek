import React, { useState } from 'react';

const ToolTip = ({ children, tooltip, placement='top-full' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="cursor-pointer relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className={  `absolute ${placement}  bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10`}>
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default ToolTip;
