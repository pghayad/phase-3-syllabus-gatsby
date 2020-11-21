import styled from 'styled-components';
import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

const StyledExercise = styled.div`
  .high {
    color: red;
  }
  .medium {
    color: orange;
  }
  .low {
    color: green;
  }
`;

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { beforeEach, describe, it } = window;

    describe('ul#todo-list', function() {
      const list = document.querySelector('#todo-list');

      const sort = document.querySelector('#sort');

      let changeEvent, inputEvent;

      beforeEach(function() {
        changeEvent = new Event('change', {
          bubbles: true,
          cancelable: true,
        });
        inputEvent = new Event('input', {
          bubbles: true,
          cancelable: true,
        });
      });

      it('should display in the correct order after selecting high to low sort order', function() {
        sort.value = 'high';
        sort.dispatchEvent(inputEvent);
        sort.dispatchEvent(changeEvent);
        expect(list.firstElementChild.textContent).to.equal('post memes on slack');
        expect(list.lastElementChild.textContent).to.equal('sleep');
      });

      it('should display in the correct order after selecting low to high sort order', function() {
        sort.value = 'low';
        sort.dispatchEvent(inputEvent);
        sort.dispatchEvent(changeEvent);
        expect(list.firstElementChild.textContent).to.equal('sleep');
        expect(list.lastElementChild.textContent).to.equal('post memes on slack');
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <StyledExercise className="exercise">
        <h2>Todo List</h2>
        <select id="sort">
          <option>Sort by...</option>
          <option value="low">Low to high</option>
          <option value="high">High to low</option>
        </select>

        <ul id="todo-list"></ul>
      </StyledExercise>
    </Layout>
  );
}

export default Exercise;
