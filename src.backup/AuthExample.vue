<template>
<div id="auth-example" class="auth-example">
  <auth-web-form title="Example title"/>
</div>
</template>

<script>
import AuthWebForm from '@/AuthWebForm'

export default {
  name: 'AuthExample',

  components: {
    AuthWebForm
  }
}
</script>

<style lang="stylus" scoped>
.auth-example
  height: 100%
</style>
