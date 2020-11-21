import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { describe, it } = window;

    describe('p#show-password', function() {
      const pTag = document.querySelector('p#show-password');

      const pwInput = document.querySelector('#password');

      it('should have the current password', function() {
        expect(pTag.textContent).to.equal(pwInput.value);
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <form id="login-form">
          <input type="text" id="name" name="name" value="ian" />
          <input type="password" id="password" name="password" value="123" />
        </form>
        <p>Your secret password: </p>
        <p id="show-password">{`{show password here}`}</p>
      </div>
    </Layout>
  );
}

export default Exercise;
