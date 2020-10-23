<script>
export default {
  name: 'UiErrorText',

  props: {
    value: {
      type: [Array, String],
    },
  },

  computed: {
    messages() {
      if (Array.isArray(this.value)) {
        return this.value;
      }

      return [this.value];
    },
  },
};
</script>

<template>
<div class="ui-error-text">
  <div v-for="(message, index) in messages" :key="index">{{message}}</div>
  <slot></slot>
</div>
</template>

<style lang="scss" scoped>
.ui-error-text {
  font-size: 12px;
  line-height: 13px;
  color: #ff6f6f;
}
</style>
