import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { describe, it } = window;

    describe('ul#emoji-list', function() {
      const ul = document.querySelector('#emoji-list');

      it('should have three children', function() {
        expect(ul.children.length).to.equal(3);
      });

      it('should display the first emoji', function() {
        const firstLi = ul.children[0];

        expect(firstLi.textContent).to.equal('🍏');
      });

      it('should display the last emoji', function() {
        const lastLi = ul.children[2];

        expect(lastLi.textContent).to.equal('🍍');
      });

      it('should give each li a class of "fruit"', function() {
        for (let li of ul.children) {
          expect(li.className).to.equal('fruit');
        }
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <h3>Great Fruits</h3>
        <ul id="emoji-list"></ul>
      </div>
    </Layout>
  );
}

export default Exercise;
