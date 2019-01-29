<script>
export default {
  name: 'BaseErrorText',

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
  <div class="base-error-text">
    <div v-for="(message, index) in messages" :key="index">{{message}}</div>
    <slot></slot>
  </div>
</template>

<style lang="scss">
.base-error-text {
  font-size: 12px;
  line-height: 13px;
  color: $ui-color-red;
  margin-top: 5px;
}
</style>
