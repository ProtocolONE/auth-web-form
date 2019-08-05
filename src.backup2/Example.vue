<template>
<div id="auth-example" class="auth-example">
  <app title="Example title"/>
</div>
</template>

<script>
import App from '@/App'

export default {
  name: 'AuthExample',

  components: {
    App
  }
}
</script>

<style lang="stylus" scoped>
.auth-example
  height: 100%
</style>
