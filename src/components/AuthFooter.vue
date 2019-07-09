<template>
<footer class="auth-footer text-sm">
  <base-button class="auth-footer__btn" href="#terms" :label="$t('terms_of_use')"/>
  <base-button class="auth-footer__btn" href="#policy" :label="$t('privacy_policy')"/>
</footer>
</template>

<script>
export default {
  name: 'AuthFooter'
}
</script>

<style lang="stylus" scoped>
.auth-footer
  &__btn:not(:last-child)
    margin-right: 50px
</style>
