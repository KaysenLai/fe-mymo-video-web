const initialSate = {
  userLogin: {
    isAuthenticated: false,
    isLoading: false,
    errorMessage: '',
    userInfo: { _id: '', name: '', email: '', token: '', avatar: '' },
    isOAuth: false,
  },
  userSignUp: {
    isLoading: false,
    errorMessage: localStorage.getItem('logInErrorMsg'),
  },
};

export default initialSate;
