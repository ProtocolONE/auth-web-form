<template>
<section class="login">
  <form id="login-form" class="login-form" @submit.prevent="handleSubmit">
    <h2 class="base-title text-center">{{ $t('sign_in') }}</h2>
    <ui-text-field
        v-model="email"
        :label="$t('email')"
        :has-error="errors.email"
        :error-text="errorMessages.email"
        type="email"
        @blur="validateEmail"/>
    <ui-text-field
        v-model="password"
        :label="$t('password')"
        :has-error="errors.password"
        :error-text="errorMessages.password"
        type="password"
        @blur="validatePassword"/>
    <label class="login-form__ck">
      <ui-checkbox v-model="rememberMe"/>
      <span class="ck-label">{{ $t('remember_me') }}</span>
    </label>
    <base-button class="login-form__btn" :label="$t('sign_in')" type="submit"/>
  </form>

  <div class="sign-options">
    <base-button :to="{ name: 'sign-up' }" :label="$t('sign_up')"/>
    <base-button :to="{ name: 'reset-password' }" :label="$t('reset_password')"/>
  </div>

  <div class="social-divider">
    <hr class="social-divider__hr">
    <span class="social-divider__label text-lower">{{ $t('or') }}</span>
    <hr class="social-divider__hr">
  </div>

  <auth-sign-list/>
</section>
</template>

<script>
import AuthSignList from '@/components/AuthSignList'

import { UiTextField, UiCheckbox } from '@protocol-one/ui-kit'
import { pickBy, identity, isEmpty } from 'lodash-es'

import patterns from '@/patterns'

export default {
  name: 'ViewLogin',

  components: {
    AuthSignList,
    UiTextField,
    UiCheckbox
  },

  data () {
    return {
      email: '',
      password: '',
      rememberMe: true,
      errors: {
        email: false,
        password: false
      }
    }
  },

  computed: {
    errorMessages () {
      return {
        email: this.emailErrorMessage,
        password: this.$t('errors.password_required')
      }
    },

    invalidEmail () {
      let email = this.email.toLowerCase()
      if (!email) return false
      return !patterns.email.test(email)
    },

    emailErrorMessage () {
      if (!this.email) {
        return this.$t('errors.email_required')
      }
      return this.$t('errors.enter_correct_email')
    },

    formData () {
      return {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      }
    }
  },

  methods: {
    validateEmail () {
      this.errors.email = !this.email || this.invalidEmail
    },

    validatePassword () {
      this.errors.password = !this.password
    },

    handleSubmit () {
      this.validateEmail()
      this.validatePassword()

      let pickedErrors = pickBy(this.errors, identity)
      let hasErrors = !isEmpty(pickedErrors)

      if (!hasErrors) {
        console.log('login!')
        console.log(this.formData)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-form
  display: flex
  flex-direction: column
  width: 300px

  &__ck
    display: flex
    align-items: center
    margin: 24px 0 12px
    cursor: pointer

  &__btn
    margin: 24px 0

.ck-label
  margin-left: 10px

.sign-options
  display: flex
  justify-content: space-between

.social-divider
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
