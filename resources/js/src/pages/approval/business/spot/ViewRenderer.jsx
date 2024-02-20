import React from 'react'
import { Link } from 'react-router-dom';

const ViewRenderer = ({ value }) => {

  return <Link to='/approval/business/spot/view' className=''>{value}</Link>;
};

export default ViewRenderer