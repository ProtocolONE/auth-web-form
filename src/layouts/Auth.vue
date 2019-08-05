<template>
<div :class="['auth', `auth--${$i18n.locale}`, `auth--${screenResolution}`]">
  <auth-header class="auth__header"/>
  <main class="auth__content">
    <base-error v-if="serverErrors.common" class="view view--error" :label="serverErrors.common"/>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <slot/>
      </keep-alive>
    </transition>
  </main>
  <auth-footer class="auth__footer"/>
</div>
</template>

<script>
import BaseError from '@/components/BaseError'

import AuthHeader from '@/components/AuthHeader'
import AuthFooter from '@/components/AuthFooter'

import { mapState } from 'vuex'

export default {
  name: 'AuthLayout',

  props: {
    screenResolution: String
  },

  components: {
    BaseError,
    AuthHeader,
    AuthFooter
  },

  computed: mapState(['serverErrors'])
}
</script>

<style lang="stylus" scoped>
.auth
  display: grid
  grid-template-columns: 1fr
  grid-template-rows: 150px 1fr 130px
  grid-template-areas: 'header' 'content' 'footer'
  height: 100%
  max-height: 100vh
  overflow: hidden
  background-color: $white
  font-family: 'Quicksand', sans-serif
  font-weight: 500

  &__header,
  &__footer
    display: flex
    align-items: center
    padding: 0 40px

  &__header
    grid-area: header
    border_solid(3px, 'bottom')

  &__footer
    grid-area: footer
    border_solid(3px, 'top')

  &__content
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    grid-area: content
    padding: 55px 40px
    overflow: auto

  &.auth--mobile
    display: flex
    flex-direction: column
    min-height: 60vh
    max-height: 100%
    border_radius(12px)

  .auth--mobile &
    &__header,
    &__footer
      height: 60px
      border: none

    &__footer
      justify-content: space-between
      margin-top: auto
      background-color: rgba($black, 0.08)

    &__content
      padding-top: 0
      padding-bottom: 0

  ::-webkit-scrollbar
    width: 0.45em

  ::-webkit-scrollbar-thumb
    background-color: $secondary
    outline: 1px solid $accent

  ::-webkit-scrollbar-track
    -webkit-box-shadow: inset 0 0 6px rgba($secondary, 0.6)
</style>
