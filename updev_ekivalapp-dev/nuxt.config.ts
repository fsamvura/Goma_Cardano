import wasm from "vite-plugin-wasm";
import { defineNuxtConfig } from 'nuxt'
import IconsResolver from 'unplugin-icons/resolver'
import { IntlifyModuleOptions } from '@intlify/nuxt3'
import topLevelAwait from "vite-plugin-top-level-await";
import UnpluginComponentsVite from 'unplugin-vue-components/vite'

// import '@nuxt3/apollo-module'
declare module '@nuxt/schema' {
  interface NuxtConfig {
    intlify?: IntlifyModuleOptions
  }
}

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // ssr: false,
  // meta
  meta: {
    title: 'ekivalapp',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'ekivalapp',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/assets/libs/tiny-slider/tiny-slider.css' },
      { rel: 'stylesheet', href: '/assets/libs/iconscout/unicons/css/line.css' },
      { rel: 'stylesheet', href: '/assets/css/icons.min.css' },
      { rel: 'stylesheet', href: '/assets/css/tailwind.min.css' },
    ],
    script: [
      { src: '/assets/js/app.js', defer: true },
    ],
  },

  // css
  css: ['~/assets/sass/vendor.scss', '~/assets/sass/app.scss',  '~/assets/css/template.css'],

  // plugins
  // plugins: ['~/plugins/navbar.ts'],

  // build
  build: {
    transpile: ['@headlessui/vue', 'graphql', '@apollo/client'],
  },
  // alias: {
  //   '@apollo/client/core': '@apollo/client/core/core.cjs'
  // },
  // build modules
  buildModules: [
    'nuxt-windicss',
    '@nuxtjs/eslint-module',
    'unplugin-icons/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/svg',
    '@intlify/nuxt3',
    // './modules/apollo/apollo-module.ts',
    // '@nuxt3/apollo-module'
    // '@vueuse/nuxt',
  ],
  // typescript: {
  //   strict: true
  // },
  // auto import components
  components: true,

  // vite plugins
  vite: {
    build: {
      target: 'esnext'
    },
    plugins: [
      wasm({
        // By default ALL `.wasm` imports will be transformed to WebAssembly ES module.
        // You can also set a filter (function or regex) to match files you want to transform.
        // Other files will fallback to Vite's default WASM loader (i.e. You need to call `initWasm()` for them).
        // filter: /cardano_serialization_lib_bg.wasm$/
      }),
      // topLevelAwait(),
      UnpluginComponentsVite({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
    ],
  },

  // localization - i18n config
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'fr',
      fallbackLocale: 'fr',
      availableLocales: ['en', 'fr'],
    },
  },

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  // windicss
  windicss: {
    analyze: {
      analysis: {
        interpretUtilities: false,
      },
      server: {
        port: 4000,
        open: false,
      },
    },
    scan: true,
  },
  apollo: {
    clientConfigs: {
      default: {
        // local graphql server, set URL env when build if using serverless or deploying on unknown port
        uri: process.env.NUXT_PUBLIC_GRAPHQL_BASE_URL ? process.env.NUXT_PUBLIC_GRAPHQL_BASE_URL : 'https://d.graphql-api.testnet.dandelion.link',
        // authenticationType: 'Bearer', // default 'Bearer'
      },
    },
    cookieAttributes: {
      expires: 14,
    },
  },
  runtimeConfig: {
    public: {
      graphqlBaseUrl: 'https://d.graphql-api.testnet.dandelion.link',
    }
  },
})
