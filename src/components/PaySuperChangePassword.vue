<script>
import { mapState, mapActions } from 'vuex';
import { required, email, minLength } from 'vuelidate/lib/validators';
import PictureExcellentWork from '@/components/PictureExcellentWork.vue';

export default {
  name: 'PaySuperChangePassword',

  components: {
    PictureExcellentWork,
  },

  data() {
    return {
      email: '',
      token: '',
      password: '',
      step: 'start',
    };
  },

  computed: {
    ...mapState('ChangePassword', [
      'changeError',
      'isTokenSent',
      'isTokenVerified',
    ]),
  },

  watch: {
    isTokenSent() {
      this.step = 'change';
    },
    isTokenVerified() {
      this.step = 'complete';
    },
  },

  validations() {
    if (this.step === 'start') {
      return {
        email: {
          required,
          email,
        },
      };
    }

    return {
      token: {
        required,
      },
      password: {
        required,
        minLength: minLength(6),
        hasDigits: value => /[0-9]/.test(value),
        hasUppercase: value => /[A-Z]/.test(value),
      },
    };
  },

  methods: {
    ...mapActions('ChangePassword', ['changePasswordStart', 'changePasswordVerify']),

    async submitChangePasswordStart() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.$emit('loadingStart');
      await this.changePasswordStart({
        email: this.email,
      });
      this.$emit('loadingEnd');
    },
    async submitChangePasswordVerify() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.$emit('loadingStart');
      await this.changePasswordVerify({
        token: this.token,
        password: this.password,
        repeatPassword: this.password,
      });
      this.$emit('loadingEnd');
    },

    goBack() {
      this.step = 'start';
      this.$emit('goAuth');
    },
  },
};
</script>

<template>
<div class="register-form">
  <template v-if="step === 'start'">
    <UiPageHeader>
      <template slot="title">
        {{ $t('PaySuper.PaySuperChangePassword.title') }}
      </template>
      <template slot="description">
        {{ $t('PaySuper.PaySuperChangePassword.subtitle') }}
      </template>
    </UiPageHeader>

    <form @submit.prevent="submitChangePasswordStart">
      <UiTextField
        v-model="email"
        :label="$t('PaySuper.PaySuperChangePassword.emailFieldLabel')"
        :hasError="$isFieldInvalid('email')"
        :errorText="$getFieldErrorText('email')"
      />
      <UiErrorText v-if="changeError">
        {{ changeError }}
      </UiErrorText>
      <div class="register-form__controls">
        <UiButton color="transparent-blue" :isTransparent="true" @click="goBack">
          {{ $t('PaySuper.PaySuperChangePassword.logInButton') }}
        </UiButton>
        <UiButton type="submit" :disabled="!email">
          {{ $t('PaySuper.PaySuperChangePassword.sendCodeButton') }}
        </UiButton>
      </div>
    </form>
  </template>

  <template v-if="step === 'change'">
    <UiPageHeader>
      <template slot="title">
        {{ $t('PaySuper.PaySuperChangePassword.newPasswordTitle') }}
      </template>
      <div
        slot="description"
        v-html="$t('PaySuper.PaySuperChangePassword.newPasswordSubtitle')"
      >
      </div>
    </UiPageHeader>
    <form @submit.prevent="submitChangePasswordVerify">
      <UiTextField
        v-model="token"
        name="token"
        :label="$t('PaySuper.PaySuperChangePassword.fieldTokenLabel')"
        :hasError="$isFieldInvalid('token')"
        :errorText="$getFieldErrorText('token')"
        autocomplete="new-password"
      />
      <UiTextField
        type="password"
        name="password"
        v-model="password"
        :label="$t('PaySuper.PaySuperChangePassword.fieldPasswordLabel')"
        :hasError="$isFieldInvalid('password')"
        :errorText="$getFieldErrorText('password')"
        autocomplete="new-password"
      />
      <UiErrorText v-if="changeError">
        {{ changeError }}
      </UiErrorText>
      <div class="register-form__controls">
        <UiButton color="transparent-blue" :isTransparent="true" @click="goBack">
          {{ $t('PaySuper.PaySuperChangePassword.logInButton') }}
        </UiButton>
        <UiButton type="submit">
          {{ $t('PaySuper.PaySuperChangePassword.submitVerifyButtonText') }}
        </UiButton>
      </div>
    </form>
  </template>
  <template v-if="step === 'complete'">
    <UiPageHeader>
      <PictureExcellentWork slot="picture" />
      <template slot="title">
        {{ $t('PaySuper.PaySuperChangePassword.completeTitle') }}
      </template>
      <template slot="description">
        {{ $t('PaySuper.PaySuperChangePassword.completeSubtitle') }}
      </template>
    </UiPageHeader>
    <div class="register-form__controls _center">
      <UiButton @click="goBack">
        {{ $t('PaySuper.PaySuperChangePassword.logInButton') }}
      </UiButton>
    </div>
  </template>
</div>
</template>

<style lang="scss" scoped>
.register-form {
  position: relative;

  &__controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 48px;

    &._center {
      justify-content: center;
    }
  }
}
</style>
