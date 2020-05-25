import { IRequestLoginByUsernameData } from '../../../../api';

export const DO_LOGIN = 'login/DO_LOGIN';
export const BEFORE_LOGIN = 'login/BEFORE_LOGIN';
export const DO_REGISTER = 'login/DO_REGISTER';
export const REGISTER_SUCCESS = 'login/REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'login/LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'login/LOGOUT_SUCCESS';
export const DO_LOGOUT = 'login/DO_LOGOUT';

export type DO_LOGIN = typeof DO_LOGIN;
export type BEFORE_LOGIN = typeof BEFORE_LOGIN;
export type DO_REGISTER = typeof DO_REGISTER;
export type REGISTER_SUCCESS = typeof REGISTER_SUCCESS;
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;
export type LOGIN_ERROR = typeof LOGIN_ERROR;
export type DO_LOGOUT = typeof DO_LOGOUT;
export type LOGOUT_SUCCESS = typeof LOGOUT_SUCCESS;

export const constants = {
  NAME: 'login',
};

// action creators

export interface ILoginSuccess {
  payload: any;
  type: LOGIN_SUCCESS;
}
export interface ILoginError {
  payload: any;
  type: LOGIN_ERROR;
}
export interface IRegisterSuccess {
  payload: any;
  type: REGISTER_SUCCESS;
}
export interface ILogoutSuccess {
  payload: any;
  type: LOGOUT_SUCCESS;
}
export interface IBeforLogin {
  payload: any;
  type: BEFORE_LOGIN;
}

export interface ILogin {
  payload: IRequestLoginByUsernameData;
  type: DO_LOGIN;
}
export const login = (data: IRequestLoginByUsernameData): ILogin => {
  return { type: DO_LOGIN, payload: data };
};
export interface IRegister {
  payload: any;
  type: DO_REGISTER;
}
export const register = (data: any): IRegister => {
  return { type: DO_REGISTER, payload: data };
};

export interface ILogout {
  payload: any;
  type: DO_LOGOUT;
}
export const logout = (data: any): ILogout => {
  return { type: DO_LOGOUT, payload: data };
};
export type ILoginActionsTypes =
  | ILogin
  | IRegister
  | ILogout
  | ILoginSuccess
  | ILoginError
  | ILogoutSuccess
  | IBeforLogin
  | IRegisterSuccess;

export type ILoginActionsType = {
  ILogin: ILogin;
  IRegister: IRegister;
  ILogout: ILogout;
  ILoginSuccess: ILoginSuccess;
  ILoginError: ILoginError;
  ILogoutSuccess: ILogoutSuccess;
  IBeforLogin: IBeforLogin;
  IRegisterSuccess: IRegisterSuccess;
};
