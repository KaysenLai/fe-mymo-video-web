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
    errorMessage: '',
  },
  profile: {
    myProfile: {
      avatar: '',
      description: '',
      following: [],
      follower: [],
      followingNum: 0,
      followerNum: 0,
      video: [],
      likeVideo: [],
      _id: '',
      name: '',
      email: '',
    },
  },
};

export default initialSate;
