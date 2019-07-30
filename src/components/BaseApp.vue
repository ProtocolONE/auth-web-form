<template>
<div
    id="auth-web-form"
    :class="[
      `auth--${$authLocale}`,
      `auth--${screenResolution}`]
    ">
  <slot/>
</div>
</template>

<script>
import { keys, pick } from 'lodash-es'
import { locale, locales, eventName } from '@/i18n'

import storage from '@/utils/storage'
import eventBus from '@/utils/event-bus'

function getScreenSize () {
  return pick(window.screen, ['width', 'height'])
}

const LOCALE_STORAGE_NAME = 'locale'
const LOCALES_LIST = keys(locales)

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
      closable: this.closable,
      title: this.title,
      locale: this.locale,
      locales: LOCALES_LIST,
      changeLocale: this.handleChangeLocale
    }
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
      loading: true,
      screen: getScreenSize()
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
    this.loading = false
  },

  destroyed () {
    window.removeEventListener('resize', this.checkScreenSize, false)
    window.removeEventListener('orientationchange', this.checkScreenSize, false)
  },

  methods: {
    checkScreenSize () {
      this.screen = getScreenSize()
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
