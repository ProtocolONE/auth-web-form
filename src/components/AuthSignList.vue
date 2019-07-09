<template>
<div class="sign text-center">
  <ul class="sign-list">
    <li v-for="social in 5" :key="social" class="sign-list__item">
      <base-button class="sign-list__link" :to="`#${social}`"/>
    </li>
  </ul>

  <transition name="accordion">
    <div v-show="showMore" class="sign-accordion">
      <ul class="sign-list">
        <li v-for="social in 8" :key="social" class="sign-list__item">
          <base-button class="sign-list__link" :to="`#${social}`"/>
        </li>
      </ul>
    </div>
  </transition>

  <base-button
      class="sign-toggle text-lower"
      href="#"
      :label="accordionLabel"
      @click.prevent="toggleAccordion"/>
</div>
</template>

<script>
export default {
  name: 'AuthSignList',

  data () {
    return {
      showMore: false
    }
  },

  computed: {
    accordionLabel () {
      return (this.showMore)
        ? `- ${this.$t('less_sign_in_methods')}`
        : `+ ${this.$t('more_sign_in_methods')}`
    }
  },

  methods: {
    toggleAccordion () {
      this.showMore = !this.showMore
    }
  }
}
</script>

<style lang="stylus" scoped>
.sign-list
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr
  grid-gap: 12px
  margin: 0
  padding: 0
  list-style-type: none

  &__item
    width: 50px
    height: 50px
    background-color: $warning
    border_radius(10px)

  &__link
    display: inline-flex
    width: 100%
    height: 100%

.sign-toggle
  display: inline-block
  margin: 20px 0

.sign-accordion
  margin-top: 12px
</style>
