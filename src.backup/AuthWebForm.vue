<template>
<auth-layout
    id="auth-web-form"
    :class="[
      'auth-web-form',
      `auth-web-form--${$authLocale}`,
      `auth-web-form--${screenResolution}`
    ]">
  <component
      :id="step"
      :is="step"
      :key="step"/>
</auth-layout>
</template>

<script>
import AuthLayout from '@/layouts/Auth'
import Login from '@/views/Login'
import Registration from '@/views/Registration'

import Auth from '@/auth'

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
    let screen = {}

    Object.defineProperties(screen, {
      resolution: {
        enumerable: true,
        get: () => this.screenResolution
      },
      width: {
        enumerable: true,
        get: () => this.screen.width
      },
      height: {
        enumerable: true,
        get: () => this.screen.height
      }
    })

    return {
      screen,
      auth: null,
      closable: this.closable,
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
    },
    closable: {
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
      else if (this.screen.width <= 1024) {
        return 'tablet'
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
    window.addEventListener('orientationchange', this.checkScreenSize, false)

    this.auth = new Auth({
      clientID: '5d3a26b697b0b2007a11df76',
      scope: 'openid,offline',
      urls: {
        redirect: 'http://localhost:3000/callback'
      }
    })
  },

  destroyed () {
    window.removeEventListener('resize', this.checkScreenSize, false)
    window.removeEventListener('orientationchange', this.checkScreenSize, false)
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

<style lang="stylus" src="@/styl/index.styl"></style>

<style lang="stylus" scoped>
.auth-web-form
  max-height: 100vh
  background-color: $white
  font-family: 'Quicksand', sans-serif
  font-weight: 500

  &--mobile
    border_radius(12px)

  ::-webkit-scrollbar
    width: 0.45em

  ::-webkit-scrollbar-thumb
    background-color: $secondary
    outline: 1px solid $accent

  ::-webkit-scrollbar-track
    -webkit-box-shadow: inset 0 0 6px rgba($secondary, 0.6)
</style>
