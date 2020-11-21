import React, { useEffect, useState } from 'react';
import { expect } from 'chai';
import Helmet from 'react-helmet';
import styled from 'styled-components';

// hookz
const loadScript = src => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
};

const useScript = src => {
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    loadScript(src)
      .then(() => setStatus('loaded'))
      .catch(() => setStatus('error'));
  }, []);

  return {
    isLoaded: status === 'loaded',
    isError: status === 'error',
  };
};

const useMocha = test => {
  const { isLoaded } = useScript('https://cdnjs.cloudflare.com/ajax/libs/mocha/8.2.1/mocha.min.js');

  useEffect(() => {
    if (isLoaded) {
      test();
    }
  }, [isLoaded]);

  return isLoaded;
};

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

const Hello = () => {
  const isMochaLoaded = useMocha(() => {
    const { describe, it } = window;

    describe('h3', function() {
      const h3 = document.querySelector('h3');

      it('should have the text "Hello!"', function() {
        expect(h3.textContent).to.equal('Hello!');
      });
    });
  });

  return (
    <IFrameLayout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <h3>Change My Text</h3>
      </div>
    </IFrameLayout>
  );
};

export default Hello;
