<template>
<header class="auth-header">
  <h1 class="base-title">
    <b>{{ title }}</b>
  </h1>
  <auth-lang-switcher/>
</header>
</template>

<script>
import AuthLangSwitcher from '@/components/AuthLangSwitcher'

export default {
  name: 'AuthHeader',

  inject: ['title'],

  components: {
    AuthLangSwitcher
  }
}
</script>

<style lang="stylus" scoped>
.auth-header
  display: flex
  align-items: center
  justify-content: space-between

  .auth-web-form--desktop &
    .base-title
      font-size: 12px
</style>
