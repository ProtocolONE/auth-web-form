<script>
export default {
  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    additionalInfo: {
      default: '',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    errorText: {
      default: '',
      type: String,
    },
    hasError: {
      default: false,
      type: Boolean,
    },
    label: {
      default: '',
      type: String,
    },
    required: {
      default: false,
      type: Boolean,
    },
    type: {
      default: 'text',
      type: String,
    },
    value: {
      default: '',
      type: [String, Number],
    },
  },
  data() {
    return {
      inputValue: this.value,
      innerType: this.type,
    };
  },
  computed: {
    /**
     * Error is visible if it exists and error text isn't empty
     * @return {boolean}
     */
    isVisibleError() {
      return !!(this.hasError && this.errorText);
    },
    /**
     * Classes for input
     * @return {Array<string>}
     */
    inputClasses() {
      const isEmpty = !this.inputValue && this.inputValue !== 0;
      return [
        'input',
        isEmpty ? '_empty' : '',
        this.isVisibleError ? '_error' : '',
        this.disabled ? '_disabled' : '',
        this.required ? '_required' : '',
        this.type === 'password' ? '_password' : '',
      ];
    },
  },
  watch: {
    value(val) {
      this.inputValue = val;
    },
  },

  methods: {
    handleInput() {
      const prevValue = this.value || '';
      const value = this.inputValue || '';
      if (prevValue !== value) {
        this.$emit('input', value);
      }
    },

    togglePasswordInputType() {
      this.innerType = this.innerType === 'text' ? 'password' : 'text';
    },
  },
};
</script>

<template>
<div
  class="ui-text-field"
>
  <input
    v-model="inputValue"
    v-bind="{ ...$attrs, type: innerType, required, disabled }"
    :class="inputClasses"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
    @input="handleInput"
  />
  <label
    class="label"
    :title="label"
  >
    <slot name="label">{{ label }}</slot>
  </label>
  <IconEyeLineThrough
    v-if="type === 'password'"
    class="password-toggler"
    @click.native="togglePasswordInputType"
  />
  <span
    v-if="isVisibleError"
    class="error"
    :title="errorText"
  >
    {{ errorText }}
  </span>
  <span
    v-if="additionalInfo"
    class="additional"
    :title="additionalInfo"
  >
    {{ additionalInfo }}
  </span>
</div>
</template>

<style scoped lang="scss">
/** @TODO - move to gui for typographics */
$input-background-color: #fff;
$primary-input-color: #000000;
$secondary-input-color: #737373;
$focus-input-color: #3787ff;
$error-input-color: #ff6f6f;

$primary-input-size: 16px;
$secondary-input-size: 11px;
$left-indent: 17px;

.ui-text-field {
  display: inline-block;
  padding: 0 0 18px;
  position: relative;
  width: 100%;
}
.input {
  background-color: $input-background-color;
  border: 1px solid #c8c9c7;
  box-sizing: border-box;
  color: $primary-input-color;
  display: block;
  font-size: $primary-input-size;
  outline: none;
  height: 60px;
  line-height: 24px;
  padding: 26px 0 8px 16px;
  transition: border-color 0.2s ease-out;
  width: 100%;
  // for ios
  -webkit-appearance: none;
  border-radius: 0;

  &:focus {
    border-color: #000000;
    box-shadow: 0 0 0 3px rgba(201, 247, 58, 0.5);
  }

  &._error {
    &:focus ~ .label {
      color: $error-input-color;
    }

    border-color: $error-input-color;
  }

  &._disabled {
    color: $secondary-input-color;
    pointer-events: none;
  }

  &._required ~ .label {
    &:after {
      content: "*";
    }
  }

  &._password {
    padding-right: 38px;
  }
}
.additional,
.label {
  color: $secondary-input-color;
  line-height: 32px;
  margin: 0;
  position: absolute;
}
.label {
  font-size: $primary-input-size;
  left: 0;
  top: 8px;
  width: 100%;
  margin-left: $left-indent;
  font-size: 13px;
  line-height: 24px;

  &:after {
    color: #ea3d2f;
  }
}
.password-toggler {
  position: absolute;
  right: 10px;
  top: 20px;
  z-index: 1;
  cursor: pointer;
}
.additional {
  font-size: $secondary-input-size;
  max-width: 50%;
  right: 0;
  top: 0;
}
.error {
  bottom: -4px;
  left: $left-indent;
  color: $error-input-color;
  display: block;
  font-size: $secondary-input-size;
  position: absolute;
}
</style>
