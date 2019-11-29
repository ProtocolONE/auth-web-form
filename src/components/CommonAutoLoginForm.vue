<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AutoLoginForm',

  data() {
    return {};
  },

  computed: {
    ...mapState([
      'previousLogin',
    ]),
    ...mapState('AuthForm', [
      'authError',
    ]),
  },

  watch: {
    authError() {
      this.$emit('requestAppResize');
    },
  },

  methods: {
    ...mapActions('AutoLoginForm', ['autoLogin']),

    async submitAutoLoginForm() {
      this.$v.$touch();
      this.$emit('requestAppResize');

      if (this.$v.$invalid) {
        return;
      }

      this.$emit('loadingStart');
      await this.autoLogin({ previousLogin: this.previousLogin });
      this.$emit('loadingEnd');
    },
  },
};
</script>

<template>
  <div class="auth-form">
    <BaseHeader level="3">Войти используя аккаунт</BaseHeader>
    <p>{{previousLogin}}</p>
    <form @submit.prevent="submitAutoLoginForm">
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
    "submitButtonText": "Войти"
  },
  "en": {
    "submitButtonText": "Sign in"
  }
}
</i18n>
