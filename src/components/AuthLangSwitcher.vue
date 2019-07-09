<template>
<div class="switcher text-sm">
  <ul class="list">
    <li v-for="lang in $i18n.availableLocales" :key="lang" class="list__item">
      <base-button
          :to="{ name: $route.name, params: { locale: lang } }"
          :label="lang"
          :class="{ active: $i18n.locale === lang }"/>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'AuthLangSwitcher',

  watch: {
    '$route.params.locale': {
      immediate: true,
      handler (locale) {
        this.$i18n.locale = locale
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  display: flex
  align-items: center
  margin: 0
  padding: 0
  list-style-type: none

  &__item
    text-transform: uppercase

    &:not(:last-child)
      margin-right: 10px

    .active
      font-weight: 600
      text-decoration: underline
</style>
