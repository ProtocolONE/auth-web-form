<template>
<div class="loader">
  <div class="loader__child loader__child--1"></div>
  <div class="loader__child loader__child--2"></div>
  <div class="loader__child loader__child--3"></div>
  <div class="loader__child loader__child--4"></div>
</div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="stylus" scoped>
$loader_size = 64px
$child_size = 51px

.loader
  position: relative
  display: inline-block
  width: $loader_size
  height: $loader_size
  margin: auto

  &__child
    box-sizing: border-box
    position: absolute
    width: $child_size
    height: $child_size
    margin: 6px
    border: 6px solid $positive
    border-radius: 50%
    animation: loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite
    border-color: $positive transparent transparent transparent

    &--1
      animation-delay: -0.45s

    &--2
      animation-delay: -0.3s

    &--3
      animation-delay: -0.15s

@keyframes loading
  0%
    transform: rotate(0deg)

  100%
    transform: rotate(360deg)
</style>
