<template>
<auth-layout id="auth-web-form" class="auth-web-form">
  <component
      :id="stepId"
      :is="step"
      :key="stepId"/>
</auth-layout>
</template>

<script>
import AuthLayout from '@/layouts/Auth'
import Login from '@/views/Login'

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
    Login
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
.auth-web-form
  font-family: Quicksand, sans-serif
  font-weight: 500
</style>
