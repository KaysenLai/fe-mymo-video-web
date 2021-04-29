import jwt from 'jsonwebtoken';

const getLocalLogin = () => {
  const token = sessionStorage.getItem('token');
  if (!token) return null;
  const secret = process.env.REACT_APP_JWT_SECRET;

  try {
    const decoded = secret && jwt.verify(token, secret);
    // @ts-ignore
    const exp = decoded?.exp;
    if (!exp) return null;

    const isExpired = Date.now() - exp * 1000 > 0;
    if (isExpired) return null;

    return {
      isAuthenticated: true,
      isLoading: false,
      errorMessage: '',
      token,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default getLocalLogin;
