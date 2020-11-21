import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { describe, it } = window;

    describe('form#login-form', function() {
      const pTag = document.querySelector('p#show-password');

      const pwInput = document.querySelector('#password');

      const form = document.querySelector('#login-form');

      it('should display the current password when the form is submitted', function() {
        function submitHandler(event) {
          event.preventDefault();
        }
        form.addEventListener('submit', submitHandler);
        form.querySelector("input[type='submit']").click();
        form.removeEventListener('submit', submitHandler);

        expect(pTag.textContent).to.equal(pwInput.value);
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
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <form id="login-form">
          <input type="text" id="name" name="name" />
          <input type="password" id="password" name="password" />
          <input type="submit" value="Login" />
        </form>
        <p>Your secret password: </p>
        <p id="show-password">{'{show password here}'}</p>
      </div>
    </Layout>
  );
}

export default Exercise;
