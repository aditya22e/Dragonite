import React from 'react';

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>File Explorer</h3>
      <p>(Files go here)</p>
    </div>
  );
}

export default Sidebar;

const styles = `
  .sidebar {
    width: 200px;
    background: #1e1e1e;
    color: white;
    padding: 10px;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);