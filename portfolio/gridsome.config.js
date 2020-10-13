// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Christoph Münks - Blacksmith',
  siteUrl: 'https://jakefauvel.github.io',
  pathPrefix: '/Christoph-Muenks',
  plugins: [
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-180333506-1'
      }
    }
  ]
};
