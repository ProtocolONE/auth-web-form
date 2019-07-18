import { mount, createLocalVue } from '@vue/test-utils'

import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'

import initIi18n from '@/i18n'
import BaseButton from '@/components/BaseButton'

const localVue = createLocalVue()

localVue.use(VueRouter)
localVue.use(VueI18n)
localVue.component('base-button', BaseButton)

export default function (Component, data = {}, propsData = {}) {
  return mount(Component, {
    localVue,
    i18n: initIi18n(),
    propsData,
    data () {
      return {
        ...data
      }
    }
  })
}