import React from 'react';
import { expect } from 'chai';
import { spy } from 'chai-spies';
import fetchMock from 'fetch-mock';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { after, before, describe, it } = window;

    before(function() {
      fetchMock.mock('https://randomfox.ca/floof/', {
        image: 'https://randomfox.ca/images',
      });
    });

    after(function() {
      fetchMock.restore();
    });

    describe('getFox()', function() {
      it("sends a fetch request to 'https://randomfox.ca/floof/'", async function() {
        const fetchSpy = spy.on(window, 'fetch');

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
