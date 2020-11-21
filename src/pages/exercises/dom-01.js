import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
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
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <h3>Change My Text</h3>
      </div>
    </Layout>
  );
}

export default Exercise;
