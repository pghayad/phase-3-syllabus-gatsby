import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

// Layout
const StyledContainer = styled.div`
  #exercise {
    background: whitesmoke;
    padding: 0.5rem;
  }

  .hidden {
    display: none;
  }
`;

// action creators
const createTest = isError => ({
  type: 'run_test',
  payload: isError,
});

const IFrameLayout = ({ children, isMochaLoaded }) => {
  const [showTest, setShowTest] = useState(false);

  const [showExercise, setShowExercise] = useState(false);

  useEffect(() => {
    if (isMochaLoaded) {
      window.mocha.setup({
        ui: 'bdd',
        cleanReferencesAfterRun: false,
      });

      window.top.postMessage({ type: 'ready' }, '*');

      const runTests = () => {
        setShowTest(true);

        window.mocha.run(function(failures) {
          window.top.postMessage(createTest(failures > 0), '*');
        });
      };

      const createScript = code => {
        // TODO: don't eval? lol. Just make sure we're not sending client scripts to other users, k?
        const script = document.createElement('script');

        script.innerHTML = code;
        document.body.appendChild(script);
      };

      const messageHandler = {
        reload() {
          window.location.reload();
        },
        run({ javascript, runTest }) {
          try {
            createScript(javascript);
            setShowExercise(true);
            if (runTest) {
              runTests();
              window.scrollTo(0, 0);
            }
          } catch (e) {
            console.error(e);
          }
        },
      };

      // TODO: check message origin (use an env var to set origins)
      window.addEventListener('message', ({ data: { type, payload } }) => {
        if (messageHandler[type]) {
          messageHandler[type](payload);
        }
      });
    }
  }, [isMochaLoaded]);

  if (!isMochaLoaded) return null;

  return (
    <StyledContainer>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/mocha/8.2.1/mocha.min.css"
          integrity="sha512-6RWs5FczsXwODIZJoL0szz3bXX5W+q/m7bFVQ7HSwZbBXd7PpyYrg2f9Dr4Y2Guqi5k4NJsemxXuiiFoI8fQ4A=="
          crossOrigin="anonymous"
        />
      </Helmet>
      {isMochaLoaded ? (
        <>
          <div id="mocha" className={showTest ? null : 'hidden'} />
          <div id="exercise" className={showExercise ? null : 'hidden'}>
            {children}
          </div>
        </>
      ) : null}
    </StyledContainer>
  );
};

export default IFrameLayout;
