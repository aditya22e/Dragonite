Dragonite - AI-Powered Code Editor 
Dragonite is a sleek, AI-powered code editor inspired by Visual Studio Code, designed for developers who crave a powerful and intuitive coding experience. Built with React, Electron, and Express, Dragonite integrates the Monaco Editor for a robust coding environment, an integrated terminal for seamless command execution, and real-time code suggestions powered by the Gemini AI API.
Features 
Monaco Editor: Syntax highlighting, IntelliSense, and a familiar VS Code-like editing experience.

Integrated Terminal: Run shell commands directly within the app (e.g., cmd.exe on Windows, bash on Linux/macOS).

AI Code Suggestions: Get real-time code suggestions using the Gemini API (trigger with Ctrl+Space

Dependencies Mentioned
Here’s a breakdown of the dependencies we installed for Dragonite, as reflected in the post:

React: For the frontend UI.

Electron: For building the desktop app.

Express: For the backend server handling Gemini API requests.

@monaco-editor/react: For the code editor component.

xterm.js: For the terminal UI.

xterm-addon-fit: To make the terminal resize dynamically.

node-pty: To spawn shell processes for the terminal.

@google/generative-ai: For integrating the Gemini API for AI code suggestions.

dotenv: To load environment variables (e.g., GEMINI_API_KEY).

