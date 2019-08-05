export default {
  /**
   * Get auth1 login url
   *
   * @param apiURL {string}
   * @returns {string}
   */
  getLoginURL: ({ apiURL }) => `${apiURL}/oauth2/login`,

  /**
   * Get auth1 registration url
   *
   * @param apiURL {string}
   * @returns {string}
   */
  getRegistrationURL: ({ apiURL }) => `${apiURL}/oauth2/signup`,

  /**
   * Get auth1 login data
   *
   * @param challengeID {string}
   * @returns {Object}
   */
  getLoginData: ({ challengeID }) => data => ({ ...data, challenge: challengeID, connection: 'password' }),

  /**
   * Get auth1 registration data
   *
   * @param challengeID {string}
   * @returns {Object}
   */
  getRegistrationData: ({ challengeID }) => data => ({ ...data, challenge: challengeID })
}
