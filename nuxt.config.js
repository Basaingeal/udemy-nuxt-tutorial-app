// const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'WD Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My cool development blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#880000', height: '16px', duration: 5000 },
  loadingIndicator: {
    name: 'circle',
    color: '#800000'
  },

  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-blog-b8db6.firebaseio.com',
    credentials: false
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA1CztR2L0iGNYVgkFkwiFAu-ckkawfwqc',
            method: 'post',
            propertyName: 'idToken'
          },
          user: {
            url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyA1CztR2L0iGNYVgkFkwiFAu-ckkawfwqc',
            method: 'post',
            propertyName: undefined
          },
          logout: false
        }
      }
      // firebase: {
      //   _scheme: '~/services/firebase-auth.js',
      //   apiKey: 'AIzaSyA1CztR2L0iGNYVgkFkwiFAu-ckkawfwqc',
      //   projectId: 'nuxt-blog-b8db6'
      // }
    },
    redirect: {
      login: '/admin/auth'
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-b8db6.firebaseio.com',
    fbAPIKey: 'AIzaSyA1CztR2L0iGNYVgkFkwiFAu-ckkawfwqc'
  },

  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  router: {
    middleware: 'log'
  }
}
