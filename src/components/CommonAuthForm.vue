<script>
import { mapState, mapActions } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'AuthForm',

  data() {
    return {
      email: '',
      password: '',
      remember: '',
    };
  },

  computed: {
    ...mapState('AuthForm', [
      'authError',
    ]),
  },

  watch: {
    email() {
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
    email: {
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
        email: this.email,
        password: this.password,
        remember: this.remember,
      });
      this.$emit('loadingEnd');
    },
  },
};
</script>

<template>
  <div class="auth-form">
    <BaseHeader level="3">Авторизируйтесь</BaseHeader>
    <form @submit.prevent="submitAuthForm">
      <div class="auth-form__row">
        <BaseTextField
          v-model="email"
          :placeholder="$t('fieldUsernameLabel')"
          :hasError="$isFieldInvalid('email')"
          :errors="$getFieldErrorMessages('email')"
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
        <BaseErrorText v-if="authError">Ошибка авторизации {{authError}}</BaseErrorText>
      </div>
      <div class="auth-form__controls">
        <BaseButton type="submit">
          {{ $t('submitButtonText') }}
        </BaseButton>
      </div>

    </form>
  </div>
</template>

<style lang="scss" scoped>
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
