<script>
import { mapState, mapActions } from 'vuex';
import CommonAuthForm from '@/components/CommonAuthForm.vue';
import CommonRegisterForm from '@/components/CommonRegisterForm.vue';
import CommonAutoLoginForm from '@/components/CommonAutoLoginForm.vue';
import LocaleChanger from '@/components/LocaleChanger.vue';
import CommonSocialProviderAuth from '@/components/CommonSocialProviderAuth.vue';
import CommonChangePassword from '@/components/CommonChangePassword.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import { postMessage } from '@/postMessage';

export default {
  name: 'Common',
  components: {
    LocaleChanger,
    CommonAuthForm,
    CommonAutoLoginForm,
    CommonRegisterForm,
    CommonSocialProviderAuth,
    CommonChangePassword,
    BaseHeader,
  },

  data() {
    return {
      isAuthorised: false,
      isRegistered: false,
      isLoginCommonAuthFormVisible: true,
      isCommonAutoLoginFormVisible: false,
      isCommonRegisterFormVisible: false,
      isSocialCommonAuthFormVisible: false,
      isCommonChangePasswordVisible: false,
    };
  },

  computed: {
    ...mapState([
      'isModal',
      'isLoading',
      'previousLogin',
      'mode',
      'socialProviders',
    ]),
  },

  watch: {
    isAuthorised() {
      this.reportAppResize();
    },
    isRegistered() {
      this.reportAppResize();
    },
    isLoginCommonAuthFormVisible() {
      this.reportAppResize();
    },
    isCommonRegisterFormVisible() {
      this.reportAppResize();
    },
    isSocialCommonAuthFormVisible() {
      this.reportAppResize();
    },
    isCommonChangePasswordVisible() {
      this.reportAppResize();
    },
  },

  mounted() {
    this.reportAppResize();
    postMessage('LOADED');

    if (this.previousLogin !== '' && this.previousLogin !== undefined) {
      this.isLoginCommonAuthFormVisible = false;
      this.isSocialCommonAuthFormVisible = false;
      this.isCommonAutoLoginFormVisible = true;
    } else if (this.mode === 'changePassword') {
      this.isLoginCommonAuthFormVisible = false;
      this.isSocialCommonAuthFormVisible = false;
      this.isCommonChangePasswordVisible = true;
    } else {
      this.isSocialCommonAuthFormVisible = this.socialProviders.length > 0;
    }
  },

  methods: {
    ...mapActions([
      'setToken', 'setLoading', 'reportResize', 'logout',
    ]),

    reportAppResize() {
      setTimeout(() => {
        const size = {
          height: this.$el.offsetHeight,
          width: this.$el.offsetWidth,
        };
        postMessage('FORM_RESIZE', size);
      }, 0);
    },

    goAuth() {
      this.isLoginCommonAuthFormVisible = true;
      this.isSocialCommonAuthFormVisible = this.socialProviders.length > 0;
      this.isCommonRegisterFormVisible = false;
      this.isCommonAutoLoginFormVisible = false;
    },

    goRegister() {
      this.isLoginCommonAuthFormVisible = false;
      this.isSocialCommonAuthFormVisible = false;
      this.isCommonRegisterFormVisible = true;
      this.isCommonAutoLoginFormVisible = false;
    },

    handleAuthOrRegisterResult({ isRegistered, isAuthorised, token }) {
      this.setToken(token);
      if (isAuthorised) {
        this.isAuthorised = true;
      }
      if (isRegistered) {
        this.isRegistered = true;
      }

      if (isAuthorised || isRegistered) {
        this.isLoginCommonAuthFormVisible = false;
        this.isCommonRegisterFormVisible = false;
        this.isSocialCommonAuthFormVisible = false;
        this.isCommonAutoLoginFormVisible = false;
      }
    },

    handleRequestLinking() {
      this.isLoginCommonAuthFormVisible = false;
    },
  },
};
</script>

<template>
<div class="app view-common">
  <div class="app__loading" v-if="isLoading">
    <IconLoadingAnimated/>
  </div>
  <div class="app-head">
    <LocaleChanger
      class="app-head__locale-changer"
      :class="{_modal: isModal}"
    />
  </div>
  <CommonAuthForm
    v-if="isLoginCommonAuthFormVisible"
    @requestAppResize="reportAppResize"
    @loadingStart="setLoading(true)"
    @loadingEnd="setLoading(false)"
    @authResult="handleAuthOrRegisterResult"
  />
  <CommonRegisterForm
    v-if="isCommonRegisterFormVisible"
    @requestAppResize="reportAppResize"
    @loadingStart="setLoading(true)"
    @loadingEnd="setLoading(false)"
    @registerResult="handleAuthOrRegisterResult"
  />
  <CommonAutoLoginForm
    v-if="isCommonAutoLoginFormVisible"
    @requestAppResize="reportAppResize"
    @loadingStart="setLoading(true)"
    @loadingEnd="setLoading(false)"
    @authResult="handleAuthOrRegisterResult"
  />
  <CommonChangePassword
    v-if="isCommonChangePasswordVisible"
    @requestAppResize="reportAppResize"
    @loadingStart="setLoading(true)"
    @loadingEnd="setLoading(false)"
  />
  <div class="app__message" v-if="isRegistered">
    <BaseHeader level="3">Вы успешно зарегистрированы</BaseHeader>
  </div>

  <div class="app__message" v-if="isAuthorised">
    <BaseHeader level="3">Вы авторизированы</BaseHeader>
  </div>

  <CommonSocialProviderAuth
    v-if="isSocialCommonAuthFormVisible"
    @requestAppResize="reportAppResize"
    @loadingStart="setLoading(true)"
    @loadingEnd="setLoading(false)"
    @requestLinking="handleRequestLinking"
    @success="handleAuthOrRegisterResult"
  />

  <div class="app__footer">
    <a v-if="isCommonAutoLoginFormVisible" href="#" @click.prevent="goAuth">
      Использовать другую учетную запись
    </a>
    <a v-if="isCommonRegisterFormVisible" href="#" @click.prevent="goAuth">
      У меня уже есть учётная запись
    </a>
    <a v-if="isLoginCommonAuthFormVisible" href="#" @click.prevent="goRegister">
      Нет учётной записи? Зарегистрируйтесь!
    </a>
  </div>

  <!-- <button @click="logout">Logout</button> -->

</div>
</template>

<style lang="scss">
.view-common {
  * {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h5 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>

<style lang="scss" scoped>
.app {
  width: 360px;
  margin: 0 auto;
  position: relative;
  background: $ui-color-white;
  border: 1px solid $ui-color-grey87;
  box-sizing: border-box;
  color: $ui-color-grey13;
  font-family: $ui-font-family-common;
  font-size: 13px;
  line-height: 16px;

  // @include onBreakpoint("s") {
  //   width: 320px;
  // }

  &__loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  &__message {
    padding: 20px;

    p {
      margin: 10px 0;
    }
  }

  &__footer {
    padding: 0 20px 20px;
  }
}

.app-head {
  height: 30px;
  position: relative;

  &__locale-changer {
    position: absolute;
    right: 20px;
    top: 10px;

    &._modal {
      right: 60px;
      top: 18px;
    }
  }
}
</style>
