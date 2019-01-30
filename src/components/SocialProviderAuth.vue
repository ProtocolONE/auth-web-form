<script>
import { apiSocialAuthUrl } from '@/functionalUrls';
import qs from 'qs';

export default {
  name: 'SocialProviderAuth',

  computed: {
    facebookUrl() {
      const params = qs.stringify({
        client_id: '5c221cde5ffa56fdd05257df',
        connection: 'facebook',
        redirect_uri: 'http://localhost:8080/?auth=success',
        state: '',
      });

      return `${apiSocialAuthUrl}?${params}`;
    },
  },
};
</script>

<template>
  <div class="social-provider-auth">
    <base-header level="3">Авторизироваться через соцсети</base-header>
    <a :href="facebookUrl">Facebook</a>
  </div>
</template>

<style lang="scss">
.social-provider-auth {
  margin: 20px;
  border: 1px solid #ccc;
  padding: 20px;
}
</style>
