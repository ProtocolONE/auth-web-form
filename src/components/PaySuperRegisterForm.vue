<script>
import { mapState, mapActions } from 'vuex';
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'PaySuperRegisterForm',

  data() {
    return {
      email: '',
      password: '',
      eula: false,
    };
  },

  computed: {
    ...mapState('RegisterForm', [
      'registerError',
    ]),

    eulaErrorText() {
      if (this.$v.eula.$error) {
        return this.$t('PaySuper.PaySuperRegisterForm.eulaError');
      }
      return '';
    },
  },

  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
      hasDigits: value => /[0-9]/.test(value),
      hasUppercase: value => value.toLowerCase() !== value,
    },
    eula: {
      checked: value => value === true,
    },
  },

  methods: {
    ...mapActions('RegisterForm', ['registerWithEmail']),

    async submitRegisterForm() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.$emit('loadingStart');

      const url = await this.registerWithEmail({
        email: this.email,
        password: this.password,
        remember: true,
      });
      if (url) {
        window.location.replace(url);
      }
      this.$emit('loadingEnd');
    },
  },
};
</script>

<template>
<div class="register-form">
  <UiPageHeader>
    <template slot="title">
      {{ $t('PaySuper.PaySuperRegisterForm.title') }}
    </template>
    <template slot="description">
      {{ $t('PaySuper.PaySuperRegisterForm.subtitle') }}
    </template>
  </UiPageHeader>
  <form @submit.prevent="submitRegisterForm">
    <UiTextField
      v-model="email"
      name="email"
      :label="$t('PaySuper.PaySuperRegisterForm.fieldUsernameLabel')"
      :hasError="$isFieldInvalid('email')"
      :errorText="$getFieldErrorText('email')"
      autocomplete="new-password"
    />
    <UiTextField
      type="password"
      name="password"
      v-model="password"
      :label="$t('PaySuper.PaySuperRegisterForm.fieldPasswordLabel')"
      :hasError="$isFieldInvalid('password')"
      :errorText="$getFieldErrorText('password')"
      autocomplete="new-password"
    />
    <div class="info">
      <IconInfo />
      <p class="info__text">
        {{ $t('PaySuper.PaySuperRegisterForm.info') }}
      </p>
    </div>
    <div>
      <UiCheckbox v-model="eula">
        {{ $t('PaySuper.PaySuperRegisterForm.eulaAccepted') }}
        <a href="https://pay.super.com/policy/eula" target="_blank">
          {{ $t('PaySuper.PaySuperRegisterForm.userAgreement') }}
        </a>
      </UiCheckbox>
    </div>
    <UiErrorText
      class="error"
      v-if="registerError"
      v-text="registerError"
    />
    <UiErrorText
      class="error"
      v-if="eulaErrorText"
      v-text="eulaErrorText"
    />
    <div class="register-form__controls">
      <UiButton color="transparent-blue" :isTransparent="true" @click="$emit('goAuth')">
        {{ $t('PaySuper.PaySuperRegisterForm.logInButton') }}
      </UiButton>
      <UiButton type="submit">
        {{ $t('PaySuper.PaySuperRegisterForm.signUpButton') }}
      </UiButton>
    </div>

  </form>
</div>
</template>

<style lang="scss" scoped>
.register-form {
  position: relative;

  &__controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 48px;
  }
}

.info {
  position: relative;
  margin: 22px 0;

  & > svg {
    position: absolute;
    left: 0px;
    top: 2px;
  }
  &__text {
    margin-left: 22px;
  }
}

.error {
  margin-top: 3px;
}
</style>
