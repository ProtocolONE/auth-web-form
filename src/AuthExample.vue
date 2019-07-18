<template>
<div id="auth-example">
  <auth-web-form/>
</div>
</template>

<script>
// import AuthWebForm from '@/AuthWebForm'
import AuthWebForm from '@protocol-one/auth-web-form'

export default {
  name: 'AuthExample',

  components: {
    AuthWebForm
  }
}
</script>
