import React, { useState } from 'react';

function Terminal() {
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const { exec } = window.require('child_process');
      exec(input, (err, stdout) => {
        setOutput(err ? err.message : stdout);
        setInput('');
      });
    }
  };

  return (
    <div className="terminal">
      <pre>{output}</pre>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleCommand}
        placeholder="Type a command..."
      />
    </div>
  );
}

export default Terminal;

const styles = `
  .terminal {
    background: #1e1e1e;
    color: white;
    padding: 10px;
    height: 200px;
    overflow: auto;
  }
  .terminal input {
    background: none;
    border: none;
    color: white;
    width: 100%;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);