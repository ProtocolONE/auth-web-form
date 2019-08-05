<template>
<div class="password">
  <ui-text-field
      v-model="model"
      :label="$t('password')"
      :has-error="serverErrors.password || hasError"
      :error-text="serverErrors.password || errorText"
      :type="passwordType"
      @focus="toggleTooltip(true)"
      @blur="validate"/>
  <base-button v-if="registration" href="#" class="password__toggle" @click.prevent="togglePasswordState">
    <transition name="fade" mode="out-in">
      <i v-show="!showPassword" class="password__icon"></i>
    </transition>
    <transition name="fade" mode="out-in">
      <i v-show="showPassword" class="password__icon password__icon--closed"></i>
    </transition>
  </base-button>
  <transition v-if="registration" name="fade">
    <div v-show="showTooltip" class="password__tooltip">
      <b class="password__title">{{ tooltip.title }}</b>
      <i class="password__progress" :class="tooltip.progressClass"></i>
      <p class="password__text mb-none">{{ tooltip.text }}</p>
    </div>
  </transition>
</div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import { UiTextField } from '@protocol-one/ui-kit'
import { mapState } from 'vuex'

import patterns from '@/utils/patterns'

export default {
  name: 'PasswordField',

  components: {
    BaseButton,
    UiTextField
  },

  props: {
    value: String,
    registration: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      form: null,
      hasError: false,
      showPassword: false,
      showTooltip: false
    }
  },

  computed: {
    ...mapState(['serverErrors']),

    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },

    passwordType () {
      return (this.showPassword) ? 'text' : 'password'
    },

    wrongValue () {
      if (!this.value || !this.registration) {
        return false
      }
      return !patterns.password.test(this.value)
    },

    errorText () {
      if (!this.value || !this.registration) {
        return this.$t('errors.password_required')
      }
      return this.$t('errors.password_validate_message')
    },

    tooltip () {
      if (!this.value) {
        return {
          title: this.$t('enter_password'),
          progressClass: 'password__progress--hidden'
        }
      }
      else if (this.value.length < 9) {
        return {
          title: this.$t('password_is_too_short'),
          text: this.$t('password_is_too_short_message'),
          progressClass: 'password__progress--short'
        }
      }
      else if (this.wrongValue) {
        return {
          title: this.$t('unreliable_password'),
          text: this.$t('unreliable_password_message'),
          progressClass: 'password__progress--unreliable'
        }
      }
      return {
        title: this.$t('secure_password'),
        progressClass: 'password__progress--secure'
      }
    }
  },

  mounted () {
    this.form = this.$el.closest('form')
    if (this.form) {
      this.form.addEventListener('submit', this.validate)
    }
  },

  destroyed () {
    if (this.form) {
      this.form.removeEventListener('submit', this.validate)
    }
  },

  methods: {
    togglePasswordState () {
      this.showPassword = !this.showPassword
    },

    toggleTooltip (value) {
      this.showTooltip = value
    },

    validate () {
      this.hasError = !this.value || this.wrongValue
      this.$emit('validate', !this.hasError)
      this.toggleTooltip(false)
    }
  }
}
</script>

<style lang="stylus" scoped>
.password
  position: relative
  width: 100%

  &__toggle
    position: absolute
    top: 32px
    right: 0
    width: 16px
    height: 16px

  &__icon
    position: absolute
    top: 0
    right: 0
    display: inline-block
    width: 100%
    height: 100%
    background: url(../icons/eye.png) no-repeat center

    &--closed
      background: url(../icons/eye-closed.png) no-repeat center

  &__tooltip
    position: absolute
    top: 0
    left: calc(100% + 20px)
    width: 240px
    padding: 15px 20px
    background-color: $white
    box-shadow: 0 4px 20px rgba($black, 0.1);
    border_radius(12px)

    .auth-web-form--tablet &,
    .auth-web-form--mobile &
      top: auto
      right: auto
      bottom: 100%
      left: 0

  &__title
    font-weight: 500

  &__text
    font-size: 12px
    line-height: 130%
    color: $secondary

    &:empty
      display: none

  &__progress
    display: inline-block
    width: 100%
    height: 4px
    background-color: $accent

    &::after
      content: ''
      display: block
      height: 4px

    &--hidden
      display: none

    &--short::after
      width: 25%
      background-color: $negative

    &--unreliable::after
      width: 50%
      background-color: $warning

    &--secure::after
      width: 100%
      background-color: $positive
</style>
