<script>
import { mapGetters } from 'vuex';
import qs from 'qs';
import { receiveMessages } from '@/postMessage';

export default {
  name: 'SocialProviderAuth',

  data() {
    return {
      openedWindow: null,
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
        SUCCESS: (data = {}) => {
          if (!this.openedWindow) {
            return;
          }
          this.openedWindow.close();
          window.location.href = data.url;
        },
      },
    );
  },

  methods: {
    openFacebookAuth() {
      const params = qs.stringify({
        client_id: '5c221cde5ffa56fdd05257df',
        connection: 'facebook',
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
    <a href="#" @click="openFacebookAuth">Facebook</a>
  </div>
</template>

<style lang="scss">
.social-provider-auth {
  margin: 20px;
  border: 1px solid #ccc;
  padding: 20px;
}
</style>
