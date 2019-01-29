<script>
import { TheMask } from 'vue-the-mask';

export default {
  components: {
    // eslint-disable-next-line
    TheMask,
  },

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    value: {
      type: String,
      default: '',
    },
    mask: {
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: [Array, String],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },

  watch: {
    value(value) {
      this.innerValue = value;
    },
  },

  data() {
    return {
      innerValue: this.value,
      hasFocus: false,

      maskTokens: {
        '#': { pattern: /\d/ },
        X: { pattern: /[0-9a-zA-Z]/ },
        S: { pattern: /[a-zA-Z]/ },
        A: { pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase() },
        a: { pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase() },
        '!': { escape: true },
        U: { pattern: /[a-zA-Z\s]/, transform: v => v.toLocaleUpperCase() },
      },
    };
  },

  methods: {
    focus() {
      this.$el.querySelector('input').focus();
    },
  },
};
</script>

<template>
  <div class="base-text-field"
    :class="{'base-text-field_error': hasError}">

    <TheMask
      class="base-text-field__input"
      v-if="mask"
      v-bind="$attrs"
      v-model="innerValue"
      :type="type"
      :mask="mask"
      :tokens="maskTokens"
      @input="$emit('input', innerValue)"
      @focus="$emit('focus', $event), hasFocus = true"
      @blur="$emit('blur', $event), hasFocus = false" />

    <input
      class="base-text-field__input"
      v-else
      v-bind="$attrs"
      v-model="innerValue"
      :type="type"
      :mask="mask"
      @input="$emit('input', innerValue)"
      @focus="$emit('focus', $event), hasFocus = true"
      @blur="$emit('blur', $event), hasFocus = false" />

    <BaseErrorText v-if="hasError" :value="errors" />

  </div>
</template>

<style lang="scss">
.base-text-field {
  width: 100%;

  &_error {
    color: #ff3737;
  }

  &__label {
    display: block;
  }

  &__input {
    background: $ui-color-white;
    width: 100%;
    height: 34px;
    color: $ui-color-grey13;
    font-size: 15px;
    line-height: 18px;
    padding: 0 12px;
    border: 1px solid $ui-color-grey72;
    transition: border-color 0.1s ease;

    &::placeholder {
      color: $ui-color-grey72;
    }

    .base-text-field_error & {
      border-color: #ff3737;
    }

    &:focus {
      outline: none;
      border-color: #0b99ff;
    }

    &:disabled {
      border-color: transparent;
      color: #888;
    }
  }
}
</style>
