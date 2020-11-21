import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { describe, it } = window;

    describe('button', function() {
      it('should change text when clicked', function() {
        const button = document.querySelector('.exercise button');

        const currentText = button.textContent;

        button.click();

        expect(button.textContent).to.not.equal(currentText);
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <button>Listen to me!</button>
      </div>
    </Layout>
  );
}

export default Exercise;
