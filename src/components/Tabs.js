import React from 'react';

function Tabs({ files, activeFile, setActiveFile }) {
  return (
    <div className="tabs">
      {files.map((file, index) => (
        <span
          key={index}
          className={index === activeFile ? 'tab active' : 'tab'}
          onClick={() => setActiveFile(index)}
        >
          {file.name}
        </span>
      ))}
    </div>
  );
}

export default Tabs;

const styles = `
  .tabs {
    background: #252526;
    padding: 5px;
    color: white;
  }
  .tab {
    margin-right: 10px;
    cursor: pointer;
  }
  .tab.active {
    border-bottom: 2px solid #007acc;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);