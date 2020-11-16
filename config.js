const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://flatiron-phase-3.netlify.app',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo:
      'https://instructure-uploads.s3.amazonaws.com/account_158020000000000001/attachments/43742/logo-primary.svg',
    logoLink: 'https://flatiron-phase-3.netlify.app',
    title: 'Phase 3 Javascript Resources',
    githubUrl: '',
    helpUrl: '',
    tweetText: '',
    links: [{ text: '', link: '' }],
    search: {
      enabled: false,
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      '/00-intro', // add trailing slash if enabled above
      '/01-js-fundamentals',
      '/02-dom-manipulation',
      '/03-dom-exercises',
      '/04-event-handling',
      '/05-event-exercises',
      '/06-fetch-basics',
      '/07-fetch-crud',
      '/08-fetch-exercises',
      '/09-rails-as-an-api',
      '/10-modern-javascript',
      '/11-oojs',
    ],
    openNav: [
      '/00-intro', // add trailing slash if enabled above
    ],
    links: [{ text: 'Flatiron Canvas', link: 'https://learning.flatironschool.com/' }],
    frontline: false,
    ignoreIndex: true,
    title: 'Phase 3 Syllabus',
  },
  siteMetadata: {
    title: 'Phase 3 Syllabus | Flatiron',
    description:
      'Documentation built with mdx. Built from https://github.com/hasura/gatsby-gitbook-boilerplate',
    ogImage: null,
    docsLocation: 'https://github.com/ihollander/phase-3-syllabus-gatsby/tree/master/content',
    favicon:
      'https://instructure-uploads.s3.amazonaws.com/account_158020000000000001/attachments/43718/flatiron-favicon.ico',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Gatsby Gitbook Starter',
      short_name: 'GitbookStarter',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
