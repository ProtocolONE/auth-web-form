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
      const url = await this.autoLogin({ previousLogin: this.previousLogin });
      if (url) {
        this.$router.push(url);
      }
      this.$emit('loadingEnd');
    },
  },
};
</script>

<template>
<div class="auto-login-form">
  <UiPageHeader>
    <template slot="title">
      {{ $t('PaySuper.PaySuperAuthLoginForm.title') }}
    </template>
    <template slot="description">
      {{ $t('PaySuper.PaySuperAuthLoginForm.subtitle') }}
    </template>
  </UiPageHeader>
  <UiTextFieldReadonly
    :label="$t('PaySuper.PaySuperAuthLoginForm.previousAccount')"
    :value="previousLogin"
  />

  <form @submit.prevent="submitAutoLoginForm">
    <div class="auto-login-form__controls">
      <UiButton color="transparent-blue" :isTransparent="true" @click="$emit('goAuth')">
        {{ $t('PaySuper.PaySuperAuthLoginForm.useAnotherAccount') }}
      </UiButton>
      <UiButton type="submit">
        {{ $t('PaySuper.PaySuperAuthLoginForm.logInButton') }}
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
