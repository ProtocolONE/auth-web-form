<script>
import { mapState, mapActions } from 'vuex';
import AuthForm from './components/AuthForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import AutoLoginForm from './components/AutoLoginForm.vue';
import LocaleChanger from './components/LocaleChanger.vue';
import SocialProviderAuth from './components/SocialProviderAuth.vue';
import { postMessage } from './postMessage';

export default {
  name: 'App',
  components: {
    LocaleChanger,
    AuthForm,
    AutoLoginForm,
    RegisterForm,
    SocialProviderAuth,
  },

  data() {
    return {
      isAuthorised: false,
      isRegistered: false,
      isLoginAuthFormVisible: true,
      isAutoLoginFormVisible: false,
      isRegisterFormVisible: false,
      isSocialAuthFormVisible: true,
    };
  },

  computed: {
    ...mapState([
      'isModal',
      'isLoading',
      'previousLogin',
    ]),
  },

  watch: {
    isAuthorised() {
      this.reportAppResize();
    },
    isRegistered() {
      this.reportAppResize();
    },
    isLoginAuthFormVisible() {
      this.reportAppResize();
    },
    isRegisterFormVisible() {
      this.reportAppResize();
    },
    isSocialAuthFormVisible() {
      this.reportAppResize();
    },
  },

  mounted() {
    this.reportAppResize();
    postMessage('LOADED');
    if (this.previousLogin !== '') {
      this.isLoginAuthFormVisible = false;
      this.isSocialAuthFormVisible = false;
      this.isAutoLoginFormVisible = true;
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
      this.isLoginAuthFormVisible = true;
      this.isSocialAuthFormVisible = true;
      this.isRegisterFormVisible = false;
      this.isAutoLoginFormVisible = false;
    },

    goRegister() {
      this.isLoginAuthFormVisible = false;
      this.isSocialAuthFormVisible = false;
      this.isRegisterFormVisible = false;
      this.isAutoLoginFormVisible = true;
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
        this.isLoginAuthFormVisible = false;
        this.isRegisterFormVisible = false;
        this.isSocialAuthFormVisible = false;
        this.isAutoLoginFormVisible = false;
      }
    },

    handleRequestLinking() {
      this.isLoginAuthFormVisible = false;
    },
  },
};
</script>

<template>
    <div class="app">
        <div class="app__loading" v-if="isLoading">
            <IconLoadingAnimated/>
        </div>
        <div class="app-head">
            <LocaleChanger
                    class="app-head__locale-changer"
                    :class="{_modal: isModal}"
            />
        </div>
        <AuthForm
                v-if="isLoginAuthFormVisible"
                @requestAppResize="reportAppResize"
                @loadingStart="setLoading(true)"
                @loadingEnd="setLoading(false)"
                @authResult="handleAuthOrRegisterResult"
        />
        <RegisterForm
                v-if="isRegisterFormVisible"
                @requestAppResize="reportAppResize"
                @loadingStart="setLoading(true)"
                @loadingEnd="setLoading(false)"
                @registerResult="handleAuthOrRegisterResult"
        />
        <AutoLoginForm
                v-if="isAutoLoginFormVisible"
                @requestAppResize="reportAppResize"
                @loadingStart="setLoading(true)"
                @loadingEnd="setLoading(false)"
                @authResult="handleAuthOrRegisterResult"
        />
        <div class="app__message" v-if="isRegistered">
            <base-header level="3">Вы успешно зарегистрированы</base-header>
        </div>

        <div class="app__message" v-if="isAuthorised">
            <base-header level="3">Вы авторизированы</base-header>
        </div>

        <SocialProviderAuth
                v-if="isSocialAuthFormVisible"
                @requestAppResize="reportAppResize"
                @loadingStart="setLoading(true)"
                @loadingEnd="setLoading(false)"
                @requestLinking="handleRequestLinking"
                @success="handleAuthOrRegisterResult"
        />

        <div class="app__footer">
            <a v-if="isAutoLoginFormVisible" href="#" @click.prevent="goAuth">
                Использовать другую учетную запись
            </a>
            <a v-if="isRegisterFormVisible" href="#" @click.prevent="goAuth">
                У меня уже есть учётная запись
            </a>
            <a v-if="isLoginAuthFormVisible" href="#" @click.prevent="goRegister">
                Нет учётной записи? Зарегистрируйтесь!
            </a>
        </div>

        <!-- <button @click="logout">Logout</button> -->

    </div>
</template>

<style lang="scss">
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


<style lang="scss">
    body {
        margin: 0;

        &.inside-iframe {
            overflow: hidden;
        }
    }

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
</style>
