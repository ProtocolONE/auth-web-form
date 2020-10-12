<script>
export default {
  name: 'UiPageHeader',
};
</script>

<template>
<header class="ui-page-header">
  <div class="picture">
    <slot name="picture"></slot>
  </div>
  <h2 class="header">
    <slot name="title"></slot>
  </h2>
  <p class="text">
    <slot name="description"></slot>
  </p>
</header>
</template>

<style lang="scss" scoped>
.ui-page-header {
  margin-bottom: 28px;
}

.picture {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;

  &:empty {
    display: none;
  }
}
.header {
  color: #000000;
  transition: color 0.2s ease-out;
  font-family: Quicksand, Verdana, Tahoma, sans-serif;
  margin: 0;
  display: flex;
  font-weight: normal;
  font-size: 34px;
  line-height: 42px;
  margin-bottom: 12px;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.text {
  color: #5e6366;
  text-align: center;
}
</style>
