const profile = {
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
};

const initialSate = {
  userLogin: {
    isAuthenticated: false,
    isLoading: false,
    errorMessage: '',
    token: '',
    isOAuth: false,
  },
  userSignUp: {
    isLoading: false,
    errorMessage: '',
  },
  profile: {
    isLoading: false,
    myProfile: profile,
    idProfile: profile,
  },
};

export default initialSate;
