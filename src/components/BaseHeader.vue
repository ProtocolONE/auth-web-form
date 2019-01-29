<script>
export default {
  props: {
    /** Уровень заголвка (h1-h6) */
    level: {
      required: true,
      type: String,
      validator(value) {
        const values = ['1', '2', '3', '4', '5', '6'];
        return values.indexOf(value) !== -1;
      },
    },

    hasMargin: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    /**
     * Формирует тег для заголовка
     * @return {string}
     */
    tag() {
      return `h${this.level}`;
    },
  },
};
</script>

<template>
  <div
    class="base-header"
    :class="{'_has-margin': hasMargin}"
  >
    <component :is="tag" >
      <slot></slot>
    </component>
  </div>
</template>

<style lang="scss" scoped>
%ui-kit-title {
  padding: 0;
  margin: 0;
  font-weight: 400;
}

.base-header {
  h1 {
    font-size: 54px;
    line-height: 60px;
    @extend %ui-kit-title;
  }

  h2 {
    font-size: 48px;
    line-height: 54px;
    @extend %ui-kit-title;
  }

  h2 {
    font-size: 24px;
    line-height: 30px;
    @extend %ui-kit-title;
  }

  &._has-margin {
    margin-bottom: 12px;
  }
}
</style>
