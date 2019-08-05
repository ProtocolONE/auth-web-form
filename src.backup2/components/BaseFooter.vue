<template>
<footer class="auth-footer text-sm">
  <base-button class="auth-footer__btn" href="#terms" :label="$authTrans('terms_of_use')"/>
  <base-button class="auth-footer__btn" href="#policy" :label="$authTrans('privacy_policy')"/>
</footer>
</template>

<script>
import BaseButton from '@/components/BaseButton'

export default {
  name: 'BaseFooter',

  components: {
    BaseButton
  }
}
</script>

<style lang="stylus" scoped>
.auth-footer
  &__btn:not(:last-child)
    margin-right: 50px
</style>
