const IS_DEV = (process.env.NODE_ENV !== 'production')

export default {
  /**
   * Auth1 api url
   * Getting from <script> in auth1 template body
   *
   * @type {string}
   */
  apiURL: IS_DEV ? process.env.AUTH_API_URL : window.AUTH_API_URL,

  /**
   * Current auth1 step (view)
   * Getting from <script> in auth1 template body
   *
   * @type {string}
   */
  view: IS_DEV ? process.env.AUTH_VIEW : window.AUTH_VIEW, // --- TODO: other views

  /**
   * Auth1 hydra challenge id
   * Getting from <script> in auth1 template body
   *
   * @type {string}
   */
  challengeID: IS_DEV ? process.env.CHALLENGE_ID : window.AUTH_FORM_DATA.challenge,

  /**
   * Auth1 social list
   * Getting from <script> in auth1 template body
   *
   * @type {Array}
   */
  socials: IS_DEV ? JSON.parse(process.env.SOCIALS || '[]') : window.AUTH_FORM_DATA.socialProviders,

  /**
   * Auth1 scopes for contest
   * Getting from <script> in auth1 template body
   *
   * @type {Array}
   */
  scopes: IS_DEV ? JSON.parse(process.env.AUTH_SCOPES || '[]') : window.AUTH_SCOPES,

  /**
   * Auth1 scopes error
   * Getting from <script> in auth1 template body
   *
   * @type {null}
   */
  scopesError: window.AUTH_SCOPES_ERROR,

  /**
   * Header title
   *
   * @type {string}
   */
  title: 'Protocol One',

  /**
   * Server errors list
   *
   * @type {Object}
   */
  serverErrors: {}
}
