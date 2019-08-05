<template>
<auth id="auth-web-form" :screen-resolution="screenResolution">
  <component :is="view" :key="view" @view="updateView"/>
</auth>
</template>

<script>
import Auth from '@/layouts/Auth'

import Login from '@/views/Login'
import Registration from '@/views/Registration'
import Consent from '@/views/Consent'

import postMessage from '@/utils/post-message'

import { mapState, mapMutations } from 'vuex'

// TODO: remove qs
import { stringify } from 'qs'

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

    return { screen }
  },

  components: {
    Auth,
    Login,
    Registration,
    Consent
  },

  data () {
    return {
      screen: {}
    }
  },

  computed: {
    ...mapState(['view']),

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

  created () {
    postMessage('created')
    window.addEventListener('resize', this.checkScreenSize, false)
    window.addEventListener('orientationchange', this.checkScreenSize, false)
  },

  mounted () {
    postMessage('mounted')
    this.checkScreenSize()
    let data = {
      client_id: '5d3a26b697b0b2007a11df76',
      state: window.btoa('5d3a26b697b0b2007a11df76'),
      redirect_uri: 'http://localhost:3000/callback',
      scope: 'openid,offline'
    }
    console.log(`http://localhost/login/form?${stringify(data)}`)
  },

  destroyed () {
    postMessage('destroyed')
    window.removeEventListener('resize', this.checkScreenSize, false)
    window.removeEventListener('orientationchange', this.checkScreenSize, false)
  },

  methods: {
    ...mapMutations(['updateView']),

    checkScreenSize () {
      let { width, height } = window.getComputedStyle(this.$el)
      this.screen = { width: parseInt(width), height: parseInt(height) }
      postMessage('resize', { ...this.screen, screenResolution: this.screenResolution })
    }
  }
}
</script>

<style lang="stylus" src="@/styl/index.styl"></style>
