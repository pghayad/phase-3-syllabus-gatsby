import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

const StyledIFrame = styled.iframe`
  width: 100%;
  height: 200px;
  border: none;
  margin-top: 1rem;
  padding: 0.5rem;
  border: 2px solid black;
`;

const IFrame = ({ javascript, html, runTest, onRunTest }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const sendMessage = data => {
      iframeRef.current.contentWindow.postMessage(data, '*');
    };

    const handler = event => {
      switch (event.data.type) {
        case 'ready':
          sendMessage({
            type: 'code',
            payload: { javascript, runTest },
          });
          break;
        case 'run_test':
          onRunTest(event.data.payload);
          break;
        case 'run_test_error':
          console.error('Error running test:', event.data.payload);
          break;
        default:
          break;
      }
    };

    if (iframeRef.current) {
      sendMessage({
        type: 'reload',
      });
    }

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, [javascript, runTest, onRunTest]);

  return <StyledIFrame title="sandbox" ref={iframeRef} src={html} />;
};

export default IFrame;
