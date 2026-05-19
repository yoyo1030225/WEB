// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // nuxt.config.ts
  runtimeConfig: {
    public: {
      firebaseApiKey: 'AIzaSyCCIzuceD-N4ylUOHP8G_A0YUowEtBxhPA',
      firebaseAuthDomain: 'nuxt-todo-app-c43b0.firebaseapp.com',
      firebaseProjectId: 'nuxt-todo-app-c43b0',
      firebaseStorageBucket: 'nuxt-todo-app-c43b0.firebasestorage.app',
      firebaseMessagingSenderId: '834655758655',
      firebaseAppId: '1:834655758655:web:867e3e9c03763af5e7cb8a'
    }
  }
})
