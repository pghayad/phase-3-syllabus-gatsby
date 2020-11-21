import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { beforeEach, describe, it } = window;

    describe('span.likes-count', function() {
      const likes = document.querySelector('.likes-count');

      const button = document.querySelector('.exercise button');

      beforeEach(function() {
        likes.textContent = '11';
      });

      it('should increment the likes by 1 when clicked once', function() {
        button.click();
        expect(likes.textContent).to.equal('12');
      });

      it('should increment the likes by 2 when clicked twice', function() {
        button.click();
        button.click();
        expect(likes.textContent).to.equal('13');
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
