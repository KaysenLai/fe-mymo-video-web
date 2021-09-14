import { Action, IVideo, IVideoList } from '../../types';

export const STORE_VIDEO_LIST = 'STORE_VIDEO_LIST';
export const STORE_VIDEO_INDEX = 'STORE_VIDEO_INDEX';
export const STORE_CURRENT_VIDEO = 'STORE_CURRENT_VIDEO';

export const storeVideoList = (videoList: IVideoList): Action<IVideoList> => ({
  type: STORE_VIDEO_LIST,
  payload: videoList,
});

export const storeCurrentVideo = (video: IVideo): Action<IVideo> => ({
  type: STORE_CURRENT_VIDEO,
  payload: video,
});

export const storeVideoIndex = (videoIndex: number): Action<number> => ({
  type: STORE_VIDEO_INDEX,
  payload: videoIndex,
});
