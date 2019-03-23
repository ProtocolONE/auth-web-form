<script>
export default {
  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    value: {
      type: String,
      default: '0',
    },

    color: {
      default: 'yellow',
      type: String,
    },

    size: {
      default: 'default',
      type: String,
    },

    type: {
      default: 'checkbox',
      type: String,
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
    };
  },

  methods: {
    onChange(event) {
      this.$emit('input', event.target.checked.toString());
    },
    focus() {
      this.$el.querySelector('checkbox')
        .focus();
    },
  },
};
</script>

<template>
    <div class="base-text-field">

        <input
                class="base-checkbox-field"
                v-bind="$attrs"
                v-model="innerValue"
                :type="type"
                @change="onChange"
                @focus="$emit('focus', $event), hasFocus = true"
                @blur="$emit('blur', $event), hasFocus = false"/>

    </div>
</template>

<style lang="scss">
    .base-checkbox-field {
        width: 100%;
        background: $ui-color-white;
        height: 22px;
        color: $ui-color-grey13;
        font-size: 15px;
        line-height: 18px;
        padding: 0 12px;
        border: 1px solid $ui-color-grey72;
        transition: border-color 0.1s ease;
    }
</style>
