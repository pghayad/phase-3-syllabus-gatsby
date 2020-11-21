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
        const firstLi = ul.firstElementChild;

        expect(firstLi.textContent).to.equal('🍏');
      });

      it('should display the last emoji', function() {
        const lastLi = ul.lastElementChild;

        expect(lastLi.textContent).to.equal('🍍');
      });

      it('should remove the first li when clicked', function() {
        const firstLi = ul.firstElementChild;

        firstLi.click();
        expect(firstLi.parentElement).to.equal(null);
      });

      it('should remove the last li when clicked', function() {
        const lastLi = ul.lastElementChild;

        lastLi.click();
        expect(lastLi.parentElement).to.equal(null);
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
