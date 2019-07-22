<template>
<component
    v-bind="props"
    :is="tagName"
    :class="className"
    :aria-label="label">
  <slot>
    {{ label }}
  </slot>
</component>
</template>

<script>
import { UiButton } from '@protocol-one/ui-kit'
import { omit } from 'lodash-es'

export default {
  name: 'BaseButton',

  components: {
    UiButton
  },

  props: {
    // --- a[href]
    href: String,
    // --- element text
    label: String,
    // --- color for class name prefix
    // --- ex: base-{tagName}--{color}
    color: {
      type: String,
      default: 'primary'
    }
  },

  computed: {
    props () {
      let paths = ['label', 'color']
      return omit(this.$props, paths)
    },

    tagName () {
      return (this.href) ? 'a' : 'button'
    },

    className () {
      let prefix = (this.href) ? 'link' : 'button'
      return [`base-${prefix}`, `base-${prefix}--${this.color}`]
    }
  },

  mounted () {
    for (let name in this.$listeners) {
      let handleName = `on${name}`
      this.$el[handleName] = this.$listeners[name]
    }
  }
}
</script>
