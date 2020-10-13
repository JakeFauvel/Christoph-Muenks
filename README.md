# Christoph Muenks Portfolio
####Portfolio for Christoph Münks

Gridsome and Vue.js build small portfolio site. Single page site built with a default layout and slot for the content to dynamically load.

## Running Locally
Run an `npm install` and `gridsome develop` from inside the portfolio directory.

## Languages
Languages are configured in individual JSON files, currently disabled, however, this can be renabled by uncommenting the relevant functions in the different pages. Each page listens for the 'langChanged' event. It then reads the language from the application storage and points to the relevant text in each JSON file.


## Projects
Projects and products are configured in their respective JSON file, they are then dynamically loaded in a v-for loop to display each of the products. This does mean each project/product needs to be duplicated for in order to have translations for both languages. Hosted image paths are also configured here meaning all images need to be hosted prior to configuring the projects.

## Google Analytics

Configured in gridsome.config.js - needs the unique ID.

```plugins: [
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-180333506-1'
      }
    }
  ]
```

## Github Pages
Configured in gridsome.config.js - change to your own github.io page if it will not allow you to push to the current. Run `npm run deploy` to push your local version to Github pages for testing prior to pushing to the live site.

``` 
    siteUrl: 'https://jakefauvel.github.io',
    pathPrefix: '/Christoph-Muenks',
```

## Contact Form

The form is using FormSpree, simply create your form and place the form URL in Contact.vue. This will post diretly to your form. Another service could be used and if paid for we could adda custom success message/page.

```                <form class="contactForm" autocomplete="off" action="https://formspree.io/xoqpqogy" method="POST">```