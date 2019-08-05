import axios from 'axios'
import btoa from 'btoa'

import { EventEmitter } from 'events'
import { stringify } from 'qs'
import { merge, pickBy, identity } from 'lodash-es'

axios.defaults.withCredentials = true
axios.defaults.xsrfCookieName = '_csrf'
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'

class Auth1 extends EventEmitter {
  /**
   *
   * @param {Object} opts - OAuth2 options
   *
   * @param {String} opts.clientID - client id for OAuth2 authentication through Auth1 service
   * @param {String} opts.state - required client state for OAuth2 authentication through Auth1 service
   * @param {String} opts.scope - required client scopes for OAuth2 authentication through Auth1 service
   *
   * @param {Object} opts.urls - required OAuth2 client urls
   *
   * @param {String} opts.urls.api - OAuth2 api url
   * @param {String} opts.urls.redirect - OAuth2 redirect url
   * @param {String} opts.urls.logout - OAuth2 logout url
   */
  constructor (opts) {
    super()
    this.challengeID = null

    this.clientID = opts.clientID
    this.state = opts.state || btoa(this.clientID)
    this.scope = opts.scope
    this.urls = merge({ api: process.env.AUTH_WEB_SDK_ISSUER }, opts.urls)

    console.log(
      this.authURL
    )
  }

  /**
   * Get auth1 form authorization url
   * @returns {string}
   */
  get authURL () {
    let data = pickBy({
      client_id: this.clientID,
      state: this.state,
      redirect_uri: this.urls.redirect,
      scope: this.scope
    }, identity)
    return `${this.urls.api}/login/form?${stringify(data)}`
  }

  /**
   * Update challengeID and returns it
   * @returns {string}
   */
  async getChallenge () {
    let { data: { url } } = await axios.get(this.authURL)
    await axios.get(url)
  }
}

export default new Auth1({
  clientID: '5d3a26b697b0b2007a11df76',
  scope: 'openid,offline',
  urls: {
    redirect: 'http://localhost:3000/callback'
  }
})
