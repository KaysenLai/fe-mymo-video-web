export interface MyProfile {
  avatar: string;
  description: string;
  following: [];
  follower: [];
  followingNum: number;
  followerNum: number;
  video: [];
  likeVideo: [];
  _id: string;
  name: string;
  email: string;
}

export interface IdProfile extends MyProfile {
  isMyself: boolean;
  isFollowing: boolean;
}

interface IProfileVideoCard {
  _id: string;
  cover: string;
  video: string;
  likeNum: number;
}
