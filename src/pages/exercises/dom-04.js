import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { describe, it } = window;

    describe('p', function() {
      const element = document.querySelector('#find-my-child p');

      it('should have the class "secondary"', function() {
        expect(element.className).to.equal('secondary');
      });

      it('should have have a red color', function() {
        expect(element.style.color).to.equal('red');
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <div>
          <p>You can ignore this one</p>
        </div>
        <div id="find-my-child">
          <p>Find me</p>
        </div>
        <div>
          <p>You can ignore me too</p>
        </div>
      </div>
    </Layout>
  );
}

export default Exercise;
