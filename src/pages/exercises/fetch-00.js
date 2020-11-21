import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { setupWorker, rest } from 'msw';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

chai.use(spies);

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { after, before, describe, it } = window;

    const worker = setupWorker(
      rest.get('https://randomfox.ca/floof/', (req, res, ctx) => {
        return res(
          ctx.delay(500),
          ctx.status(200, 'OK'),
          ctx.json({
            image: 'https://randomfox.ca/images/86.jpg',
          })
        );
      })
    );

    describe('getFox()', function() {
      before(function() {
        worker.start();
      });

      after(function() {
        worker.stop();
      });

      it("sends a fetch request to 'https://randomfox.ca/floof/'", async function() {
        const fetchSpy = chai.spy.on(window, 'fetch');

        // eslint-disable-next-line no-undef
        await getFox();
        expect(fetchSpy, 'A fetch to the API was not found').to.have.been.called.with(
          'https://randomfox.ca/floof/'
        );
      });

      it('displays a random fox image', async function() {
        const img = document.querySelector('img');

        // eslint-disable-next-line no-undef
        await getFox();
        expect(img.src).to.include('https://randomfox.ca/images');
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <div className="image-holder">
          <h3>Look at this cute fox</h3>
          <img src="https://via.placeholder.com/300" alt="A random fox" />
        </div>
      </div>
    </Layout>
  );
}

export default Exercise;
