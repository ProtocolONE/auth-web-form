export default function getFunctionalUrls(apiUrl = 'https://auth1.tst.protocol.one') {
  return {
    apiUrl,
    apiLoginUrl: `${apiUrl}/oauth2/login`,
    apiUserinfoUrl: `${apiUrl}/oauth2/userinfo`,
    apiRegisterUrl: `${apiUrl}/oauth2/signup`,
    apiSocialAuthUrl: `${apiUrl}/authorize`,
    apiSocialAuthLinkUrl: `${apiUrl}/authorize/link`,
    apiLogoutUrl: `${apiUrl}/oauth2/logout`,
    apiChangePasswordStart: `${apiUrl}/dbconnections/change_password`,
    apiChangePasswordVerify: `${apiUrl}/dbconnections/change_password/verify`,
  };
}
