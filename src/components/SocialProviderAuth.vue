<script>
import { mapGetters } from 'vuex';
import qs from 'qs';
import { postMessage, receiveMessages } from '@/postMessage';

export default {
  name: 'SocialProviderAuth',

  data() {
    return {
      openedWindow: null,
      authErrorMessage: '',

      items: [
        {
          text: 'Facebook',
          connection: 'facebook',
        },
        {
          text: 'Google',
          connection: 'google',
        },
        {
          text: 'Twitch',
          connection: 'twitch',
        },
        {
          text: 'VK',
          connection: 'vk',
        },
      ],
    };
  },

  computed: {
    ...mapGetters(['urls', 'redirectUri']),
  },

  mounted() {
    receiveMessages(
      'P1_AUTH_BACKEND',
      {
        SUCCESS: 'success',
        ERROR: 'error',
        LINK: 'link',
      },
      {
        ERROR: (data = {}) => {
          this.authErrorMessage = data.message;
          this.openedWindow.close();
        },
        SUCCESS: (data = {}) => {
          if (!this.openedWindow) {
            return;
          }
          this.openedWindow.close();
          postMessage('REDIRECT_REQUESTED', data.url);
        },
      },
    );
  },

  methods: {
    beginAuth({ connection }) {
      this.authErrorMessage = '';
      const params = qs.stringify({
        connection,
        client_id: '5c221cde5ffa56fdd05257df',
        redirect_uri: this.redirectUri,
        state: '',
      });

      this.openedWindow = window.open(`${this.urls.apiSocialAuthUrl}?${params}`, '_blank');
    },
  },
};
</script>

<template>
  <div class="social-provider-auth">
    <base-header level="3">Авторизироваться через соцсети</base-header>
    <div v-for="item in items" :key="item.value">
      <a href="#" @click="beginAuth(item)">{{item.text}}</a>
    </div>
    <base-error-text v-if="authErrorMessage">
      Ошибка авторизации: {{authErrorMessage}}
    </base-error-text>
  </div>
</template>

<style lang="scss">
.social-provider-auth {
  margin: 20px;
  border: 1px solid #ccc;
  padding: 20px;
}
</style>
