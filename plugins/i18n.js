import { defineNuxtPlugin } from '#app'
import { createI18n } from 'vue-i18n'

// Importa tus archivos de traducción (si todavía los mantienes)
// Más adelante podrás copiar todo este contenido aquí y eliminar /locales.
import es from '~/locales/es.json'
import en from '~/locales/en.json'
import fr from '~/locales/fr.json'
import de from '~/locales/de.json'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,             // usa Composition API en lugar de la API legacy
    globalInjection: true,     // permite usar $t en templates y t() en setup
    locale: 'es',              // locale por defecto
    fallbackLocale: 'en',      // idioma de reserva
    messages: {
      es,
      en,
      fr,
      de
    }
  })

  // Instala vue-i18n en la app de Vue
  nuxtApp.vueApp.use(i18n)
})
