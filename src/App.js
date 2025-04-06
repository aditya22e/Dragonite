import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Tabs from './components/Tabs';
import StatusBar from './components/Statusbar';
import Terminal from './components/Terminal';

function App() {
  const [files, setFiles] = useState([{ name: 'Untitled.js', content: '// Start coding' }]);
  const [activeFile, setActiveFile] = useState(0);
  const [terminalVisible, setTerminalVisible] = useState(false);

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Tabs files={files} activeFile={activeFile} setActiveFile={setActiveFile} />
        <Editor content={files[activeFile].content} />
        {terminalVisible && <Terminal />}
        <StatusBar toggleTerminal={() => setTerminalVisible(!terminalVisible)} />
      </div>
    </div>
  );
}

export default App;