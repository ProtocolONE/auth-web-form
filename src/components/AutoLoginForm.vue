<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AutoLoginForm',

  data() {
    return {};
  },

  computed: {
    ...mapState('AuthForm', [
      'authError',
      'previousLogin',
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
      await this.autoLogin({});
      this.$emit('loadingEnd');
    },
  },
};
</script>

<template>
    <div class="auth-form">
        <base-header level="3">Войти используя аккаунт</base-header>
        <p>{{previousLogin}}</p>
        <form @submit.prevent="submitAutoLoginForm">
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
    "submitButtonText": "Войти"
    },
    "en": {
    "submitButtonText": "Sign in"
    }
    }
</i18n>
