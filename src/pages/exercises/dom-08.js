import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { describe, it } = window;

    describe('div.exercise', function() {
      const exercise = document.querySelector('.exercise');

      it('should have no child elements left', function() {
        expect(exercise.children.length).to.equal(0);
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <h3>Now you see me...</h3>
      </div>
    </Layout>
  );
}

export default Exercise;
