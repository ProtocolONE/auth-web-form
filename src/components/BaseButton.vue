<script>
import { includes } from 'lodash-es';

export default {
  props: {
    color: {
      default: 'yellow',
      type: String,
      validator(value) {
        return includes(['yellow'], value);
      },
    },

    size: {
      default: 'default',
      type: String,
      validator(value) {
        return includes(['default', 'big'], value);
      },
    },

    type: {
      default: 'button',
      type: String,
      validator(value) {
        return includes(['button', 'submit', 'reset'], value);
      },
    },

    isLoading: {
      default: false,
      type: Boolean,
    },

    disabled: {
      default: false,
      type: Boolean,
    },
  },

  computed: {
    viewClass() {
      const result = [`_color-${this.color}`, `_size-${this.size}`];
      if (this.pressed) {
        result.push('_pressed');
      }
      return result;
    },
  },
};
</script>

<template>
  <button
    class="base-button"
    :type="type"
    :class="viewClass"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <IconLoadingAnimated
      class="base-button__loading"
      v-if="isLoading"
      width="13"
      height="13"
      stroke="#333"
    />
    <slot></slot>
  </button>
</template>

<style lang="scss">
.base-button {
  color: $ui-color-grey13;
  background-color: $ui-color-yellow;
  border: 1px solid darken($ui-color-yellow, 20%);
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: darken($ui-color-yellow, 10%);
  }

  &._size-default {
    padding: 0 16px;
    height: 34px;
    font-size: 15px;
    line-height: 32px;
  }

  &._size-big {
    padding: 0 18px;
    height: 38px;
    font-size: 16px;
    line-height: 37px;
  }

  &__loading {
    margin: -3px 6px 0 -4px;
  }
}
</style>
