import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { before, describe, it } = window;

    const container = document.querySelector('div.player-container');

    describe('div.player-container', function() {
      it('should have four children', function() {
        expect(container.children.length).to.equal(4);
      });
    });

    describe('first div.player', function() {
      let player;

      before(function() {
        player = container.firstElementChild;
      });

      it('should have a class of .player', function() {
        expect(player.className).to.equal('player');
      });

      it("should have a data-number of the player's number", function() {
        expect(player.dataset.number).to.equal('11');
      });

      it('should show the player name in a <h2>', function() {
        const element = player.querySelector('h2');

        expect(element).to.not.equal(null);
        expect(element.textContent).to.equal('Mo Salah');
      });

      it('should show the player nickname in a <h4>', function() {
        const element = player.querySelector('h4');

        expect(element).to.not.equal(null);
        expect(element.textContent).to.equal('The Egyptian King');
      });

      it('should show the player photo in a <img>', function() {
        const element = player.querySelector('img');

        expect(element).to.not.equal(null);
        expect(element.src).to.equal(
          'https://cdn.cnn.com/cnnnext/dam/assets/190501145802-mo-salah-exlarge-169.jpg'
        );
        expect(element.alt).to.equal('Mo Salah');
      });
    });

    describe('last div.player', function() {
      let player;

      before(function() {
        player = container.lastElementChild;
      });

      it('should have a class of .player', function() {
        expect(player.className).to.equal('player');
      });

      it("should have a data-number of the player's number", function() {
        expect(player.dataset.number).to.equal('14');
      });

      it('should show the player name in a <h2>', function() {
        const element = player.querySelector('h2');

        expect(element).to.not.equal(null);
        expect(element.textContent).to.equal('Jordan Henderson');
      });

      it('should show the player nickname in a <h4>', function() {
        const element = player.querySelector('h4');

        expect(element).to.not.equal(null);
        expect(element.textContent).to.equal('Hendo');
      });

      it('should show the player photo in a <img>', function() {
        const element = player.querySelector('img');

        expect(element).to.not.equal(null);
        expect(element.src).to.equal(
          'https://icdn.empireofthekop.com/wp-content/uploads/2020/03/Jordan-Henderson-640x426.jpg'
        );
        expect(element.alt).to.equal('Jordan Henderson');
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <h3>Players</h3>
        <div className="player-container"></div>
      </div>
    </Layout>
  );
}

export default Exercise;
