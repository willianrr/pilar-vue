export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      API_KEY: process.env.API_KEY,
      IMAGE_URL: process.env.IMAGE_URL,
      SECRET: process.env.SECRET,
    },
  },
  ssr: true,
});
