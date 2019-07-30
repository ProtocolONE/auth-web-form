<template>
<div class="input">

  <input
      :value="value"
      class="input__field"
      :class="{
        'input__field--error': error
      }"
      @input="$emit('input', $event.target.value)">

  <span class="input__label" :title="label">
    {{ label }}
  </span>

  <span v-show="error" class="input__error" :title="errorText">
    {{ errorText }}
  </span>
</div>
</template>

<script>
import { omit } from 'lodash-es'

export default {
  name: 'BaseInput',

  props: {
    value: [String, Number, undefined, null],
    label: String,
    error: Boolean,
    errorText: String
  },

  computed: {
    props () {
      let paths = ['type', 'required', 'disabled', 'maxlength', 'minlength']
      return omit(this.$props, paths)
    }
  },

  mounted () {
    this.$emit('change-input', 123)
    // for (let name in this.$listeners) {
    //   if (name === 'change') continue
    //   let handleName = `on${name}`
    //   this.$el[handleName] = this.$listeners[name]
    // }
  }
}
</script>

<style lang="stylus" scoped>
$field_height = 32px
$field_padding = 24px

transform_text()
  width: 50%
  transform: translateY(-24px) scale(0.875, 0.875)

.input
  position: relative
  display: inline-block
  width: 100%
  margin: 0
  padding: $field_padding 0

  &__field
    width: 100%
    height: $field_height
    background-color: $white
    border-width: 0
    border-bottom-width: 1px
    border-color: $accent
    outline: none
    color: $primary
    line-height: $field_height
    transition: border-color 0.2s linear

    &:focus
      border-color: $info

      ~ .input__label
        color: $info
        pointer-events: auto
        transform_text()

    &:not(&--empty):not(:focus) ~ .input__label
      color: $accent
      transform_text()

    &--error
      border-color: $negative

      &:focus ~ .input__label
        color: $negative

  &__label
    position: absolute
    top: $field_padding
    left: 0
    width: 100%
    overflow: hidden
    transform-origin: left
    color: $secondary
    line-height: $field_height
    text-overflow: ellipsis
    white-space: nowrap
    transition: transform 0.2s linear, color 0.2s linear, width 0.2s linear

  &__error
    position: absolute
    display: block
    top: calc(100% - 20px)
    color: $negative
</style>
