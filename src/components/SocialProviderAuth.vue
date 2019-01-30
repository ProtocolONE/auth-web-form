<script>
import axios from 'axios';
import { apiSocialAuthUrl } from '@/functionalUrls';
import qs from 'qs';

export default {
  name: 'SocialProviderAuth',

  methods: {
    async goFacebook() {
      const params = qs.stringify({
        client_id: '5c221cde5ffa56fdd05257df',
        connection: 'facebook',
        redirect_uri: 'http://localhost:8080/?auth=success',
        state: '',
      });
      const lol = await axios.get(`${apiSocialAuthUrl}?${params}`);

      console.log(11111, 'lol', lol);
    },
  },
};
</script>

<template>
  <div class="social-provider-auth">
    <base-header level="3">Авторизироваться через соцсети</base-header>
    <a href="#" @click.prevent="goFacebook">Facebook</a>
  </div>
</template>

<style lang="scss">
.social-provider-auth {
  margin: 20px;
  border: 1px solid #ccc;
  padding: 20px;
}
</style>
