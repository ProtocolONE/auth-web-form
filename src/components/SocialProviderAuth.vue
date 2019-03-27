<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SocialProviderAuth',

  data() {
    return {
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
      profilesLinkingPassword: '',
      profilesLinkingAction: 'link',
    };
  },

  computed: {
    ...mapState('SocialAuth', ['stage', 'token', 'email', 'errorMessage']),
  },

  watch: {
    errorMessage() {
      this.$emit('requestAppResize');
    },
    stage(value) {
      this.$emit('requestAppResize');

      if (value === 'requestLinking') {
        this.$emit('requestLinking');
      }

      if (value === 'success') {
        this.$emit('success', {
          token: this.token,
          isAuthorised: true,
        });
      }
    },
  },

  mounted() {
    this.initState();
  },

  methods: {
    ...mapActions('SocialAuth', ['initState', 'beginSocialAuth', 'linkProfiles']),
  },
};
</script>

<template>
  <div class="social-provider-auth">
    <div v-if="stage === 'initial'">
      <base-header level="3">Авторизироваться через соцсети</base-header>
      <div v-for="item in items" :key="item.value">
        <a href="#" @click="beginSocialAuth(item)">{{item.text}}</a>
      </div>
    </div>

    <div v-if="stage === 'requestLinking'">
      <base-header level="3">А мы ваш профиль нашли</base-header>
      <p>
        В системе уже есть профиль для <b>{{email}}</b>,
        который сопадает с вашим email из соцсети.
      </p>
      <p>Хотите их объединить?</p>
      <div>
        <label>
          <input type="radio" value="link" v-model="profilesLinkingAction">
          Да, объединить
        </label>
      </div>
      <div>
        <label>
          <input type="radio" value="new" v-model="profilesLinkingAction">
          Нет, просто авторизировать через соцсеть
        </label>
      </div>

      <BaseTextField
        v-if="profilesLinkingAction === 'link'"
        v-model="profilesLinkingPassword"
        type="password"
        placeholder="Ваш пароль в нашей системе"/>

      <base-button
        @click="linkProfiles({action: profilesLinkingAction, password: profilesLinkingPassword})"
      >
        Продолжить
      </base-button>

    </div>

    <base-error-text v-if="errorMessage">
      Ошибка: {{errorMessage}}
    </base-error-text>

  </div>
</template>

<style lang="scss">
  .social-provider-auth {
    margin: 0 20px 20px;
    border: 1px solid #ccc;
    padding: 20px;
  }
</style>
