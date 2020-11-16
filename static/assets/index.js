// Mocha runner
const runTests = () => {
  document.querySelector('#mocha').classList.remove('hidden');
  document.querySelector('#mocha').innerHTML = '';

  mocha.run(function(failures) {
    const isError = failures > 0;

    window.top.postMessage({ type: 'run_test', payload: isError }, '*');
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
      document.querySelector('#exercise').classList.remove('hidden');
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
  messageHandler[type](payload);
});

// ready
window.top.postMessage({ type: 'ready' }, '*');
