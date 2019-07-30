<template>
<div class="auth">
  <auth-header class="auth__header"/>
  <main class="auth__content">
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
import AuthHeader from '@/components/AuthHeader'
import AuthFooter from '@/components/AuthFooter'

export default {
  name: 'LayoutAuth',

  components: {
    AuthHeader,
    AuthFooter
  }
}
</script>

<style lang="stylus" scoped>
flex_centered()
  display: flex
  align-items: center

.auth
  display: grid
  height: 100%
  grid-template-columns: 1fr
  grid-template-rows: 150px 1fr 130px
  grid-template-areas: 'header' 'content' 'footer'
  overflow: hidden

  &__header,
  &__footer
    flex_centered()
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

  &.auth-web-form--mobile
    display: flex
    flex-direction: column
    min-height: 60vh
    max-height: 100%

  .auth-web-form--mobile &
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
