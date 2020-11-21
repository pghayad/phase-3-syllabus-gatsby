import styled from 'styled-components';
import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

const StyledExercise = styled.div`
  textarea {
    display: block;
  }
`;

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { beforeEach, describe, it } = window;

    describe('form#todo-form', function() {
      const form = document.querySelector('#todo-form');

      const textarea = form.querySelector('textarea');

      const list = document.querySelector('#todo-list');

      beforeEach(function() {
        while (list.firstChild) list.firstChild.remove();
      });

      it('should prevent the default behavior of form submitting', function() {
        let defaultPrevented;

        function submitHandler(event) {
          defaultPrevented = event.defaultPrevented;
          event.preventDefault();
        }

        form.addEventListener('submit', submitHandler);
        form.querySelector("input[type='submit']").click();
        form.removeEventListener('submit', submitHandler);

        expect(defaultPrevented).to.equal(true);
      });

      it('should add a new todo to the list when submitted', function() {
        function submitHandler(event) {
          event.preventDefault();
        }

        textarea.value = 'Task 1';
        form.addEventListener('submit', submitHandler);
        form.querySelector("input[type='submit']").click();
        form.removeEventListener('submit', submitHandler);

        expect(list.children.length).to.equal(1);
        expect(list.firstElementChild.textContent).to.equal('Task 1');
      });

      it('should add two new todos to the list when submitted twice', function() {
        function submitHandler(event) {
          event.preventDefault();
        }

        form.addEventListener('submit', submitHandler);

        textarea.value = 'Task 1';
        form.querySelector("input[type='submit']").click();
        textarea.value = 'Task 2';
        form.querySelector("input[type='submit']").click();

        form.removeEventListener('submit', submitHandler);

        expect(list.children.length).to.equal(2);
        expect(list.firstElementChild.textContent).to.equal('Task 1');
        expect(list.lastElementChild.textContent).to.equal('Task 2');
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <StyledExercise className="exercise">
        <form id="todo-form">
          <textarea></textarea>
          <input type="submit" value="Add Task" />
        </form>
        <h4>Todos</h4>
        <ol id="todo-list"></ol>
      </StyledExercise>
    </Layout>
  );
}

export default Exercise;
