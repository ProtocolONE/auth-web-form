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

  methods: {
    ...mapActions('AuthForm', ['autoLogin']),

    async submitAutoLoginForm() {
      this.$v.$touch();

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
<div class="auto-login-form">
  <UiPageHeader>
    <template slot="title">Log In</template>
    <template slot="description">
      We are glad to see you again
    </template>
  </UiPageHeader>
  <UiTextFieldReadonly
    label="Previous account"
    :value="previousLogin"
  />

  <form @submit.prevent="submitAutoLoginForm">
    <div class="auto-login-form__controls">
      <UiButton color="transparent-blue" :isTransparent="true" @click="$emit('goAuth')">
        Use another account
      </UiButton>
      <UiButton type="submit">
        {{ $t('submitButtonText') }}
      </UiButton>
    </div>
  </form>
</div>
</template>

<style lang="scss" scoped>
.auto-login-form {
  padding: 20px;
  position: relative;

  &__controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 48px;
  }
}
</style>

<i18n>
{
  "ru": {
    "submitButtonText": "Войти"
  },
  "en": {
    "submitButtonText": "Log in"
  }
}
</i18n>
