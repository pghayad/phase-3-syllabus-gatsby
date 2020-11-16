import React, { useEffect, useReducer, useRef, useState } from 'react';
import styled from '@emotion/styled';

import Editor from './monaco';
import useLocalStorage from '../../hooks/useLocalStorage';

const StyledContainer = styled.div`
  width: 100%;
`;

const StyledIFrame = styled.iframe`
  width: 100%;
  height: 250px;
  border: none;
  margin-top: 1rem;
  border: 2px solid black;
  resize: vertical;
  overflow-y: scroll;
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

const Sandbox = ({ src, starterCode = '// your code here', children }) => {
  const [javascript, setJavascript] = useLocalStorage(src, starterCode);

  const [runTest, setRunTest] = useState(false);

  const [testStatus, setTestStatus] = useState('pending');

  const [updated, forceUpdate] = useReducer(x => x + 1, 0);

  const editorRef = useRef();

  const iframeRef = useRef();

  const sendMessage = data => {
    iframeRef.current.contentWindow.postMessage(data, '*');
  };

  useEffect(() => {
    const handler = event => {
      switch (event.data.type) {
        case 'ready':
          sendMessage({
            type: 'run',
            payload: { javascript, runTest },
          });
          break;
        case 'run_test':
          handleRunTest(event.data.payload);
          break;
        case 'run_test_error':
          console.error('Error running test:', event.data.payload);
          break;
        default:
          break;
      }
    };

    if (iframeRef.current) {
      sendMessage({ type: 'reload' });
    }

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, [updated, javascript, runTest, handleRunTest]);

  const handleRunTest = passing => {
    setTestStatus(passing ? 'passing' : 'failing');
  };

  const runCode = runTest => {
    const model = editorRef.current.getModel();

    setJavascript(model.getValue());
    setRunTest(runTest);
    forceUpdate();
  };

  return (
    <StyledContainer testStatus={testStatus}>
      <StyledIFrame title="sandbox" ref={iframeRef} src={src} />
      <Editor ref={editorRef} value={javascript} />
      <div>
        <StyledButton onClick={() => runCode(false)}>Run Code</StyledButton>
        <StyledButton onClick={() => runCode(true)}>Run Test</StyledButton>
      </div>
    </StyledContainer>
  );
};

export default Sandbox;
