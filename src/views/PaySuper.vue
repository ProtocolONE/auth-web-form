<script>
import { mapState, mapActions } from 'vuex';
import PaySuperAuthForm from '@/components/PaySuperAuthForm.vue';
import PaySuperRegisterForm from '@/components/PaySuperRegisterForm.vue';
import PaySuperAutoLoginForm from '@/components/PaySuperAutoLoginForm.vue';
import PaySuperChangePassword from '@/components/PaySuperChangePassword.vue';
import { postMessage } from '@/postMessage';

export default {
  name: 'PaySuper',
  components: {
    PaySuperAuthForm,
    PaySuperAutoLoginForm,
    PaySuperRegisterForm,
    PaySuperChangePassword,
  },

  data() {
    return {
      mainView: 'PaySuperAuthForm',
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

  created() {
    // Starting size. To reduce twitch on load
    this.reportResize({
      width: 448,
      height: 400,
    });
    this.$i18n.locale = 'en';
  },

  mounted() {
    postMessage('LOADED');
    setInterval(this.reportAppResize, 50);

    if (this.previousLogin) {
      this.mainView = 'PaySuperAutoLoginForm';
    } else if (this.mode === 'changePassword') {
      this.mainView = 'PaySuperChangePassword';
    }
  },

  methods: {
    ...mapActions('AuthForm', ['clearAuthError']),
    ...mapActions('RegisterForm', ['clearRegisterError']),
    ...mapActions('ChangePassword', ['clearChangePasswordError']),
    ...mapActions([
      'setToken', 'setLoading', 'reportResize', 'logout',
    ]),

    reportAppResize() {
      const size = {
        height: this.$el.offsetHeight,
        width: this.$el.offsetWidth,
      };
      this.reportResize(size);
    },

    goAuth() {
      this.clearAuthError();
      this.mainView = 'PaySuperAuthForm';
    },

    goRegister() {
      this.clearRegisterError();
      this.mainView = 'PaySuperRegisterForm';
    },

    goChangePassword() {
      this.clearChangePasswordError();
      this.mainView = 'PaySuperChangePassword';
    },
  },
};
</script>

<template>
<div class="app view-paysuper">
  <div class="app__loading" v-if="isLoading">
    <IconLoadingAnimated/>
  </div>
  <compontent
    v-if="mainView"
    :is="mainView"
    @loadingStart="setLoading(true)"
    @loadingEnd="setLoading(false)"
    @goRegister="goRegister"
    @goAuth="goAuth"
    @goChangePassword="goChangePassword"
  />
</div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Quicksand:400,500|Roboto:400,500&display=swap");

.view-paysuper {
  a {
    text-decoration: none;
    color: #3d7bf5;
    transition: color 0.2s ease-out;

    &:hover {
      text-decoration: none;
      color: #78909c;
    }
  }
  input {
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #000;
  }
  p {
    margin: 0;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  label {
    margin: 0;
  }
  form {
    margin: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
}
</style>

<style lang="scss" scoped>
.app {
  width: 448px;
  margin: 0 auto;
  position: relative;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #000000;

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
