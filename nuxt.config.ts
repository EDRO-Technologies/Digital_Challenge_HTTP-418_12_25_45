import Aura from "@primevue/themes/aura";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3000,
    host: '127.0.0.1'
  },
  modules: [
    "@primevue/nuxt-module",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-mapbox",
  ],
  mapbox: {
    accessToken: 'pk.eyJ1Ijoic3ZjLW9rdGEtbWFwYm94LXN0YWZmLWFjY2VzcyIsImEiOiJjbG5sMnExa3kxNTJtMmtsODJld24yNGJlIn0.RQ4CHchAYPJQZSiUJ0O3VQ'

  },

  primevue: {
    options: {
      theme: {
        preset: Aura,
        darkModeSelector: true,
      },
    },
  },
  devtools: { enabled: true },
  srcDir: "src/",
  routeRules: {
    "/api/**": {
      proxy:
        process.env.NODE_ENV === "development"
          ? "http://127.0.0.1:8000/api/**"
          : "/api/**",
    },
    "/docs": {
      proxy: "http://127.0.0.1:8000/docs",
    },
    "/openapi.json": {
      proxy: "http://127.0.0.1:8000/openapi.json",
    },
  },
  nitro: {
    vercel: {
      config: {
        routes: [
          {
            src: "/api/(.*)",
            dest: "api/index.py",
          },
        ],
      },
    },
  },
});