import styled from 'styled-components';
import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

const StyledExercise = styled.div`
  .exercise {
    display: flex;
  }

  form {
    width: 45%;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    max-width: 500px;
  }

  input,
  textarea {
    margin-bottom: 1rem;
  }

  input[type='submit'] {
    width: 100px;
  }

  img {
    max-width: 250px;
  }

  #display-ingredients {
    white-space: pre-wrap;
  }
`;

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { describe, it, before } = window;

    describe('div#recipe', function() {
      let name, author, image, ingredients;

      before(function() {
        name = document.querySelector('#name').value;
        author = document.querySelector('#author').value;
        image = document.querySelector('#image').value;
        ingredients = document.querySelector('#ingredients').value;
      });

      it('should display the name in the h1#display-name', function() {
        const el = document.querySelector('#display-name');

        expect(el.textContent).to.equal(name);
      });

      it('should display the author in the h2#display-author', function() {
        const el = document.querySelector('#display-author');

        expect(el.textContent).to.equal(author);
      });

      it('should display the image in the img#display-image', function() {
        const el = document.querySelector('#display-image');

        expect(el.src).to.equal(image);

        expect(el.alt).to.equal(name);
      });

      it('should display the ingredients in the p#display-ingredients', function() {
        const el = document.querySelector('#display-ingredients');

        expect(el.textContent).to.equal(ingredients);
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <StyledExercise className="exercise">
        <form id="recipe-form">
          <input type="text" id="name" name="name" value="Country Bread" />
          <input type="text" id="author" name="author" value="Tartine Bakery" />
          <input
            type="text"
            id="image"
            name="image"
            value="https://tartinebakery.com/assets/tartine-share.jpg"
          />
          <textarea id="ingredients" name="ingredients" rows="4">
            FOR THE STARTER AND LEAVEN 1000 grams white-bread flour 1000 grams whole-wheat flour FOR
            THE BREAD 200 grams leaven 900 grams white-bread flour 100 grams whole-wheat flour, plus
            more for dusting 20 grams fine sea salt 100 grams rice flour
          </textarea>
          <input type="submit" />
        </form>

        <div id="recipe">
          <h1 id="display-name">{`{recipe name}`}</h1>
          <h2 id="display-author">{`{recipe author}`}</h2>
          <img id="display-image" src="https://via.placeholder.com/300" alt="{recipe name}" />
          <p id="display-ingredients">{`{recipe ingredients}`}</p>
        </div>
      </StyledExercise>
    </Layout>
  );
}

export default Exercise;
