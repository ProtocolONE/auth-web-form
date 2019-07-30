<template>
<base-app class="auth">
  <base-header class="auth__header"/>
  <main class="auth__content">
    <slot/>
  </main>
  <base-footer class="auth__footer"/>
</base-app>
</template>

<script>
import BaseApp from '@/components/BaseApp'
import BaseHeader from '@/components/BaseHeader'
import BaseFooter from '@/components/BaseFooter'

export default {
  name: 'Layout',

  components: {
    BaseApp,
    BaseHeader,
    BaseFooter
  }
}
</script>

<style lang="stylus" src="@/styl/index.styl"></style>

<style lang="stylus" scoped>
.auth
  display: grid
  height: 100%
  max-height: 100vh
  grid-template-columns: 1fr
  grid-template-rows: 150px 1fr 130px
  grid-template-areas: 'header' 'content' 'footer'
  background-color: $white
  overflow: hidden
  font-family: 'Quicksand', sans-serif
  font-weight: 500

  &__header,
  &__footer
    display: flex
    align-items: center
    padding: 0 20px

  &__header
    grid-area: header
    border_solid(3px, 'bottom')

  &__footer
    grid-area: footer
    border_solid(3px, 'top')

  &__content
    display: flex
    justify-content: center
    grid-area: content
    padding: 55px 20px
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
