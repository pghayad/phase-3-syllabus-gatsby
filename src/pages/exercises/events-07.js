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

    function getFirstVisibleElement(elements) {
      let found = null;

      let i = 0;

      while (i < elements.length && found === null) {
        if (elements[i].offsetWidth > 0 && elements[i].offsetHeight > 0) {
          found = elements[i];
        }
        i++;
      }
      return found;
    }

    describe('ul#todo-list', function() {
      const list = document.querySelector('#todo-list');

      const filter = document.querySelector('#filter');

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

      it('should filter the list of inputs to match based on description', function() {
        filter.value = 'sleep';
        filter.dispatchEvent(inputEvent);
        filter.dispatchEvent(changeEvent);

        const firstVisibleElement = getFirstVisibleElement(list.children);

        expect(firstVisibleElement).to.not.equal(null);
        expect(firstVisibleElement.textContent).to.equal('sleep');
      });

      it('should filter the list of inputs to match based on description with partial matches', function() {
        filter.value = 'p';
        filter.dispatchEvent(inputEvent);
        filter.dispatchEvent(changeEvent);

        const firstVisibleElement = getFirstVisibleElement(list.children);

        expect(firstVisibleElement).to.not.equal(null);
        expect(firstVisibleElement.textContent).to.equal('sleep');
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <StyledExercise className="exercise">
        <h2>Todo List</h2>
        <input type="text" id="filter" placeholder="Type to filter" />
        <ul id="todo-list"></ul>
      </StyledExercise>
    </Layout>
  );
}

export default Exercise;
