import React, { useCallback, useReducer, useState } from 'react';
import styled from '@emotion/styled';

import Editor from './monaco';
import Iframe from './iframe';

import useLocalStorage from '../../hooks/useLocalStorage';

const colors = {
  pending: 'yellow',
  passing: 'green',
  failing: 'red',
};

const StyledContainer = styled.div`
  width: 100%;
  border: ${({ testStatus }) => colors[testStatus] || 'yellow'};
`;

// TODO: instead of iframe, https://developers.google.com/caja/docs/gettingstarted

const Sandbox = ({ html, test, starterCode = '// your code here' }) => {
  const [storedValue, setValue] = useLocalStorage(html, starterCode);

  console.log(storedValue);

  const [editorValue, setEditorValue] = useState(storedValue);

  const [runTest, setRunTest] = useState(false);

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const [testStatus, setTestStatus] = useState('pending');

  const handleRunCode = useCallback(({ code, runTest }) => {
    setValue(code);
    setEditorValue(code);
    setRunTest(runTest);
    forceUpdate();
    if (!runTest) {
      setTestStatus('pending');
    }
  }, []);

  const handleRunTest = passing => {
    setTestStatus(passing ? 'passing' : 'failing');
  };

  return (
    <StyledContainer testStatus={testStatus}>
      <Iframe
        onRunTest={handleRunTest}
        html={html}
        javascript={editorValue}
        test={test}
        runTest={runTest}
      />
      <Editor value={editorValue} onRunCode={handleRunCode} />
    </StyledContainer>
  );
};

export default Sandbox;
