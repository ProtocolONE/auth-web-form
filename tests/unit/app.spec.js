import Vue from 'vue'

import factory from './utils/components-factory'
import App from '@/App'
import { locale } from '@/i18n'

// --- TODO: убрать коммент при пуше
// if (navigator && navigator.language) {
//   currentLocale = navigator.language.slice(0, 2)
// }

describe('App', function () {
  let wrapper = factory(Vue.extend(App))
  let locales = wrapper.vm.$i18n.availableLocales

  it('Check than default locale is correctly', () => {
    expect(locale).toBe(wrapper.vm.$i18n.locale)
  })

  it('Check than lang switchers length equal available locales length', () => {
    let switchers = wrapper.findAll('.switcher .base-link')
    expect(switchers.length).toBe(locales.length)
  })

  it('Check for locale is correctly changed', () => {
    let switchers = wrapper.findAll('.switcher .base-link')
    for (let i = 0; i < locales.length; i += 1) {
      let switcher = switchers.at(i)
      let switcherLang = switcher.element.getAttribute('aria-label')
      switcher.trigger('click')
      expect(switcherLang).toBe(wrapper.vm.$i18n.locale)
    }
  })
})
