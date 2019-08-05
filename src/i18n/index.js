import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ru from '@/i18n/locales/ru'
import en from '@/i18n/locales/en'

const LOCALES = { en, ru }
const DEFAULT_LOCALE = 'en'

let currentLocale = DEFAULT_LOCALE
if (navigator && navigator.language) {
  currentLocale = navigator.language.slice(0, 2)
}

Vue.use(VueI18n)

export const locale = currentLocale
export const locales = LOCALES

export default new VueI18n({
  fallbackLocale: DEFAULT_LOCALE,
  locale: currentLocale,
  messages: LOCALES
})
