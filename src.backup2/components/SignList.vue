<template>
<div class="sign text-center">
  <div v-if="divider" class="sign-divider">
    <hr class="sign-divider__hr">
    <span class="sign-divider__label text-lower">{{ dividerLabel || $authTrans('or') }}</span>
    <hr class="sign-divider__hr">
  </div>

  <ul class="sign-list">
    <li v-for="social in dummyCount" :key="social" class="sign-list__item">
      <base-button class="sign-list__link" :href="`#${social}`"/>
    </li>
  </ul>

  <transition name="accordion">
    <div v-show="showMore" class="sign-accordion">
      <ul class="sign-list">
        <li v-for="social in 8" :key="social" class="sign-list__item">
          <base-button class="sign-list__link" :href="`#${social}`"/>
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
import BaseButton from '@/components/BaseButton'

export default {
  name: 'SignList',

  inject: ['screen'],

  components: {
    BaseButton
  },

  props: {
    divider: {
      type: Boolean,
      default: true
    },
    dividerLabel: String
  },

  data () {
    return {
      showMore: false
    }
  },

  computed: {
    dummyCount () {
      if (this.screen.resolution === 'mobile') {
        return 4
      }
      return 5
    },

    accordionLabel () {
      return (this.showMore)
        ? `- ${this.$authTrans('less_sign_in_methods')}`
        : `+ ${this.$authTrans('more_sign_in_methods')}`
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
.sign
  display: flex
  flex-direction: column

.sign-list
  display: grid
  grid-template-columns: 50px 50px 50px 50px 50px
  grid-gap: 12px
  margin: 0 auto
  padding: 0
  list-style-type: none

  &__item
    height: 50px
    background-color: $warning
    border_radius(10px)

  &__link
    display: inline-flex
    width: 100%
    height: 100%

  .auth--mobile &
    grid-template-columns: 50px 50px 50px 50px

.sign-toggle
  display: inline-block
  margin: 20px 0

.sign-accordion
  margin: 12px auto 0

.sign-divider
  display: flex
  align-items: center
  justify-content: space-between
  margin: 30px 0 20px

  &__hr
    height: 1px
    margin: 0
    flex-grow: 1
    border: 0
    background-color: rgba($accent, .5)

  &__label
    margin: 0 15px
</style>
