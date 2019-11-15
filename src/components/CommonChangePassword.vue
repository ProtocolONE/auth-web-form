<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ChangePassword',

  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      token: '',
      isChangeStartVisible: true,
      isChangeVerifyVisible: false,
      isChangeCompletedVisible: false,
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
      this.isChangeStartVisible = false;
      this.isChangeVerifyVisible = true;
    },
    isTokenVerified() {
      this.isChangeVerifyVisible = false;
      this.isChangeCompletedVisible = true;
    },
  },

  methods: {
    ...mapActions('ChangePassword', ['changePasswordStart', 'changePasswordVerify']),

    async submitChangePasswordStart() {
      this.$emit('loadingStart');

      await this.changePasswordStart({
        email: this.email,
      });
      this.$emit('loadingEnd');
    },
    async submitChangePasswordVerify() {
      this.$emit('loadingStart');

      await this.changePasswordVerify({
        token: this.token,
        password: this.password,
        repeatPassword: this.repeatPassword,
      });
      this.$emit('loadingEnd');
    },
  },
};
</script>

<template>
  <div class="register-form">
    <base-header level="3">Изменить пароль</base-header>
    <div v-if="isChangeStartVisible">
      <form @submit.prevent="submitChangePasswordStart">
        <div class="register-form__row">
          <BaseTextField
            v-model="email"
            :placeholder="$t('fieldUsernameLabel')"
            :hasError="$isFieldInvalid('username')"
            :errors="$getFieldErrorText('username')"
          />
        </div>
        <div class="register-form__row">
          <BaseErrorText v-if="changeError">Ошибка {{changeError}}</BaseErrorText>
        </div>
        <div class="register-form__controls">
          <base-button type="submit">
            {{ $t('submitSendButtonText') }}
          </base-button>
        </div>
      </form>
    </div>
    <div v-if="isChangeVerifyVisible">
      <form @submit.prevent="submitChangePasswordVerify">
        <div class="register-form__row">
          <BaseTextField
            v-model="token"
            :placeholder="$t('fieldTokenLabel')"
            :hasError="$isFieldInvalid('token')"
            :errors="$getFieldErrorText('token')"
          />
        </div>
        <div class="register-form__row">
          <BaseTextField
            type="password"
            v-model="password"
            :placeholder="$t('fieldPasswordLabel')"
            :hasError="$isFieldInvalid('password')"
            :errors="$getFieldErrorText('password')"
          />
        </div>
        <div class="register-form__row">
          <BaseTextField
            type="password"
            v-model="repeatPassword"
            :placeholder="$t('fieldRepeatPasswordLabel')"
            :hasError="$isFieldInvalid('repeatPassword')"
            :errors="$getFieldErrorText('repeatPassword')"
          />
        </div>
        <div class="register-form__row">
          <BaseErrorText v-if="changeError">Ошибка {{changeError}}</BaseErrorText>
        </div>
        <div class="register-form__controls">
          <base-button type="submit">
            {{ $t('submitVerifyButtonText') }}
          </base-button>
        </div>
      </form>
    </div>
    <div v-if="isChangeCompletedVisible">
      <p>Успешно изменено</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    "fieldUsernameLabel": "Email",
    "fieldPasswordLabel": "Пароль",
    "fieldRepeatPasswordLabel": "Пароль ещё раз",
    "fieldTokenLabel": "Код",
    "submitSendButtonText": "Отправить код",
    "submitVerifyButtonText": "Изменить пароль"
  },
  "en": {
    "fieldUsernameLabel": "Email",
    "fieldPasswordLabel": "Password",
    "fieldRepeatPasswordLabel": "Repeat password",
    "fieldTokenLabel": "Code",
    "submitSendButtonText": "Send code",
    "submitVerifyButtonText": "Change password"
  }
}
</i18n>
