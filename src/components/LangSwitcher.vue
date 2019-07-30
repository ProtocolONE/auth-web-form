<template>
<div class="text-sm">
  <ul class="list">
    <li v-for="lang in locales" :key="lang" class="list__item">
      <ui-lang-button
          class="list__link"
          :class="{ _selected: $authLocale === lang }"
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
  name: 'LangSwitcher',

  inject: ['locales', 'changeLocale'],

  components: {
    UiLangButton
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

  &__link
    border: 0

    &._selected
      color: $info

      &::after
        background-color: $info

      &:hover
        cursor: default
</style>
