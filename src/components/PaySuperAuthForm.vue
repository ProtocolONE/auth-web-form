<script>
import { mapState, mapActions } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'PaySuperAuthForm',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  computed: {
    ...mapState('AuthForm', [
      'authError',
    ]),
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

      if (this.$v.$invalid) {
        return;
      }

      this.$emit('loadingStart');
      await this.authoriseWithLogin({
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
<div class="auth-form">
  <UiPageHeader>
    <template slot="title">Log In</template>
    <template slot="description">
      We are glad to see you again.
    </template>
  </UiPageHeader>
  <form @submit.prevent="submitAuthForm">
    <UiTextField
      v-model="email"
      label="Email"
      name="email"
      :hasError="$isFieldInvalid('email')"
      :errorText="$getFieldErrorText('email')"
    />
    <UiTextField
      type="password"
      label="Password"
      name="password"
      v-model="password"
      :hasError="$isFieldInvalid('password')"
      :errorText="$getFieldErrorText('password')"
    />
    <div class="links">
      <a href="#" @click.prevent="$emit('goChangePassword')">
        Reset password
      </a>
    </div>
    <UiErrorText v-if="authError">{{authError}}</UiErrorText>
    <div class="auth-form__controls">
      <UiButton color="transparent-blue" :isTransparent="true" @click="$emit('goRegister')">
        {{ $t('goRegisterButton') }}
      </UiButton>
      <UiButton type="submit">
        {{ $t('submitButtonText') }}
      </UiButton>
    </div>
  </form>
</div>
</template>

<style lang="scss" scoped>
.auth-form {
  position: relative;

  &__controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 48px;
  }
}

.links {
  margin-top: 8px;
  padding-left: 12px;
}
</style>

<i18n>
{
  "ru": {
    "fieldUsernameLabel": "Имя пользователя",
    "fieldPasswordLabel": "Пароль",
    "fieldRememberLabel": "Запомнить меня",
    "submitButtonText": "Войти",
    "goRegisterButton": "Регистрация"
  },
  "en": {
    "fieldUsernameLabel": "Username",
    "fieldPasswordLabel": "Password",
    "fieldRememberLabel": "Remember me",
    "submitButtonText": "Log In",
    "goRegisterButton": "Sign up"
  }
}
</i18n>
