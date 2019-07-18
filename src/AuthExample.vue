<template>
<div id="auth-example">
  <auth-web-form/>
</div>
</template>

<script>
import AuthWebForm from '@/AuthWebForm'
// import AuthWebForm from '../dist/auth-web-form.umd.min'

export default {
  name: 'AuthExample',

  components: {
    AuthWebForm
  }
}
</script>
