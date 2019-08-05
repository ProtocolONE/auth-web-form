<template>
<header class="header">
  <h1 class="base-title header__title">{{ title }}</h1>
  <lang-switcher/>
</header>
</template>

<script>
import LangSwitcher from '@/components/LangSwitcher'
import { mapState } from 'vuex'

export default {
  name: 'AuthHeader',

  components: {
    LangSwitcher
  },

  computed: mapState(['title'])
}
</script>

<style lang="stylus" scoped>
.header
  display: flex
  align-items: center
  justify-content: space-between

  .auth--mobile &
    justify-content: normal

    &__title
      margin-right: 10px
      font-size: 12px
      font-weight: 500
      color: $info
</style>
