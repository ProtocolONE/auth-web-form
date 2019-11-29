<template>
<div class="ui-text-field-inactive">
  <span
    class="input _hide-overflow"
    :class="{ '_text-overflow-hidden': isTextOverflowHidden}"
    v-html="value || '—'"
  />
  <span
    class="label"
    :title="label"
  >
    <slot name="label">{{ label }}</slot>
  </span>
</div>
</template>

<script>
export default {
  props: {
    label: {
      default: '',
      type: String,
    },
    value: {
      default: '',
      type: [String, Number],
    },
    isTextOverflowHidden: {
      default: true,
      type: Boolean,
    },
  },
};
</script>

<style scoped lang="scss">
/** @TODO - move to gui for typographics */
$input-background-color: #fff;
$primary-input-color: #000000;
$secondary-input-color: #5e6366;

$primary-input-size: 16px;
$secondary-input-size: 12px;
$left-indent: 12px;

.ui-text-field-inactive {
  display: inline-block;
  padding: 24px 0 16px;
  position: relative;
  width: 100%;
}
.input {
  background-color: $input-background-color;
  border-width: 0;
  border-bottom-width: 1px;
  border-color: #e5e5e5;
  box-sizing: border-box;
  margin-top: 4px;
  color: $primary-input-color;
  display: block;
  font-size: $primary-input-size;
  line-height: 24px;
  outline: none;
  padding: 0 0 0 12px;
  transition: border-color 0.2s ease-out;
  width: 100%;

  /deep/ a {
    color: #3d7bf5;
    text-decoration: none;
  }

  &._text-overflow-hidden {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    /deep/ & > a {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
  }
}
.label {
  color: $secondary-input-color;
  margin: 0;
  position: absolute;
  font-size: $primary-input-size;
  left: 0;
  top: 6px;
  width: 100%;
  margin-left: 12px;
  font-size: 12px;
  line-height: 16px;
}
</style>
