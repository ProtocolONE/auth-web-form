<script>
import Common from '@/views/Common.vue';
import PaySuper from '@/views/PaySuper.vue';
import { postMessage } from '@/postMessage';

export default {
  name: 'App',

  components: {
    Common,
    PaySuper,
  },

  created() {
    postMessage('CREATED');
  },
};
</script>

<template>
<component :is="$view" />
</template>

<style lang="scss">
body {
  margin: 0;

  &.inside-iframe {
    overflow: hidden;
  }
}
</style>
