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

  components: {
    AuthLangSwitcher
  },

  props: {
    title: String
  }
}
</script>

<style lang="stylus" scoped>
.auth-header
  display: flex
  align-items: center
  justify-content: space-between
</style>
