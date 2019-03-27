<script>
import { mapState, mapActions } from 'vuex';
import { required, email, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'RegisterForm',

  data() {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      remember: '',
    };
  },

  computed: {
    ...mapState('RegisterForm', [
      'registerError',
    ]),
  },

  watch: {
    username() {
      this.$emit('requestAppResize');
    },
    password() {
      this.$emit('requestAppResize');
    },
    repeatPassword() {
      this.$emit('requestAppResize');
    },
    registerError() {
      this.$emit('requestAppResize');
    },
  },

  validations: {
    username: {
      required,
      email,
    },

    password: {
      required,
    },

    remember: {},

    repeatPassword: {
      required,
      sameAs: sameAs('password'),
    },
  },

  methods: {
    ...mapActions('RegisterForm', ['registerWithEmail']),

    async submitRegisterForm() {
      this.$v.$touch();
      this.$emit('requestAppResize');

      if (this.$v.$invalid) {
        return;
      }

      this.$emit('loadingStart');

      await this.registerWithEmail({
        username: this.username,
        password: this.password,
        remember: this.remember,
      });
      this.$emit('loadingEnd');
    },
  },
};
</script>

<template>
  <div class="register-form">
    <base-header level="3">Зарегистрируйтесь</base-header>
    <form @submit.prevent="submitRegisterForm">
      <div class="register-form__row">
        <BaseTextField
          v-model="username"
          :placeholder="$t('fieldUsernameLabel')"
          :hasError="$isFieldInvalid('username')"
          :errors="$getFieldErrorMessages('username')"
        />
      </div>
      <div class="register-form__row">
        <BaseTextField
          type="password"
          v-model="password"
          :placeholder="$t('fieldPasswordLabel')"
          :hasError="$isFieldInvalid('password')"
          :errors="$getFieldErrorMessages('password')"
        />
      </div>
      <div class="register-form__row">
        <BaseTextField
          type="password"
          v-model="repeatPassword"
          :placeholder="$t('fieldRepeatPasswordLabel')"
          :hasError="$isFieldInvalid('repeatPassword')"
          :errors="$getFieldErrorMessages('repeatPassword')"
        />
      </div>
      <div class="auth-form__row">
        <BaseCheckbox
          type="checkbox"
          v-model="remember"
        />
      </div>
      <div class="register-form__row">
        <base-error-text v-if="registerError">Ошибка регистрации {{registerError}}</base-error-text>
      </div>
      <div class="register-form__controls">
        <base-button type="submit">
          {{ $t('submitButtonText') }}
        </base-button>
      </div>

    </form>
  </div>
</template>

<style lang="scss">
  .register-form {
    padding: 20px;
    position: relative;

    form {
      margin: 0;
    }

    &__row {
      margin-bottom: 12px;
    }

    &__controls {
    }
  }
</style>

<i18n>
  {
  "ru": {
  "fieldUsernameLabel": "Email",
  "fieldPasswordLabel": "Пароль",
  "fieldRepeatPasswordLabel": "Пароль ещё раз",
  "submitButtonText": "Зарегистрироваться"
  },
  "en": {
  "fieldUsernameLabel": "Email",
  "fieldPasswordLabel": "Password",
  "fieldRepeatPasswordLabel": "Repeat password",
  "submitButtonText": "Sign up"
  }
  }
</i18n>
