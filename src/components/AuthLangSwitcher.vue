<template>
<div class="text-sm">
  <ul class="list">
    <li v-for="lang in $i18n.availableLocales" :key="lang" class="list__item">
      <ui-lang-button
          :class="{ _selected: $i18n.locale === lang }"
          @click.native="changeLocale(lang)">
        {{ lang }}
      </ui-lang-button>
    </li>
  </ul>
</div>
</template>

<script>
import { UiLangButton } from '@protocol-one/ui-kit'

export default {
  name: 'AuthLangSwitcher',

  components: {
    UiLangButton
  },

  methods: {
    changeLocale (locale) {
      if (this.$i18n.locale === locale) return
      this.$i18n.locale = locale
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
</style>
