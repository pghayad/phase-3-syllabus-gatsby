import React from 'react';
import { expect } from 'chai';
import { setupWorker } from 'msw';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';
import { response, handlers } from '../../mocks/shoppingList';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { describe, it } = window;

    const worker = setupWorker(...handlers);

    worker.start();

    describe('updateItem()', function() {
      it('should mark the item as purchased', async function() {
        // eslint-disable-next-line no-undef
        await updateItem(1, { purchased: true });

        const responseItem = response.items.find(item => item.id === 1);

        expect(responseItem.purchased).to.equal(true);
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
