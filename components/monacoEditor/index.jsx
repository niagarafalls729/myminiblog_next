import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';

const MonacoDualEditor = () => {
  const htmlEditorRef = useRef(null);
  const jsEditorRef = useRef(null);

  const runCode = () => {
    const htmlCode = htmlEditorRef.current.getValue();
    const jsCode = jsEditorRef.current.getValue();
    const outputHtmlDiv = document.getElementById('output_html');
    const outputJsDiv = document.getElementById('output_js');

    outputHtmlDiv.innerHTML = '';
    outputJsDiv.innerHTML = '';

    const originalConsoleLog = console.log;
    console.log = (...args) => {
      const logMessage = args.join(' ');
      const logElement = document.createElement('div');
      logElement.textContent = logMessage;
      outputJsDiv.appendChild(logElement);
      originalConsoleLog(...args);
    };

    try {
      outputHtmlDiv.innerHTML = htmlCode;
      new Function(jsCode)();
    } catch (err) {
      const errorElement = document.createElement('div');
      errorElement.className = 'error';
      errorElement.textContent = `Error: ${err.message}`;
      outputJsDiv.appendChild(errorElement);
    } finally {
      console.log = originalConsoleLog;
    }
  };

  const handleEditorMount = (editor, editorRef) => {
    editorRef.current = editor;

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      runCode();
    });
  };

  return (
    <div style={{ display: 'flex', height: '80vh', width: '60vw' }}>
      <div style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
        <Editor
          theme="vs-dark"
          height="50%"
          defaultLanguage="html"
          defaultValue="<h1>Hello, World!</h1>"
          onMount={editor => handleEditorMount(editor, htmlEditorRef)}
        />
        <Editor
          theme="vs-dark"
          height="50%"
          defaultLanguage="javascript"
          defaultValue="console.log('Hello, Monaco!');"
          onMount={editor => handleEditorMount(editor, jsEditorRef)}
        />
      </div>
      <button onClick={runCode} style={{ height: '50px', alignSelf: 'center' }}>
        Run
      </button>
      <div style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
        <div
          id="output_html"
          style={{ flex: 1, border: '1px solid #ccc' }}
        ></div>
        <div id="output_js" style={{ flex: 1, border: '1px solid #ccc' }}></div>
      </div>
    </div>
  );
};

export default MonacoDualEditor;
