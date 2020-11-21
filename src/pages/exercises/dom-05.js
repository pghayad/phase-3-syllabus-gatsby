import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { describe, it } = window;

    describe('span.likes-count', function() {
      const element = document.querySelector('.likes-count');

      it('should have the updated number of likes', function() {
        expect(element.textContent).to.equal('12');
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <button>
          Likes: <span className="likes-count">11</span>
        </button>
      </div>
    </Layout>
  );
}

export default Exercise;
