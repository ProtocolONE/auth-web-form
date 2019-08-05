<template>
<section class="view view--consent">
  <h2 class="base-title text-center mt-none">{{ $t('please_select_scopes') }}</h2>
  <form id="consent-form" class="view__form form" method="POST">

    <input :value="challengeID" name="challenge" type="hidden" hidden>
    <input
        v-for="scope in mappedScopes"
        v-model="scope.selected"
        :key="`${scope.key}-hidden`"
        :value="scope.name"
        type="checkbox"
        name="scope"
        hidden>

    <label v-for="scope in mappedScopes" :key="scope.key" class="form__ck ck">
      <ui-checkbox v-model="scope.selected"/>
      <span class="ck__label">{{ scope.name }}</span>
    </label>
    <base-button class="form__btn" :label="$t('accept')" type="submit"/>
  </form>
  <base-error v-if="scopesError" :label="scopesError"/>
</section>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import BaseError from '@/components/BaseError'
import { UiCheckbox } from '@protocol-one/ui-kit'

import { mapState, mapActions } from 'vuex'
import { cloneDeep } from 'lodash-es'

export default {
  name: 'ViewConsent',

  components: {
    BaseButton,
    BaseError,
    UiCheckbox
  },

  data () {
    return {
      mappedScopes: []
    }
  },

  computed: {
    ...mapState(['challengeID', 'scopes', 'scopesError']),

    formData () {
      return this.mappedScopes
        .filter(scope => scope.selected)
        .map(scope => scope.name)
    }
  },

  watch: {
    scopes: {
      immediate: true,
      deep: true,
      handler: 'mapScopes'
    }
  },

  methods: {
    ...mapActions(['consent']),

    mapScopes (scopes) {
      this.mappedScopes = cloneDeep(scopes).map(scope => {
        scope.selected = true
        return scope
      })
    }
  }
}
</script>
