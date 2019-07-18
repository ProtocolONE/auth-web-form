<template>
<auth-layout id="auth-web-form">
  <component
      :id="stepId"
      :is="step"
      :key="stepId"/>
</auth-layout>
</template>

<script>
import AuthLayout from '@/layouts/Auth'
import initI18n from '@/i18n'

import storage from '@/storage'
import { uniqueId } from 'lodash-es'

const STEP_STORAGE_NAME = 'step'
const STEPS = ['login', 'registration', 'successful', 'loading']

export default {
  name: 'AuthWebForm',

  i18n: initI18n(),

  components: {
    AuthLayout,
    Login: () => import('@/views/Login')
  },

  computed: {
    stepId () {
      return uniqueId(this.step)
    }
  },

  created () {
    this.updateStep(storage.get(STEP_STORAGE_NAME) || STEPS[0])
  },

  methods: {
    updateStep (step) {
      this.step = storage.set(STEP_STORAGE_NAME, step)
    }
  }
}
</script>

<style lang="stylus" src="./styl/index.styl"></style>

<style lang="stylus" scoped>
flex_centered()
  display: flex
  align-items: center

.auth
  display: grid
  height: 100%
  grid-row-gap: 70px
  grid-template-columns: 1fr
  grid-template-rows: 150px 1fr 130px
  grid-template-areas: 'header' 'content' 'footer'

  &__header
    grid-area: header
    flex_centered()
    border_solid(3px, 'bottom')

  &__content
    display: flex
    justify-content: center
    width: 100%
    grid-area: content

  &__footer
    grid-area: footer
    flex_centered()
    border_solid(3px, 'top')
</style>
