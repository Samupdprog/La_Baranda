
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],

  server: {
    port: 80,
    host: '0.0.0.0',
  },

  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      stripePublishableKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    },
  },

  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/stripe.client.ts',
    '~/plugins/i18n', 
  ],

  css: [
    '~/assets/css/main.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' } // o .png si usas png
      ]
    }
  }


}) 