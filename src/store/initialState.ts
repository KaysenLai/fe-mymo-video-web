const myProfile = {
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
const idProfile = {
  ...myProfile,
  isFollowing: false,
  isMyself: false,
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
    successMessage: '',
    errorMessage: '',
  },
  profile: {
    isLoading: false,
    myProfile: myProfile,
    idProfile: idProfile,
  },
  star: [],
  video: {
    videoList: [],
    videoIndex: 0,
    currentVideo: {},
  },
};

export default initialSate;
