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
          label = 'New';
          labelClassName += ' bg-blue-200 ';
        //   text-blue-500
          break;
      case 3:
          label = 'Waiting For Negotiator';
          labelClassName += ' bg-pink-200 ';
        //   text-pink-500
          break;
      case 4:
          label = 'Waiting For Permitter';
          labelClassName += ' bg-cyan-200 ';
        //   text-cyan-500
          break;
      case 5:
          label = 'Waiting For Approver';
          labelClassName += ' bg-orange-200 ';
        //   text-orange-500
          break;
      case 6:
          label = 'Approver Rejected';
          labelClassName += ' bg-[#FFC2C2] ';
        //  bg-[#FFEBEC] text-[#E74C3C]
          break;
      case 7:
          label = 'Revised';
          labelClassName += ' bg-violet-200 ';
        //   text-violet-600
          break;
      case 8:
          label = 'Closed';
          labelClassName += '  bg-green-200';
        //   text-[#01A648]
          break;
    default:
      label = 'Unknown Status';
      labelClassName += ' bg-gray-400 text-gray-700';
  }

  return <div className='h-full flex items-center w-full justify-center'><div className={labelClassName}>{label}</div></div>;
};

export default StatusRenderer