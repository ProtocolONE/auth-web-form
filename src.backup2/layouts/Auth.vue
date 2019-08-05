<template>
<div class="auth">
  <base-header class="auth__header"/>
  <main class="auth__content">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <slot/>
      </keep-alive>
    </transition>
  </main>
  <base-footer class="auth__footer"/>
</div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader'
import BaseFooter from '@/components/BaseFooter'

export default {
  name: 'Layout',

  components: {
    BaseHeader,
    BaseFooter
  }
}
</script>

<style lang="stylus" scoped>
.auth
  display: grid
  height: 100%
  grid-template-columns: 1fr
  grid-template-rows: 150px 1fr 130px
  grid-template-areas: 'header' 'content' 'footer'
  overflow: hidden

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
</style>
