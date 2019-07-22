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
  grid-row-gap: 15px
  grid-template-columns: 1fr
  grid-template-rows: 150px 1fr 130px
  grid-template-areas: 'header' 'content' 'footer'
  overflow: hidden

  &__header
    grid-area: header
    flex_centered()
    border_solid(3px, 'bottom')

  &__content
    display: flex
    padding: 55px 0
    justify-content: center
    width: 100%
    grid-area: content
    overflow: auto

  &__footer
    grid-area: footer
    flex_centered()
    border_solid(3px, 'top')
</style>
