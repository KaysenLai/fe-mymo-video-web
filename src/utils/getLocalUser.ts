import jwt from 'jsonwebtoken';

const getLocalUser = () => {
  const localUser = JSON.parse(sessionStorage.getItem('user') as string);
  if (!localUser) return null;

  const secret = process.env.REACT_APP_JWT_SECRET;
  const token = localUser.token;

  try {
    const isGoogleToken = token.length > 500;
    let decoded;
    if (isGoogleToken) {
      decoded = jwt.decode(token);
    } else {
      decoded = secret && jwt.verify(localUser.token, secret);
    }

    // @ts-ignore
    const exp = decoded?.exp;
    if (!exp) return null;

    const isExpired = Date.now() - exp * 1000 > 0;
    if (isExpired) return null;

    return {
      isAuthenticated: true,
      isLoading: false,
      errorMessage: '',
      userInfo: localUser,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default getLocalUser;
