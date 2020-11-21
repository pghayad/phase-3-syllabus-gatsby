import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { describe, it } = window;

    describe('div.exercise', function() {
      const element = document.querySelector('.exercise');

      it('should have two children', function() {
        expect(element.children.length).to.equal(2);
      });

      it('should no longer have the `p#find-me` element inside', function() {
        expect(element.querySelector('#find-me')).to.equal(null);
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <p>You can ignore this one</p>
        <p id="find-me">Find me</p>
        <p>You can ignore me too</p>
      </div>
    </Layout>
  );
}

export default Exercise;
