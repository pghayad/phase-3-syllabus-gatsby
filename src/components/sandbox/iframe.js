import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

const StyledIFrame = styled.iframe`
  width: 100%;
  height: 200px;
  border: none;
  margin: 1rem 0;
  padding: 0.5rem;
  border: 2px solid black;
`;

const IFrame = ({ javascript, html, test, runTest, onRunTest }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const sendCode = () => {
      iframeRef.current.contentWindow.postMessage({ javascript, html, test, runTest }, '*');
    };

    const handler = event => {
      switch (event.data.type) {
        case 'ready':
          sendCode();
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

    if (iframeRef.current) sendCode();

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, [javascript, html, test, runTest, onRunTest]);

  return <StyledIFrame title="sandbox" ref={iframeRef} src="/iframe.html" />;
};

export default IFrame;
