import React from 'react';

export interface Action<T = any> {
  type: string;
  payload?: T;
}

export interface RouteProps {
  component: React.ComponentType<any>;
  exact?: boolean;
  path: string;
  redirectTo?: string;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface GoogleLogin {
  email: string;
  name: string;
  avatar: string;
}

export interface SignUpInfo {
  name: string;
  email: string;
  password: string;
}

export interface ResetInfo {
  token: string;
  password: string;
}

export interface IVideo {
  _id: string;
  description: string;
  video: string;
  cover: string;
  author: IAuthor;
  comment: IComment[];
}
export interface IAuthor {
  _id: string;
  avatar: string;
  name: string;
}
export interface IComment {
  _id: string;
  user: IAuthor;
  text: string;
  time: string;
}
export type IVideoList = IVideo[];
