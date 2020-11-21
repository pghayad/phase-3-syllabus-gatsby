import { useState, useEffect } from 'react';

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

export default useScript;
