import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { describe, it } = window;

    describe('img', function() {
      const img = document.querySelector('img');

      it('should have the src "https://randomfox.ca/images/25.jpg"', function() {
        expect(img.src).to.equal('https://randomfox.ca/images/25.jpg');
      });

      it('should have an alt property of "A random cute fox"', function() {
        expect(img.alt).to.equal('A random cute fox');
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <div className="image-holder">
          <h3>Look at this cute fox</h3>
          <img src="https://via.placeholder.com/300" alt="No fox yet :(" />
        </div>
      </div>
    </Layout>
  );
}

export default Exercise;
