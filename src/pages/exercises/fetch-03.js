import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { setupWorker } from 'msw';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';
import { response, handlers } from '../../mocks/shoppingList';

chai.use(spies);

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { beforeEach, describe, it } = window;

    const worker = setupWorker(...handlers);

    worker.start();

    describe('getList()', function() {
      beforeEach(function() {
        const items = document.querySelector('.items');

        while (items.firstChild) items.firstChild.remove();
      });

      it("sends a fetch request to 'https://localhost:3000/shopping_lists/1'", async function() {
        const fetchSpy = chai.spy.on(window, 'fetch');

        // eslint-disable-next-line no-undef
        await getList();
        expect(fetchSpy, 'A fetch to the API was not found').to.have.been.called.with(
          'https://localhost:3000/shopping_lists/1'
        );
      });

      it('displays the list name', async function() {
        // eslint-disable-next-line no-undef
        await getList();

        expect(document.querySelector('#list').textContent, 'h1#list textContent').to.equal(
          response.name
        );
      });

      it('displays the list budget', async function() {
        // eslint-disable-next-line no-undef
        await getList();

        expect(document.querySelector('#budget').textContent, 'h3#budget textContent').to.equal(
          `Budget: $${response.budget}`
        );
      });

      it('displays the first item', async function() {
        // eslint-disable-next-line no-undef
        await getList();

        const li = document.querySelectorAll('.items li')[0];

        expect(li.className, 'li.item className').to.equal('item');
        expect(li.dataset.id, 'li.item dataset.id').to.equal(`${response.items[0].id}`);

        const details = li.querySelector('.details');

        expect(details, 'p.details').to.exist;

        expect(details.textContent, 'p.details textContent').to.include(response.items[0].name);
        expect(details.textContent, 'p.details textContent').to.include(response.items[0].price);
      });

      it('displays the second item', async function() {
        // eslint-disable-next-line no-undef
        await getList();

        const li = document.querySelectorAll('.items li')[1];

        expect(li.className, 'li.item className').to.equal('item');
        expect(li.dataset.id, 'li.item dataset.id').to.equal(`${response.items[1].id}`);

        const details = li.querySelector('.details');

        expect(details, 'p.details').to.exist;

        expect(details.textContent, 'p.details textContent').to.include(response.items[1].name);
        expect(details.textContent, 'p.details textContent').to.include(response.items[1].price);
      });
    });

    describe('getList() Bonus', function() {
      beforeEach(function() {
        const items = document.querySelector('.items');

        while (items.firstChild) items.firstChild.remove();
      });

      it('displays the total purchased amount', async function() {
        // eslint-disable-next-line no-undef
        await getList();

        expect(document.querySelector('#total').textContent, 'p#total textContent').to.include(
          '13'
        );
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <h1 id="list">{'{list name}'}</h1>
        <h3 id="budget">{'Budget: ${list budget}'}</h3>
        <ul className="items"></ul>
        <p id="total">{'Total price: ${price of all purchased items (BONUS!)}'}</p>
      </div>
    </Layout>
  );
}

export default Exercise;
