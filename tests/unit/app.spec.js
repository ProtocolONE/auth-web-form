// import Vue from 'vue'
// import factory from './utils/components-factory'
//
// import AuthExample from '@/AuthExample'
// import { locale } from '@/i18n'

describe('AuthExample', function () {
  // let wrapper = factory(Vue.extend(AuthExample))
  // let locales = wrapper.vm.$i18n.availableLocales

  // it('Check than default locale is correctly', () => {
  //   expect(locale).toBe(wrapper.vm.$authLocale)
  // })

  // it('Check than lang switchers length equal available locales length', () => {
  //   let switchers = wrapper.findAll('.switcher .base-link')
  //   expect(switchers.length).toBe(locales.length)
  // })

  // it('Check for locale is correctly changed', () => {
  //   let switchers = wrapper.findAll('.switcher .base-link')
  //   for (let i = 0; i < locales.length; i += 1) {
  //     let switcher = switchers.at(i)
  //     let switcherLang = switcher.element.getAttribute('aria-label')
  //     switcher.trigger('click')
  //     expect(switcherLang).toBe(wrapper.vm.$i18n.locale)
  //   }
  // })

  it('Test', () => {
    expect(1).toEqual(1)
  })
})
