import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { useMonaco } from './context';

const StyledContainer = styled.div`
  width: 100%;
  height: 250px;
  border: none;
  margin-bottom: 1rem;
  border: 2px solid black;
  resize: vertical;
  overflow: auto;
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

// eslint-disable-next-line react/display-name
const MonacoEditor = React.forwardRef(({ value }, editorRef) => {
  const monaco = useMonaco();

  const elementRef = useRef();

  const containerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    };

    // resize with element
    let observer;

    if (containerRef.current) {
      observer = new ResizeObserver(handleResize).observe(containerRef.current);
    }

    // resize with window
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // TODO: dispose editor and subscriptions
  useEffect(() => {
    if (elementRef.current && !editorRef.current) {
      // setup editor
      editorRef.current = monaco.editor.create(elementRef.current, options);
      monaco.editor.setTheme('vs-dark');
      const model = monaco.editor.createModel(value, 'javascript');

      editorRef.current.setModel(model);
    }
  }, [monaco.editor, value]);

  return (
    <StyledContainer ref={containerRef}>
      <div ref={elementRef} style={{ height: '100%', width: '100%' }} />
    </StyledContainer>
  );
});

export default MonacoEditor;
