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
          width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- eslint-disable-next-line -->
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16 2V16H2V2H16ZM16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0Z" fill="#78909C"/>
        </svg>
        <svg
          class="svg-checked"
          width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- eslint-disable-next-line -->
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM7 14L2 9L3.4 7.6L7 11.2L14.6 3.6L16 5L7 14Z" fill="#3D7BF5"/>
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
  padding-left: 12px;
}

.wrapper {
  display: inline-flex;
  cursor: pointer;
  vertical-align: top;
}

.checkbox {
  margin-top: 2px;
}

.svg-checked {
  display: none;
}

.text:not(:empty) {
  margin-left: 12px;
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
