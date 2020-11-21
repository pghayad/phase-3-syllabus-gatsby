import React from 'react';
import { expect } from 'chai';
import { spy } from 'chai-spies';
import fetchMock from 'fetch-mock';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { after, before, beforeEach, describe, it } = window;

    const response = {
      name: 'bulbasaur!',
      sprites: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      },
      abilities: [
        {
          ability: {
            name: 'overgrow',
          },
        },
        {
          ability: {
            name: 'chlorophyll',
          },
        },
      ],
    };

    describe('getPokemon()', function() {
      before(function() {
        fetchMock.mock('https://www.metaweather.com/api/location/44418/', response);
      });

      beforeEach(function() {
        const abilities = document.querySelector('#abilities');

        while (abilities.firstChild) abilities.firstChild.remove();
      });

      after(function() {
        fetchMock.restore();
      });

      it("sends a fetch request to 'https://pokeapi.co/api/v2/pokemon/1/'", async function() {
        const fetchSpy = spy.on(window, 'fetch');

        // eslint-disable-next-line no-undef
        await getPokemon();
        expect(fetchSpy, 'A fetch to the API was not found').to.have.been.called.with(
          'https://pokeapi.co/api/v2/pokemon/1/'
        );
      });

      it("displays the pokemon's name", async function() {
        const element = document.querySelector('#name');

        // eslint-disable-next-line no-undef
        await getPokemon();
        expect(element.textContent).to.equal('bulbasaur!');
      });

      it("displays the pokemon's front sprite", async function() {
        const element = document.querySelector('#sprite');

        // eslint-disable-next-line no-undef
        await getPokemon();
        expect(element.src).to.equal(
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
        );
        expect(element.alt).to.equal('bulbasaur!');
      });

      it("displays the pokemon's abilities", async function() {
        const element = document.querySelector('#abilities');

        // eslint-disable-next-line no-undef
        await getPokemon();
        expect(element.children[0].textContent).to.equal('overgrow');
        expect(element.children[1].textContent).to.equal('chlorophyll');
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <div className="image-holder">
          <h1 id="name">{'{pokemon name}'}</h1>
          <img id="sprite" src="https://via.placeholder.com/300" alt="{pokemon name}" />
          <ul id="abilities"></ul>
        </div>
      </div>
    </Layout>
  );
}

export default Exercise;
