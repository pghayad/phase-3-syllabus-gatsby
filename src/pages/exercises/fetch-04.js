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

    describe('addItem()', function() {
      it('should add a new item to the list', async function() {
        const item = {
          shoppingListId: 1,
          name: 'Orange Juice',
          price: 3,
        };

        // eslint-disable-next-line no-undef
        await addItem(item);

        const responseItem = response.items[response.items.length - 1];

        expect(responseItem.shoppingListId).to.equal(1);
        expect(responseItem.name).to.equal('Orange Juice');
        expect(responseItem.price).to.equal(3);
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <form id="add-item">
          <h2>Add Item</h2>
          <input type="hidden" id="shoppingListId" name="shoppingListId" value="1" />
          <label>
            Name: <input type="text" id="name" name="name" />
          </label>
          <label>
            Price: <input type="number" id="price" price="name" />
          </label>
          <button type="submit">Add Item</button>
        </form>

        <h1 id="list">{'{list name}'}</h1>
        <h3 id="budget">{'Budget: ${list budget}'}</h3>
        <ul className="items"></ul>
      </div>
    </Layout>
  );
}

export default Exercise;
