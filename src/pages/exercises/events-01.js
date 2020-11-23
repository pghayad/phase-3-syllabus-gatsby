import React from 'react';
import styled from 'styled-components';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

const StyledExercise = styled.div`
  &.dark-mode {
    color: #f1f1f1;
    background-color: #333;
  }
`;

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { before, beforeEach, describe, it } = window;

    describe('button', function() {
      const exercise = document.querySelector('.exercise');

      let button;

      before(function() {
        button = document.querySelector('.exercise button');
      });

      beforeEach(function() {
        exercise.className = 'exercise';
      });

      it('should toggle the dark-mode class on when clicked', function() {
        button.click();

        expect(exercise.matches('.dark-mode')).to.equal(true);
      });

      it('should toggle the dark-mode class off when clicked twice', function() {
        button.click();
        button.click();

        expect(exercise.matches('.dark-mode')).to.equal(false);
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <StyledExercise className="exercise">
        <h1>Hello!</h1>
        <p>Here&apos;s some text</p>
        <button>Toggle Dark Mode</button>
      </StyledExercise>
    </Layout>
  );
}

export default Exercise;
