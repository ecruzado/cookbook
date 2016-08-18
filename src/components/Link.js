import React, { PropTypes } from 'react';

const Link = ({ active, children, onClick }) => {
  let currentClass = active? 'active': 'waves-effect';

  // if (active) {
  //   return <span>{children}</span>
  // }
  return (
    <li className={currentClass}>
      <a href="#" 
        onClick={e => {
          e.preventDefault()
          onClick()
        }}
      >
        {children}
      </a>
    </li>
  )
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link;