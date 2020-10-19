<script>
import { includes } from 'lodash-es';

export default {
  props: {
    color: {
      default: 'green',
      type: String,
      validator(value) {
        return includes([
          'blue',
          'orange',
          'yellow',
          'purple',
          'green',
          'gray',
          'light-gray',
          'red',
          'transparent-gray',
          'transparent-blue',
        ], value);
      },
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    isRounded: {
      default: false,
      type: Boolean,
    },
    isTransparent: {
      default: false,
      type: Boolean,
    },
    size: {
      default: 'default',
      type: String,
      validator(value) {
        return includes(['tiny', 'small', 'default'], value);
      },
    },
    text: {
      default: '',
      type: String,
    },
    type: {
      default: 'button',
      type: String,
      validator(value) {
        return includes(['button', 'submit', 'reset'], value);
      },
    },
  },
  computed: {
    /**
     * Classes for button
     * @return {Array<string>}
     */
    buttonClasses() {
      return [
        /**
         * We need unique classes for root elements in our components
         * because root elements debends on parent's style scope
         */
        'ui-base-button',
        this.disabled ? '_disabled' : '',
        this.isRounded ? '_rounded' : '',
        this.isTransparent ? '_transparent' : '',
        this.noSidePaddings ? '_no-side-paddings' : '',
        ...[this.color, this.size, this.type].map(value => `_${value}`),
      ];
    },
  },
  methods: {
    /**
     * @param {Event} event
     */
    emitClick(event) {
      // If button has disabled we shoudn't send events
      if (this.disabled) {
        return;
      }

      this.$emit('click', event);
    },
  },
};
</script>

<template>
<button
  :class="buttonClasses"
  v-bind="{ disabled, type }"
  @click="emitClick"
>
  <span
    v-if="$slots.iconBefore"
    class="icon-before"
  >
    <slot name="iconBefore"></slot>
  </span>
  <span class="text">
    {{ text }}
    <slot />
  </span>
</button>
</template>

<style scoped lang="scss">
/** @TODO - move to gui consts, fix color and typographics consts */
$blue-button-color: #485cc7;
$yellow-button-color: #f3aa18;
$orange-button-color: #ff6f6f;
$purple-button-color: #8077e7;
$green-button-color: #85f53b;
$button-font-color: #fff;
$gray-button-color: #919699;
$light-gray-button-color: #f7f9fa;
$light-gray-font-color: #333;
$light-gray-font-weight: normal;
$light-gray-transparent-font-color: #333;
$light-gray-transparent-border-color: #e3e5e6;
$light-gray-transparent-hover-font-color: #485cc7;
$light-gray-transparent-hover-box-color: rgba(#485cc7, 0.08);
$red-button-color: #ea3d2f;
$transparent-gray-font-color: #78909c;
$transparent-gray-transparent-font-color: #78909c;
$transparent-gray-transparent-hover-box-color: #f7f9fa;
$transparent-blue-font-color: #485cc7;
$transparent-blue-transparent-font-color: #485cc7;
$transparent-blue-transparent-hover-box-color: #485cc7;
$disabled-button-color: #f1f3f4;
$disabled-font-color: #919699;

$primary-button-size: 14px;

@mixin base-button(
  $background,
  $color: $button-font-color,
  $fontWeight: 500,
  $transparentColor: $background,
  $transparentBorderColor: $background,
  $transparentHoverColor: $background,
  $transparentHoverBoxColor: transparent
) {
  background-color: $background;
  border-radius: 2px;
  border-width: 0;
  color: $color;
  cursor: pointer;
  display: inline-block;
  font-size: $primary-button-size;
  font-family: "Inter", sans-serif;
  font-weight: $fontWeight;
  line-height: 24px;
  max-width: 100%;
  outline: none;
  padding: 8px 24px;
  position: relative;
  text-align: center;
  transition: color 0.2s ease-out, background-color 0.2s ease-out,
    box-shadow 0.2s ease-out;

  &:not(._disabled):not(._transparent):before {
    bottom: 1px;
    content: "";
    left: 1px;
    position: absolute;
    right: 1px;
    top: 3px;
    pointer-events: none;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba($background, 0.24),
      0px 4px 8px rgba($background, 0.16);
  }

  &:hover {
    background-color: rgba($background, 0.85);
  }

  &:active {
    background-color: $background;
    box-shadow: inset 0px 4px 16px rgba(0, 0, 0, 0.15);

    &:before {
      opacity: 0;
    }
  }

  &._rounded {
    border-radius: 20px;

    &:not(._disabled):not(._transparent):before {
      border-radius: 20px;
    }
  }

  &._transparent {
    background-color: transparent;
    color: $transparentColor;
    box-shadow: inset 0px 0px 0px 1px $transparentBorderColor;

    &:hover {
      background-color: $transparentHoverBoxColor;
      color: $transparentHoverColor;
    }

    &._disabled {
      background-color: transparent;
      border-color: transparent;
      box-shadow: none;
    }
  }

  &._disabled {
    background-color: $disabled-button-color;
    border-color: $disabled-font-color;
    pointer-events: none;
    color: $disabled-font-color;
  }

  &._tiny {
    padding: 4px 16px;
    line-height: 16px;
    height: 24px;
  }
  &._small {
    padding: 8px 16px;
    line-height: 16px;
    height: 32px;
  }
}

.ui-base-button {
  text-transform: uppercase;
  min-width: 128px;
  &._green {
    @include base-button($green-button-color, #000);
  }
  &._blue {
    @include base-button($blue-button-color);
  }
  &._orange {
    @include base-button($orange-button-color);
  }
  &._yellow {
    @include base-button($yellow-button-color);
  }
  &._purple {
    @include base-button($purple-button-color);
  }
  &._gray {
    @include base-button($gray-button-color);
  }
  &._light-gray {
    @include base-button(
      $light-gray-button-color,
      $light-gray-font-color,
      normal,
      $light-gray-transparent-font-color,
      $light-gray-transparent-border-color,
      $light-gray-transparent-hover-font-color,
      $light-gray-transparent-hover-box-color
    );
  }
  &._red {
    @include base-button($red-button-color);
  }
  &._transparent-gray {
    @include base-button(
      $light-gray-button-color,
      $transparent-gray-font-color,
      normal,
      $transparent-gray-transparent-font-color,
      $light-gray-transparent-border-color,
      $transparent-gray-transparent-font-color,
      $transparent-gray-transparent-hover-box-color
    );
  }
  &._transparent-blue {
    @include base-button(
      transparent,
      $transparent-blue-font-color,
      normal,
      $transparent-blue-transparent-font-color,
      transparent,
      $transparent-blue-transparent-font-color,
      transparent
    );
    &:not(._disabled) .icon-before svg {
      fill: $transparent-blue-font-color;
    }
  }
}

.icon-before {
  vertical-align: middle;
  display: inline-flex;
  margin: -1px 6px 0 -6px;
}
.text {
  vertical-align: middle;
}
</style>
