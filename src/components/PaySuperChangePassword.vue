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
      <template slot="title">Password Reset</template>
      <template slot="description">
        We will send you an email with reset code.
      </template>
    </UiPageHeader>

    <form @submit.prevent="submitChangePasswordStart">
      <UiTextField
        v-model="email"
        label="Email"
        :hasError="$isFieldInvalid('email')"
        :errorText="$getFieldErrorText('email')"
      />
      <UiErrorText v-if="changeError">{{changeError}}</UiErrorText>
      <div class="register-form__controls">
        <UiButton color="transparent-blue" :isTransparent="true" @click="goBack">
          Log in
        </UiButton>
        <UiButton type="submit" :disabled="!email">
          Send code
        </UiButton>
      </div>
    </form>
  </template>

  <template v-if="step === 'change'">
    <UiPageHeader>
      <template slot="title">New Password</template>
      <template slot="description">
        The password must contain at least <b>6 characters,
        including<br/> latin letters and at least one digit</b>.
      </template>
    </UiPageHeader>
    <form @submit.prevent="submitChangePasswordVerify">
      <UiTextField
        v-model="token"
        :label="$t('fieldTokenLabel')"
        :hasError="$isFieldInvalid('token')"
        :errorText="$getFieldErrorText('token')"
        autocomplete="new-password"
      />
      <UiTextField
        type="password"
        v-model="password"
        :label="$t('fieldPasswordLabel')"
        :hasError="$isFieldInvalid('password')"
        :errorText="$getFieldErrorText('password')"
        autocomplete="new-password"
      />
      <UiErrorText v-if="changeError">{{changeError}}</UiErrorText>
      <div class="register-form__controls">
        <UiButton color="transparent-blue" :isTransparent="true" @click="goBack">
          Log in
        </UiButton>
        <UiButton type="submit">
          {{ $t('submitVerifyButtonText') }}
        </UiButton>
      </div>
    </form>
  </template>
  <template v-if="step === 'complete'">
    <UiPageHeader>
      <PictureExcellentWork slot="picture" />
      <template slot="title">Password has been reset</template>
      <template slot="description">
        You may log in now with your new password.
      </template>
    </UiPageHeader>
    <div class="register-form__controls _center">
      <UiButton @click="goBack">
        Log in
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

<i18n>
{
  "ru": {
    "fieldUsernameLabel": "Email",
    "fieldPasswordLabel": "Новый Пароль",
    "fieldRepeatPasswordLabel": "Пароль ещё раз",
    "fieldTokenLabel": "Код",
    "submitSendButtonText": "Отправить код",
    "submitVerifyButtonText": "Установить пароль"
  },
  "en": {
    "fieldUsernameLabel": "Email",
    "fieldPasswordLabel": "New Password",
    "fieldRepeatPasswordLabel": "Repeat password",
    "fieldTokenLabel": "Code",
    "submitSendButtonText": "Send code",
    "submitVerifyButtonText": "Set Password"
  }
}
</i18n>
