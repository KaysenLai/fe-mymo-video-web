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
