<template>
<header class="auth-header">
  <h1 class="base-title">{{ title }}</h1>
  <lang-switcher/>
  <base-button
      v-if="screen.resolution === 'mobile'"
      class="auth-header__close"
      href="#"
      @click.prevent="closeMobileView">
    <i class="auth-header__icon"></i>
  </base-button>
</header>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import LangSwitcher from '@/components/LangSwitcher'

export default {
  name: 'BaseHeader',

  inject: ['screen', 'closable', 'title'],

  components: {
    BaseButton,
    LangSwitcher
  },

  methods: {
    closeMobileView () {
      console.log('close mobile view!')
    }
  }
}
</script>

<style lang="stylus" scoped>
.auth-header
  display: flex
  align-items: center
  justify-content: space-between

  &__close
    margin-left: auto

  &__icon
    width: 16px
    height: 16px
    display: inline-block
    background: url(../icons/close.png) no-repeat center

  .auth-web-form--mobile &
    justify-content: normal

    .base-title
      margin-right: 10px
      font-size: 12px
      font-weight: 500
      color: $info
</style>
