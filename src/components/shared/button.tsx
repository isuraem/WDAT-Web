import React from 'react';
import "./button.css";
const MyButton: React.FC<{ onClick: () => void, textTag: any }> = ({ onClick, textTag }) => {
    return (
      <button type="button"  className="button"  onClick={onClick}>
        <span>{textTag}</span>
      </button>
    );
  };

export default MyButton;