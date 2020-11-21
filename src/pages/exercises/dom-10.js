import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { describe, it } = window;

    describe('ul.clear-me', function() {
      const ul = document.querySelector('.clear-me');

      it('should have no children', function() {
        expect(ul.children.length).to.equal(0);
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <ul className="clear-me">
          <li>pls delete</li>
          <li>remove me too</li>
          <li>no longer want</li>
        </ul>
      </div>
    </Layout>
  );
}

export default Exercise;
