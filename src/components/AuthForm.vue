<script>
import { mapState, mapActions } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'AuthForm',

  data() {
    return {
      username: 'test@test.com',
      password: 'Qweqwe1@',
    };
  },

  computed: {
    ...mapState(['clientID']),
    ...mapState('AuthForm', [
      'authError',
      'isAuthorised',
      'token',
    ]),
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

  mounted() {
    this.reportFormResize();
  },

  methods: {
    ...mapActions(['reportResize', 'setAuthorised', 'setToken', 'setLoading']),
    ...mapActions('AuthForm', ['authoriseWithLogin']),

    async submitAuthForm() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.setLoading(true);
      await this.authoriseWithLogin({
        clientID: this.clientID,
        username: this.username,
        password: this.password,
      });

      this.setToken(this.token);
      this.setAuthorised(this.isAuthorised);
      this.setLoading(false);
    },

    reportFormResize() {
      setTimeout(() => {
        const newFormSize = {
          height: this.$el.offsetHeight,
          width: this.$el.offsetWidth,
        };
        this.reportResize(newFormSize);
      }, 0);
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
    "submitButtonText": "Войти"
  },
  "en": {
    "fieldUsernameLabel": "Username",
    "fieldPasswordLabel": "Password",
    "submitButtonText": "Sign in"
  }
}
</i18n>
