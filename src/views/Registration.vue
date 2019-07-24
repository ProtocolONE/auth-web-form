<template>
<section class="view view--registration">
  <h2 class="base-title text-center mt-none">{{ $authTrans('sign_up') }}</h2>
  <form id="registration-form" class="view__form form" @submit.prevent="handleSubmit">
    <ui-text-field
        v-model="username"
        :label="$authTrans('username')"
        :has-error="errors.username"
        :error-text="errorMessages.username"
        @blur="validateUsername"/>
    <ui-text-field
        v-model="email"
        :label="$authTrans('email')"
        :has-error="errors.email"
        :error-text="errorMessages.email"
        type="email"
        @blur="validateEmail"/>
    <auth-password-field
        v-model="password"
        registration
        @validate="validatePassword"/>
    <label class="form__ck ck" :class="{ 'ck--error': errors.accept }">
      <ui-checkbox v-model="acceptUserAgreement" @change="validateAcceptUserAgreement"/>
      <span class="ck__label">
        {{ $authTrans('i_read_and_accept') }}
        <base-button href="#user-agreement" :label="$authTrans('user_agreement')"/>
      </span>
    </label>
    <base-error v-show="errors.accept" :label="errorMessages.accept"/>
    <base-button class="form__btn" :label="$authTrans('sign_up')" type="submit"/>
  </form>

  <div class="form__sign-options">
    <base-button href="#sign-up" :label="$authTrans('sign_in')" @click.prevent="updateStep('login')"/>
    <base-button href="#login-without-password" :label="$authTrans('login_without_password')"/>
  </div>

  <auth-sign-list/>
</section>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import BaseError from '@/components/BaseError'
import AuthPasswordField from '@/components/AuthPasswordField'
import AuthSignList from '@/components/AuthSignList'

import { UiTextField, UiCheckbox } from '@protocol-one/ui-kit'

import patterns from '@/patterns'
import { pickBy, identity, isEmpty } from 'lodash-es'

export default {
  name: 'ViewRegistration',

  inject: ['updateStep'],

  components: {
    BaseButton,
    BaseError,
    AuthPasswordField,
    AuthSignList,
    UiTextField,
    UiCheckbox
  },

  data () {
    return {
      username: '',
      email: '',
      password: '',
      acceptUserAgreement: false,
      errors: {
        username: false,
        email: false,
        password: false,
        accept: false
      }
    }
  },

  computed: {
    errorMessages () {
      return {
        username: this.usernameErrorMessage,
        email: this.emailErrorMessage,
        accept: this.$authTrans('errors.you_should_accept_user_agreement')
      }
    },

    wrongUsername () {
      if (!this.username) return false
      return !patterns.username.test(this.username)
    },

    wrongEmail () {
      if (!this.email) return false
      return !patterns.email.test(this.email.toLowerCase())
    },

    wrongPassword () {
      if (!this.password) return false
      return !patterns.password.test(this.password)
    },

    usernameErrorMessage () {
      if (!this.username) {
        return this.$authTrans('errors.username_required')
      }
      return this.$authTrans('errors.username_validate_message')
    },

    emailErrorMessage () {
      if (!this.email) {
        return this.$authTrans('errors.email_required')
      }
      return this.$authTrans('errors.enter_correct_email')
    },

    formData () {
      return {
        username: this.username,
        email: this.email,
        password: this.password,
        acceptUserAgreement: this.acceptUserAgreement
      }
    }
  },

  methods: {
    validateUsername () {
      this.errors.username = !this.username || this.wrongUsername
    },

    validateEmail () {
      this.errors.email = !this.email || this.wrongEmail
    },

    validatePassword (isValid) {
      if (typeof isValid === 'undefined') {
        this.errors.password = !this.password || this.wrongPassword
      }
      else {
        this.errors.password = !isValid
      }
    },

    validateAcceptUserAgreement (value = this.acceptUserAgreement) {
      this.errors.accept = !value
    },

    handleSubmit () {
      this.validateUsername()
      this.validateEmail()
      this.validatePassword()
      this.validateAcceptUserAgreement()

      let pickedErrors = pickBy(this.errors, identity)
      let hasErrors = !isEmpty(pickedErrors)

      if (!hasErrors) {
        console.log('registration!')
        console.log(this.formData)
      }
    }
  }
}
</script>
