import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

// Configure Monaco for packaged app
function setupMonaco() {
  if (process.env.NODE_ENV !== 'production') return;

  self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
      return './vs/base/worker/workerMain.js';
    },
  };
}

function CodeEditor({ fileContent, onChange }) {
  const [code, setCode] = useState(fileContent || '');
  const [loading, setLoading] = useState(false);

  const handleEditorChange = (value) => {
    setCode(value);
    if (onChange) onChange(value);
  };

  const handleMount = (editor) => {
    editor.onKeyDown(async (e) => {
      if (e.ctrlKey && e.keyCode === 32) { // Ctrl+Space
        e.preventDefault();
        setLoading(true);

        try {
          const response = await fetch(
            `http://localhost:3001/suggest?code=${encodeURIComponent(code)}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const position = editor.getPosition();
          editor.executeEdits('', [
            {
              range: new monaco.Range(
                position.lineNumber,
                position.column,
                position.lineNumber,
                position.column
              ),
              text: `\n${data.suggestion}`,
            },
          ]);
        } catch (error) {
          console.error('Failed to fetch suggestion:', error);
          editor.setValue(code + '\n// Error: Could not fetch suggestion');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  setupMonaco();

  return (
    <Editor
      height="75vh"
      defaultLanguage="javascript"
      value={code}
      onChange={handleEditorChange}
      onMount={handleMount}
      theme="vs-dark"
      options={{
        readOnly: false,
        minimap: { enabled: false },
        fontSize: 14,
      }}
    />
  );
}

export default CodeEditor;