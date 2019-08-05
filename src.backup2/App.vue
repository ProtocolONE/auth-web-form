<template>
<auth
  id="auth-web-form"
  :class="[
    `auth--${$authLocale}`,
    `auth--${screenResolution}`]
  ">
  <component
      :id="step"
      :is="step"
      :key="step"
      @step="updateStep"
      @auth="handleAuth"/>
</auth>
</template>

<script>
import Auth from '@/layouts/Auth'

import Loading from '@/views/Loading'
import Login from '@/views/Login'
import Registration from '@/views/Registration'

import axios from 'axios'
import { keys, pick, merge } from 'lodash-es'
import { locale, locales, eventName } from '@/i18n'

import auth from '@/utils/auth'
import storage from '@/utils/storage'
import eventBus from '@/utils/event-bus'

function getScreenSize () {
  return pick(window.screen, ['width', 'height'])
}

const STEP_STORAGE_NAME = 'step'
const STEPS = ['loading', 'login', 'registration', 'successful']

const LOCALE_STORAGE_NAME = 'locale'
const LOCALES_LIST = keys(locales)

const URLS = {
  login: `${window.AUTH_API_URL}/oauth2/login`
}

export default {
  name: 'BaseApp',

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
      title: this.title,
      locale: this.locale,
      locales: LOCALES_LIST,
      changeLocale: this.handleChangeLocale
    }
  },

  components: {
    Auth,
    Loading,
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
      if (this.screen.width <= 600) {
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
  },

  mounted () {
    if (this.step === STEPS[0]) {
      setTimeout(() => this.updateStep(STEPS[1]), 500)
    }
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
    },

    handleAuth ({ type, data }) {
      this.updateStep(STEPS[0])
      this[type](URLS[type], data)
    },

    login (url, data) {
      data = merge(data, {
        connection: 'password',
        challenge: window.AUTH_FORM_DATA.challenge
      })
      axios.post(url, data).then(({ data }) => {
        window.location.href = data.url
      })
    },

    async authoriseWithLogin ({ commit, rootState, rootGetters }, { username, password, remember }) {
      try {
        const { data } = await axios.post(rootGetters.urls.apiLoginUrl, {
          challenge: rootState.challenge,
          connection: 'password',
          email: username,
          password,
          remember: (remember === '1')
        })
        commit('authError', '')
        window.location.href = data.url
      }
      catch (error) {
        if (error.response) {
          commit('authError', error.response.data.error_message)
        }
      }
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
