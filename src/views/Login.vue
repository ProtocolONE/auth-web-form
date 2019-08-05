<template>
<section class="view view--login">
  <h2 class="base-title text-center mt-none">{{ $t('sign_in') }}</h2>
  <form id="login-form" class="view__form form" @submit.prevent="handleSubmit">
    <ui-text-field
        v-model="email"
        :label="$t('email')"
        :has-error="serverErrors.email || errors.email"
        :error-text="serverErrors.email || errorMessages.email"
        type="email"
        @blur="validateEmail"/>
    <password-field
        v-model="password"
        @validate="validatePassword"/>
    <label class="form__ck ck">
      <ui-checkbox v-model="remember"/>
      <span class="ck__label">{{ $t('remember_me') }}</span>
    </label>
    <base-button class="form__btn" :label="$t('sign_in')" type="submit"/>
  </form>
  <div class="form__sign-options">
    <base-button href="#sign-up" :label="$t('sign_up')" @click.prevent="$emit('view', 'registration')"/>
    <base-button href="#reset-password" :label="$t('reset_password')"/>
  </div>
  <sign-list/>
</section>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import PasswordField from '@/components/PasswordField'
import SignList from '@/components/SignList'

import patterns from '@/utils/patterns'
import { mapState, mapMutations, mapActions } from 'vuex'

import { UiTextField, UiCheckbox } from '@protocol-one/ui-kit'
import { forEach, pickBy, identity, isEmpty } from 'lodash-es'

export default {
  name: 'ViewLogin',

  components: {
    BaseButton,
    PasswordField,
    SignList,
    UiTextField,
    UiCheckbox
  },

  data () {
    return {
      email: '',
      password: '',
      remember: true,
      errors: {
        email: false,
        password: false
      }
    }
  },

  computed: {
    ...mapState(['serverErrors']),

    errorMessages () {
      return {
        email: this.emailErrorMessage,
        password: this.$t('errors.password_required')
      }
    },

    wrongEmail () {
      if (!this.email) return false
      return !patterns.email.test(this.email.toLowerCase())
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
        remember: this.remember
      }
    }
  },

  methods: {
    ...mapMutations(['updateServerErrors']),
    ...mapActions(['login']),

    clearServerErrorMessages () {
      forEach(this.serverErrorMessages, (_, key) => {
        delete this.serverErrorMessages[key]
      })
    },

    validateEmail () {
      this.errors.email = !this.email || this.wrongEmail
    },

    validatePassword (isValid) {
      if (typeof isValid === 'undefined') {
        this.errors.password = !this.password
      }
      else {
        this.errors.password = !isValid
      }
    },

    handleSubmit () {
      this.updateServerErrors()

      this.validateEmail()
      this.validatePassword()

      let pickedErrors = pickBy(this.errors, identity)
      let hasErrors = !isEmpty(pickedErrors)

      if (!hasErrors) {
        this.login(this.formData)
      }
    }
  }
}
</script>
