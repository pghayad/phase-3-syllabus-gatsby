import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { before, describe, it } = window;

    describe('h2', function() {
      let h2;

      before(function() {
        h2 = document.querySelector('.exercise h2');
      });

      it('should have the id "heading-2"', function() {
        expect(h2.id).to.equal('heading-2');
      });

      it('should have the text of "Hand-crafted header"', function() {
        expect(h2.textContent).to.equal('Hand-crafted header');
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise"></div>
    </Layout>
  );
}

export default Exercise;
