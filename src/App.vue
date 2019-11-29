<script>
import Common from '@/views/Common.vue';
import PaySuper from '@/views/PaySuper.vue';

export default {
  name: 'App',

  components: {
    Common,
    PaySuper,
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
