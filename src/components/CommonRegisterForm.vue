<script>
import { mapState, mapActions } from 'vuex';
import { required, email, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'RegisterForm',

  data() {
    return {
      email: '',
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
    email() {
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
    email: {
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
<div class="register-form">
  <BaseHeader level="3">Зарегистрируйтесь</BaseHeader>
  <form @submit.prevent="submitRegisterForm">
    <div class="register-form__row">
      <BaseTextField
        v-model="email"
        :placeholder="$t('fieldUsernameLabel')"
        :hasError="$isFieldInvalid('email')"
        :errors="$getFieldErrorMessages('email')"
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
      <BaseErrorText v-if="registerError">Ошибка регистрации {{registerError}}</BaseErrorText>
    </div>
    <div class="register-form__controls">
      <BaseButton type="submit">
        {{ $t('submitButtonText') }}
      </BaseButton>
    </div>

  </form>
</div>
</template>

<style lang="scss" scoped>
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
