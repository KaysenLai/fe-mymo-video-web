import initialState from '../initialState';
import { Action } from '../../types';
import { STORE_VIDEO_INDEX, STORE_VIDEO_LIST } from '../actions/video';

const videoState = initialState.video;

export const videoReducer = (state = videoState, action: Action) => {
  switch (action.type) {
    case STORE_VIDEO_LIST:
      return { ...state, videoList: action.payload };
    case STORE_VIDEO_INDEX:
      return { ...state, videoIndex: action.payload };
    default:
      return state;
  }
};
