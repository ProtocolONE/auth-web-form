import Vue from 'vue'

import ru from '@/i18n/locales/ru'
import en from '@/i18n/locales/en'

import eventBus from '@/event-bus'

import { get } from 'lodash-es'

const LOCALES = { en, ru }
const EVENT_NAME = 'auth:change-locale'

let defaultLocale = 'en'
let currentLocale = defaultLocale

if (navigator && navigator.language) {
  currentLocale = navigator.language.slice(0, 2)
}

Vue.prototype.$authLocale = currentLocale
Vue.prototype.$authTrans = function (key) {
  let path = `${this.$authLocale}.${key}`
  return get(LOCALES, path, 'no-trans')
}

Vue.observable(Vue.prototype)

eventBus.$on(EVENT_NAME, locale => {
  Vue.prototype.$authLocale = locale
})

export const locale = currentLocale
export const locales = LOCALES
export const eventName = EVENT_NAME
