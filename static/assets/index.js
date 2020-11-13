// Mocha runner
const runTests = () => {
  document.querySelector('.exercise').style.display = 'none';
  document.querySelector('#mocha').style.display = 'block';
  document.querySelector('#mocha').innerHTML = '';

  mocha.run(function(failures) {
    const isError = failures > 0;

    window.top.postMessage({ type: 'run_test', payload: isError }, '*');
  });
};

const hideTests = () => {
  document.querySelector('#mocha').style.display = 'none';
  document.querySelector('.exercise').style.display = 'block';
};

// iframe comms
window.top.postMessage({ type: 'ready' }, '*');

const reload = () => {
  window.location.reload();
};

// TODO: use a safety net here, something to sandbox user script
const addScript = ({ javascript, runTest }) => {
  let userScript = document.body.querySelector('#user-script');

  if (userScript) {
    userScript.remove();
  }

  userScript = document.createElement('script');
  userScript.id = 'user-script';
  userScript.innerHTML = `
(() => {
${javascript}
${runTest ? 'runTests()' : 'hideTests()'}
})()
  `;
  document.body.append(userScript);
};

// TODO: check message origin (use an env var to set origins)
window.addEventListener('message', ({ data }) => {
  console.log(data);
  switch (data.type) {
    case 'code':
      addScript(data.payload);
      break;
    case 'reload':
      reload();
      break;
  }
});
