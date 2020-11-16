<script>
import { includes } from 'lodash-es';

export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    size: {
      default: 'default',
      type: String,
      validator(value) {
        return includes(['default'], value);
      },
    },
  },
  computed: {
    /**
     * Classes for checkbox
     * @return {Array<string>}
     */
    checkboxClasses() {
      return ['label', `_${this.size}`, this.disabled ? '_disabled' : ''];
    },
  },
  methods: {
    /**
     * @param {Event} event
     */
    emitChange(event) {
      // If button has disabled we shoudn't send events
      if (this.disabled) {
        return;
      }

      this.$emit('change', event.target.checked);
    },
  },
};
</script>

<template>
<div class="ui-checkbox">
  <label class="wrapper">
    <div class="checkbox">
      <input
        v-bind="{ checked, disabled }"
        class="input"
        type="checkbox"
        @change="emitChange"
      >
      <div :class="checkboxClasses">
        <svg
          class="svg-not-checked"
          width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.846069" y="0.5" width="23" height="23" rx="1.5" fill="white" stroke="black"/>
        </svg>
        <svg
          class="svg-checked"
          width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.346069" width="24" height="24" rx="2" fill="#C9F73A"/>
        <path d="M20.3461 6L9.34607 17L4.34607 12"
          stroke="black" stroke-width="2" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <div class="text">
      <slot></slot>
    </div>
  </label>
</div>
</template>

<style scoped lang="scss">
$disabled-checkbox-color: #e1e1e1;

.ui-checkbox {
  display: block;
  position: relative;
}

.wrapper {
  display: inline-flex;
  cursor: pointer;
  vertical-align: top;
}

.checkbox {
}

.svg-checked {
  display: none;
}

.text:not(:empty) {
  margin-left: 14px;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
}
.input {
  height: 0;
  position: absolute;
  visibility: hidden;
  width: 0;

  &:checked + .label {
    .svg-checked {
      display: inline;
    }
    .svg-not-checked {
      display: none;
    }
  }
}
.label {
  cursor: pointer;
  display: block;
  transition: all 0.2s ease-out;
  height: 14px;
  width: 14px;

  & > svg {
    pointer-events: none;
    vertical-align: top;
  }

  &._disabled {
    svg path {
      fill: $disabled-checkbox-color;
    }
  }
}
</style>
