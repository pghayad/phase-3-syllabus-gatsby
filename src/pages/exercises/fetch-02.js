import React from 'react';
// import { expect } from 'chai';
// import { spy } from 'chai-spies';
// import fetchMock from 'fetch-mock';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    // const { describe, it } = window;
    // tk
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <section id="weather"></section>
      </div>
    </Layout>
  );
}

export default Exercise;
