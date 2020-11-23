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

    describe('Submitting the form', function() {
      const item = {
        shoppingListId: 1,
        name: 'Orange Juice',
        price: 3,
      };

      const form = document.querySelector('#add-item');

      it('should add a new item to the list', async function() {
        form.shoppingListId.value = item.shoppingListId.toString();
        form.name.value = item.name;
        form.price.value = item.price.toString();

        const button = form.querySelector('button');

        button.click();

        setTimeout(() => {
          const responseItem = response.items[response.items.length - 1];

          const li = document.querySelector('.items').lastElementChild;

          expect(li.className, 'li.item className').to.equal('item');
          expect(li.dataset.id, 'li.item dataset.id').to.equal(`${responseItem.id}`);

          const details = li.querySelector('.details');

          expect(details, 'p.details').to.exist;

          expect(details.textContent, 'p.details textContent').to.include(responseItem.name);
          expect(details.textContent, 'p.details textContent').to.include(responseItem.price);
        }, 1000);
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
