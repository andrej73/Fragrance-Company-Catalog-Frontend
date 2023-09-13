import React from 'react';

function Button({ className, text, onClick }) {
  return (
    <button
      className={`py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button;