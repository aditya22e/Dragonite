import React from 'react';

function StatusBar({ toggleTerminal }) {
  return (
    <div className="status-bar">
      <span>Ready</span>
      <button onClick={toggleTerminal}>Terminal</button>
    </div>
  );
}

export default StatusBar;

const styles = `
  .status-bar {
    background: #007acc;
    color: white;
    padding: 5px;
    display: flex;
    justify-content: space-between;
  }
  .status-bar button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);