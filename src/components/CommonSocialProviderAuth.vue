<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SocialProviderAuth',

  computed: {
    ...mapState('SocialAuth', ['stage', 'token', 'email', 'errorMessage', 'socialProviders']),
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
    <BaseHeader level="3">Авторизироваться через соцсети</BaseHeader>
    <div v-for="item in socialProviders" :key="item.key">
      <a href="#" @click="beginSocialAuth(item)">{{item.name}}</a>
    </div>
  </div>

  <div v-if="stage === 'requestLinking'">
    <BaseHeader level="3">А мы ваш профиль нашли</BaseHeader>
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

    <BaseButton
      @click="linkProfiles({action: profilesLinkingAction, password: profilesLinkingPassword})"
    >
      Продолжить
    </BaseButton>

  </div>

  <BaseErrorText v-if="errorMessage">
    Ошибка: {{errorMessage}}
  </BaseErrorText>

</div>
</template>

<style lang="scss" scoped>
.social-provider-auth {
  margin: 0 20px 20px;
  border: 1px solid #ccc;
  padding: 20px;
}
</style>
