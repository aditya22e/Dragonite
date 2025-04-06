import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const pty = window.require('node-pty');

function TerminalComponent() {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      theme: { background: '#1e1e1e', foreground: '#ffffff' },
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();
    xtermRef.current = term;

    const shell = process.platform === 'win32' ? 'cmd.exe' : 'bash';
    const ptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: term.cols,
      rows: term.rows,
      cwd: process.env.HOME || process.env.USERPROFILE,
      env: process.env,
    });

    ptyProcess.onData((data) => {
      term.write(data);
    });

    term.onData((data) => {
      ptyProcess.write(data);
    });

    const handleResize = () => {
      fitAddon.fit();
      ptyProcess.resize(term.cols, term.rows);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      ptyProcess.kill();
      term.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ height: '30vh', background: '#1e1e1e', padding: '10px' }}>
      <div ref={terminalRef} style={{ height: '100%' }} />
    </div>
  );
}

export default TerminalComponent;
