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
    <template slot="title">
      {{ $t('PaySuper.PaySuperAuthForm.title') }}
    </template>
    <template slot="description">
      {{ $t('PaySuper.PaySuperAuthForm.subtitle') }}
    </template>
  </UiPageHeader>
  <form @submit.prevent="submitAuthForm">
    <UiTextField
      v-model="email"
      name="email"
      :label="$t('PaySuper.PaySuperAuthForm.emailFieldLabel')"
      :hasError="$isFieldInvalid('email')"
      :errorText="$getFieldErrorText('email')"
    />
    <UiTextField
      type="password"
      name="password"
      v-model="password"
      :label="$t('PaySuper.PaySuperAuthForm.passwordFieldLabel')"
      :hasError="$isFieldInvalid('password')"
      :errorText="$getFieldErrorText('password')"
    />
    <div class="links">
      <a href="#" @click.prevent="$emit('goChangePassword')">
        {{ $t('PaySuper.PaySuperAuthForm.resetPassword') }}
      </a>
    </div>
    <UiErrorText v-if="authError">{{authError}}</UiErrorText>
    <div class="auth-form__controls">
      <UiButton color="transparent-blue" :isTransparent="true" @click="$emit('goRegister')">
        {{ $t('PaySuper.PaySuperAuthForm.signUpButton') }}
      </UiButton>
      <UiButton type="submit">
        {{ $t('PaySuper.PaySuperAuthForm.logInButton') }}
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
}
</style>
