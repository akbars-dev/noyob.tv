// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@/assets/styles/main.scss"],
  app: {
    head: {
      script: [
        { src: 'https://telegram.org/js/telegram-web-app.js', defer: true }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.png" }
      ]
    }
  },
  experimental: {
    typedPages: false
  }  
});
