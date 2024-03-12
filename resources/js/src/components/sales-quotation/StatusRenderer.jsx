import React from 'react'

const StatusRenderer = ({ value }) => {
  let labelClassName = 'h-[75%] font-medium w-full flex items-center justify-center rounded-lg'; 
  let label = 'Unknown';

  switch (value) {
      case 1:
          label = 'Draft';
          labelClassName += ' bg-gray-200';
        //   text-gray-500
          break;
      case 2:
          label = 'Customer Confirmed';
          labelClassName += ' bg-green-200 ';
        //   text-blue-500
          break;
      case 3:
          label = 'Customer Rejected';
          labelClassName += ' bg-pink-200 ';
        //   text-pink-500
          break;
      case 4:
          label = 'Cancelled';
          labelClassName += ' bg-gray-400 text-gray-700 ';
        //   text-cyan-500
          break;
    default:
      label = 'Unknown Status';
      labelClassName += ' bg-gray-400 text-gray-700';
  }

  return <div className='h-full flex items-center w-full justify-center'><div className={labelClassName}>{label}</div></div>;
};

export default StatusRenderer