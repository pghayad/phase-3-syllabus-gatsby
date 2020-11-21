import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { describe, it } = window;

    describe('p#find-me', function() {
      const element = document.querySelector('#find-me');

      it('should have the class "primary"', function() {
        expect(element.className).to.equal('primary');
      });

      it('should have have a blue color', function() {
        expect(element.style.color).to.equal('blue');
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
