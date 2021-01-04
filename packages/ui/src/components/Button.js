import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, handleClick }) => (
    <button
      type="button"
      className="mt-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      onClick={() => handleClick()}
    >
      {children}
    </button>
)

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;