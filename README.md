# gatsby-gitbook-starter

Starter template: https://github.com/hasura/gatsby-gitbook-starter

## Local Development

To run locally, run:

```
$ npm start
```

This will run two things:

- A build script to create the exercise files
- `gatsby develop` to run Gatsby in dev mode

You'll need a [Youtube API key](https://developers.google.com/youtube/v3/getting-started) in an environment variable to get the `<YoutubePlaylist>` component working:

```
GATSBY_YOUTUBE_API=your_key_here
```

## Deploying

This app is deployed via Netlify and integrated with Github, so any changes pushed up to the `main` branch on Github will be deployed on Netlify (the build takes a bit of time).

## Adding new pages

- Create a new `.mdx` file in the `content` directory
  - Update `config.js` to include any new parent pages in the `sidebar.forcedNav` section
  - If it's a sub-page, put it in a folder with the same name as the parent page
  - Sub-pages are ordered alphabetically
- Add a frontmatter section to your `mdx` file:

```
---
title: "Intro to Phase 3"
publish: true
---
```

- `title` will be used as the display title in the side navigation
- `publish` will determine if it's visible or not

Write the rest of the page using markdown syntax, or React components (you'll also need to export any new components you're using in the `./src/components/mdxComponents/index.js` file to use them in and `.mdx` file).

## Adding exercises

- Create a new `.mdx` file in the `content` directory
- Write out instructions in markdown
- Create a new exercise template in `/exercises/src/pages/` as a `.ejs` file, with some HTML and test code:

```html
<!-- /exercises/src/pages/01-dom-exercise.ejs -->
<div class="exercise">
  <p>Welcome to the sandbox!</p>
</div>

<script>
  describe('p', function () {
    it('should have the text "I updated it!"', function () {
      const p = document.querySelector("p")
      chai.expect(p.textContent).to.equal("I updated it!");
    });
  });
</script>
```

- The `.ejs` files will be compiled at build time to the `static` folder
- Use the `<Sandbox>` component, and link to the exercise html file:

```jsx
<Sandbox
  html="/01-dom-exercise.html"
  starterCode={`
const p = document.querySelector("p")
console.log(p)
  `}
>
```
