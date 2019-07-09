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
import { omit } from 'lodash-es'

export default {
  name: 'BaseButton',

  props: {
    // --- router-link[to]
    to: [String, Object],
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
      if (this.to) return 'router-link'
      else if (this.href) return 'a'
      else return 'button'
    },

    className () {
      let prefix = 'button'
      if (this.to || this.href) {
        prefix = 'link'
      }
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
