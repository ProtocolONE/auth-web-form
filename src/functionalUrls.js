const apiUrl = window.AUTH_API_URL || 'https://auth1.eu.gamenet.ru';

export default {
  apiUrl,
  apiLoginUrl: `${apiUrl}/login`,
  apiUserinfoUrl: `${apiUrl}/userinfo`,
  apiRegisterUrl: `${apiUrl}/signup`,
};
