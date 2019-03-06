<script>
import { mapState, mapActions } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'AuthForm',

  data() {
    return {
      username: 'test@test.com',
      password: 'Qweqwe1@',
      remember: '',
    };
  },

  computed: {
    ...mapState('AuthForm', [
      'authError',
      'isAuthorised',
      'token',
    ]),
  },

  watch: {
    username() {
      this.$emit('requestAppResize');
    },
    password() {
      this.$emit('requestAppResize');
    },
    remember() {
      this.$emit('requestAppResize');
    },
    authError() {
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
  },

  methods: {
    ...mapActions('AuthForm', ['authoriseWithLogin']),

    async submitAuthForm() {
      this.$v.$touch();
      this.$emit('requestAppResize');

      if (this.$v.$invalid) {
        return;
      }

      this.$emit('loadingStart');
      await this.authoriseWithLogin({
        username: this.username,
        password: this.password,
        remember: this.remember,
      });

      this.$emit('authResult', {
        token: this.token,
        isAuthorised: this.isAuthorised,
      });
      this.$emit('loadingEnd');
    },
  },
};
</script>

<template>
  <div class="auth-form">
    <base-header level="3">Авторизируйтесь</base-header>
    <form @submit.prevent="submitAuthForm">
      <div class="auth-form__row">
        <BaseTextField
          v-model="username"
          :placeholder="$t('fieldUsernameLabel')"
          :hasError="$isFieldInvalid('username')"
          :errors="$getFieldErrorMessages('username')"
        />
      </div>
      <div class="auth-form__row">
        <BaseTextField
          type="password"
          v-model="password"
          :placeholder="$t('fieldPasswordLabel')"
          :hasError="$isFieldInvalid('password')"
          :errors="$getFieldErrorMessages('password')"
        />
      </div>
      <div class="auth-form__row">
        <BaseCheckbox
          type="checkbox"
          v-model="remember"
        />
      </div>
      <div class="auth-form__row">
        <base-error-text v-if="authError">Ошибка авторизации {{authError}}</base-error-text>
      </div>
      <div class="auth-form__controls">
        <base-button type="submit">
          {{ $t('submitButtonText') }}
        </base-button>
      </div>

    </form>
  </div>
</template>

<style lang="scss">
.auth-form {
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
    "fieldUsernameLabel": "Имя пользователя",
    "fieldPasswordLabel": "Пароль",
    "fieldRememberLabel": "Запомнить меня",
    "submitButtonText": "Войти"
  },
  "en": {
    "fieldUsernameLabel": "Username",
    "fieldPasswordLabel": "Password",
    "fieldRememberLabel": "Remember me",
    "submitButtonText": "Sign in"
  }
}
</i18n>
