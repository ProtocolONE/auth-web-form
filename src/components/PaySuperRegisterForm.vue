<script>
import { mapState, mapActions } from 'vuex';
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'RegisterForm',

  data() {
    return {
      email: '',
      password: '',
      eula: false,
    };
  },

  computed: {
    ...mapState('RegisterForm', [
      'registerError',
    ]),

    eulaErrorText() {
      if (this.$v.eula.$error) {
        return 'You must accept the agreement';
      }
      return '';
    },
  },

  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
      hasDigits: value => /[0-9]/.test(value),
      hasUppercase: value => /[A-Z]/.test(value),
    },
    eula: {
      checked: value => value === true,
    },
  },

  methods: {
    ...mapActions('RegisterForm', ['registerWithEmail']),

    async submitRegisterForm() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.$emit('loadingStart');

      await this.registerWithEmail({
        email: this.email,
        password: this.password,
        remember: true,
      });
      this.$emit('loadingEnd');
    },
  },
};
</script>

<template>
<div class="register-form">
  <UiPageHeader>
    <template slot="title">Sign Up</template>
    <template slot="description">
      Hi, we are glad you decided to join us.
    </template>
  </UiPageHeader>
  <form @submit.prevent="submitRegisterForm">
    <UiTextField
      v-model="email"
      :label="$t('fieldUsernameLabel')"
      :hasError="$isFieldInvalid('email')"
      :errorText="$getFieldErrorText('email')"
      autocomplete="new-password"
    />
    <UiTextField
      type="password"
      v-model="password"
      :label="$t('fieldPasswordLabel')"
      :hasError="$isFieldInvalid('password')"
      :errorText="$getFieldErrorText('password')"
      autocomplete="new-password"
    />
    <div class="info">
      <IconInfo />
      <p class="info__text">
        The password must contain at least 6 characters,
        including latin letters and at least one digit.
      </p>
    </div>
    <div>
      <UiCheckbox v-model="eula">
        I read and accept
        <a href="https://pay.super.com/policy/eula" target="_blank">Agreement</a>
      </UiCheckbox>
    </div>
    <UiErrorText v-if="registerError" v-text="registerError" />
    <UiErrorText v-if="eulaErrorText" v-text="eulaErrorText" />
    <div class="register-form__controls">
      <UiButton color="transparent-blue" :isTransparent="true" @click="$emit('goAuth')">
        {{ $t('goAuthButton') }}
      </UiButton>
      <UiButton type="submit">
        {{ $t('submitButtonText') }}
      </UiButton>
    </div>

  </form>
</div>
</template>

<style lang="scss" scoped>
.register-form {
  position: relative;

  &__controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 48px;
  }
}

.info {
  position: relative;
  margin-top: 8px;
  margin-bottom: 22px;

  & > svg {
    position: absolute;
    left: 12px;
    top: 1px;
  }
  &__text {
    margin-left: 38px;
  }
}
</style>

<i18n>
{
  "ru": {
    "fieldUsernameLabel": "Email",
    "fieldPasswordLabel": "Пароль",
    "fieldRepeatPasswordLabel": "Пароль ещё раз",
    "submitButtonText": "Зарегистрироваться",
    "goAuthButton": "Войти"
  },
  "en": {
    "fieldUsernameLabel": "Email",
    "fieldPasswordLabel": "Password",
    "fieldRepeatPasswordLabel": "Repeat password",
    "submitButtonText": "Sign up",
    "goAuthButton": "Log in"
  }
}
</i18n>
