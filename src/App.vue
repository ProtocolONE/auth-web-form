<script>
import { mapState, mapActions } from 'vuex';
import AuthForm from './components/AuthForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import UserinfoView from './components/UserinfoView.vue';
import LocaleChanger from './components/LocaleChanger.vue';
import SocialProviderAuth from './components/SocialProviderAuth.vue';
import { postMessage } from './postMessage';

export default {
  name: 'App',
  components: {
    LocaleChanger,
    AuthForm,
    RegisterForm,
    UserinfoView,
    SocialProviderAuth,
  },

  data() {
    return {
      goRegister: false,
    };
  },

  computed: {
    ...mapState([
      'isLoading',
      'isAuthorised',
      'isRegistered',
    ]),
  },


  mounted() {
    this.reportAppResize();
    postMessage('LOADED');
  },

  methods: {
    ...mapActions(['reportResize']),

    reportAppResize() {
      setTimeout(() => {
        const size = {
          height: this.$el.offsetHeight,
          width: this.$el.offsetWidth,
        };
        postMessage('FORM_RESIZE', size);
      }, 0);
    },

    recreateOrder() {
      postMessage('ORDER_RECREATE_STARTED');
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
      <LocaleChanger class="app-head__locale-changer" />
    </div>
    <AuthForm v-if="!goRegister && !isAuthorised" />
    <RegisterForm v-if="goRegister && !isRegistered" />

    <div class="app__message" v-if="isRegistered">
      <h3>Вы успешно зарегистрированы</h3>
    </div>

    <UserinfoView v-if="isAuthorised || isRegistered" />
    <div class="app__footer">
      <a
        v-if="goRegister && !isRegistered"
        href="#"
        @click.prevent="goRegister = false"
      >
        У меня уже есть учётная запись
      </a>
      <a v-if="!goRegister && !isAuthorised" href="#" @click.prevent="goRegister = true">
        Нет учётной записи? Зарегистрируйтесь!
      </a>
    </div>

    <SocialProviderAuth />

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
