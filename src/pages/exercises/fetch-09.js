import React from 'react';
import { expect } from 'chai';
import { setupWorker } from 'msw';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';
import { handlers } from '../../mocks/shoppingList';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { describe, it } = window;

    const worker = setupWorker(...handlers);

    worker.start();

    describe('Remove button', function() {
      it('should remove the item when clicked', async function() {
        const ul = document.querySelector('.items');

        while (ul.firstChild) ul.firstChild.remove();

        // eslint-disable-next-line no-undef
        await getList();

        const button = document.querySelector('.remove-btn');

        const li = button.closest('li');

        button.click();

        setTimeout(() => {
          expect(li.parentElement, 'li.item parent').to.be.null;
        }, 1000);
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <h1 id="list">{'{list name}'}</h1>
        <h3 id="budget">{'Budget: ${list budget}'}</h3>
        <ul className="items"></ul>
      </div>
    </Layout>
  );
}

export default Exercise;
