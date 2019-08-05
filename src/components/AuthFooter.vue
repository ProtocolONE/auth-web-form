<template>
<footer class="footer text-sm">
  <base-button class="footer__btn" href="#terms" :label="$t('terms_of_use')"/>
  <base-button class="footer__btn" href="#policy" :label="$t('privacy_policy')"/>
</footer>
</template>

<script>
import BaseButton from '@/components/BaseButton'

export default {
  name: 'AuthFooter',

  components: {
    BaseButton
  }
}
</script>

<style lang="stylus" scoped>
.footer__btn:not(:last-child)
  margin-right: 50px
</style>
