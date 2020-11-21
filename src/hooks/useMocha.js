import { useEffect } from 'react';
import useScript from './useScript';

const useMocha = test => {
  const { isLoaded } = useScript('https://cdnjs.cloudflare.com/ajax/libs/mocha/8.2.1/mocha.min.js');

  useEffect(() => {
    if (isLoaded) {
      test();
    }
  }, [isLoaded]);

  return isLoaded;
};

export default useMocha;
