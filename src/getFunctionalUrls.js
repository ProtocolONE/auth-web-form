export default function getFunctionalUrls(apiUrl = 'https://auth1.eu.gamenet.ru') {
  return {
    apiUrl,
    apiLoginUrl: `${apiUrl}/login`,
    apiUserinfoUrl: `${apiUrl}/userinfo`,
    apiRegisterUrl: `${apiUrl}/signup`,
    apiSocialAuthUrl: `${apiUrl}/authorize`,
    apiLogoutUrl: `${apiUrl}/logout`,
  };
}
