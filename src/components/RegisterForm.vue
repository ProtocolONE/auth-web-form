<script>
import { mapState, mapActions } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'RegisterForm',

  data() {
    return {
      username: '',
      password: '',
    };
  },

  computed: {
    ...mapState(['clientID']),
    ...mapState('RegisterForm', [
      'token',
      'registerError',
      'isRegistered',
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
    ...mapActions(['reportResize', 'setRegistered', 'setToken', 'setLoading']),
    ...mapActions('RegisterForm', ['registerWithEmail']),

    async submitRegisterForm() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.setLoading(true);

      await this.registerWithEmail({
        clientID: this.clientID,
        username: this.username,
        password: this.password,
      });

      this.setToken(this.token);
      this.setRegistered(this.isRegistered);
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
    "fieldUsernameLabel": "Имя пользователя",
    "fieldPasswordLabel": "Пароль",
    "submitButtonText": "Зарегистрироваться"
  },
  "en": {
    "fieldUsernameLabel": "Username",
    "fieldPasswordLabel": "Password",
    "submitButtonText": "Sign up"
  }
}
</i18n>
