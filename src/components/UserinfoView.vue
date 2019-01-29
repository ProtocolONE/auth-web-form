<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UserinfoView',

  data() {
    return {
      username: '',
      password: '',
    };
  },

  computed: {
    ...mapState(['token', 'clientID']),
    ...mapState('Userinfo', [
      'userinfo',
    ]),
  },

  created() {
    this.initState({
      clientID: this.clientID,
      token: this.token,
    });
  },

  methods: {
    ...mapActions('Userinfo', ['initState']),
  },
};
</script>

<template>
  <div class="userinfo-view" v-if="userinfo">
    <h3>Вы вошли как {{userinfo.email}}</h3>
    <p>Ваш email {{userinfo.email_verified ? '' : 'не'}} подтвреждён</p>
  </div>
</template>

<style lang="scss">
.userinfo-view {
  padding: 20px;

  p {
    margin: 10px 0;
  }
}
</style>

<i18n>
{
  "ru": {
  },
  "en": {
  }
}
</i18n>
