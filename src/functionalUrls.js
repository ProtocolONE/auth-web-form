export const apiUrl = window.AUTH_API_URL || 'https://auth1.eu.gamenet.ru';

export const apiLoginUrl = `${apiUrl}/login`;
export const apiUserinfoUrl = `${apiUrl}/userinfo`;
export const apiRegisterUrl = `${apiUrl}/signup`;
export const apiSocialAuthUrl = `${apiUrl}/authorize`;

export default {
  apiUrl,
  apiLoginUrl,
  apiUserinfoUrl,
  apiRegisterUrl,
  apiSocialAuthUrl,
};
