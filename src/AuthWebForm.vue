<template>
<auth-layout
    id="auth-web-form"
    :class="[
      'auth-web-form',
      `auth-web-form--${$authLocale}`,
      `auth-web-form--${screenResolution}`
    ]">
  <component :id="step" :is="step" :key="step"/>
</auth-layout>
</template>

<script>
import AuthLayout from '@/layouts/Auth'
import Login from '@/views/Login'
import Registration from '@/views/Registration'

import storage from '@/storage'
import eventBus from '@/event-bus'
import { locale, locales, eventName } from '@/i18n'

import { keys, pick } from 'lodash-es'

const STEP_STORAGE_NAME = 'step'
const STEPS = ['login', 'registration', 'successful', 'loading']

const LOCALE_STORAGE_NAME = 'locale'
const LOCALES_LIST = keys(locales)

function getScreenSize () {
  return pick(window.screen, ['width', 'height'])
}

export default {
  name: 'AuthWebForm',

  provide () {
    return {
      screen: this.screen,
      title: this.title,
      locale: this.locale,
      locales: LOCALES_LIST,
      updateStep: this.updateStep,
      changeLocale: this.handleChangeLocale
    }
  },

  components: {
    AuthLayout,
    Login,
    Registration
  },

  props: {
    title: {
      type: String,
      default: 'Protocol One'
    },
    locale: {
      type: String,
      default: storage.get(LOCALE_STORAGE_NAME) || locale
    },
    mobile: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      screen: getScreenSize(),
      step: storage.get(STEP_STORAGE_NAME) || STEPS[0]
    }
  },

  computed: {
    screenResolution () {
      if (this.mobile || this.screen.width <= 600) {
        return 'mobile'
      }
      return 'desktop'
    }
  },

  watch: {
    locale: {
      immediate: true,
      handler: 'handleChangeLocale'
    }
  },

  created () {
    window.addEventListener('resize', this.checkScreenSize, false)
  },

  destroyed () {
    window.removeEventListener('resize', this.checkScreenSize, false)
  },

  methods: {
    checkScreenSize () {
      this.screen = getScreenSize()
    },

    updateStep (step) {
      this.step = step
      storage.set(STEP_STORAGE_NAME, step)
    },

    handleChangeLocale (locale) {
      if (!LOCALES_LIST.includes(locale)) return
      if (this.$authLocale === locale) return
      storage.set(LOCALE_STORAGE_NAME, locale)
      eventBus.$emit(eventName, locale)
    }
  }
}
</script>
../
<style lang="stylus" src="@/styl/index.styl"></style>

<style lang="stylus" scoped>
.auth-web-form
  max-height: 100vh
  padding: 0 15px
  background-color: $white
  font-family: 'Quicksand', sans-serif
  font-weight: 500

  &--mobile
    border_radius(12px)
</style>
