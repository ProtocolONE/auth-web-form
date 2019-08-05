<template>
<p class="base-error m-none">
  <slot>
    {{ label }}
  </slot>
</p>
</template>

<script>
export default {
  name: 'BaseError',

  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
