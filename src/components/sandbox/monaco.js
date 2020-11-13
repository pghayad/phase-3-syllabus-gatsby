import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { useMonaco } from './context';

const StyledContainer = styled.div`
  width: 100%;
  height: 200px;
  border: none;
  margin-bottom: 1rem;
  border: 2px solid black;
`;

const StyledButton = styled.button`
  margin: 1rem;
  padding: 1rem;
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid rgb(230, 236, 241);
  transition: border 200ms ease 0s;
  box-shadow: rgba(116, 129, 141, 0.1) 0px 3px 8px 0px;
  text-decoration: none;

  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};

  &:hover {
    text-decoration: none;
    border: 1px solid #1ed3c6;
  }
`;

const options = {
  theme: 'dark',
  minimap: {
    enabled: false,
  },
  wordWrap: 'on',
  lineDecorationsWidth: 1,
  lineNumbersMinChars: 3,
  lineHeight: 24,
  fontSize: 15.3,
  fontFamily: "'Fira Code', monospace",
  colorDecorators: false,
};

const MonacoEditor = ({ value, onRunCode = () => {} }) => {
  const monaco = useMonaco();

  const elementRef = useRef();

  const editorRef = useRef();

  // resize with window
  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // TODO: dispose editor and subscriptions
  useEffect(() => {
    if (elementRef.current && !editorRef.current) {
      // setup editor
      editorRef.current = monaco.editor.create(elementRef.current, options);
      monaco.editor.setTheme('vs-dark');
      const model = monaco.editor.createModel(value, 'javascript');

      editorRef.current.setModel(model);
      onRunCode({ code: value, runTest: false });
    }
  }, [monaco.editor, value, onRunCode]);

  const handleCodeClick = () => {
    const model = editorRef.current.getModel();

    onRunCode({ code: model.getValue(), runTest: false });
  };

  const handleTestClick = () => {
    const model = editorRef.current.getModel();

    onRunCode({ code: model.getValue(), runTest: true });
  };

  return (
    <>
      <StyledContainer ref={elementRef} />
      <div>
        <StyledButton onClick={handleCodeClick}>Run Code</StyledButton>
        <StyledButton onClick={handleTestClick}>Run Test</StyledButton>
      </div>
    </>
  );
};

export default MonacoEditor;
