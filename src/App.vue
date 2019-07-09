<template>
<div id="auth-web-form" class="auth-web-form">
  <router-view/>
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus" src="@/styles/index.styl"></style>

<style lang="stylus" scoped>
.auth-web-form
  width: 100%
  height: 100%
  max-width: 900px
  background-color: $white
</style>
