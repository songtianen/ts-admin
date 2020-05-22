export const DO_UPDATE_MODULE = 'app/DO_UPDATE_MODULE';
export const UPDATE_MODULE_SUCCESS = 'app/DO_UPDATE_MODULE_SUCCESS';
export const DO_UPDATE_ACCESSMENU = 'app/DO_UPDATE_ACCESSMENU';
export const UPDATE_ACCESSMENU_SUCCESS = 'app/UPDATE_ACCESSMENU_SUCCESS';
export const GET_USERINFO_SUCCESS = 'app/GET_USERINFO_SUCCESS';
export const DO_GET_USERINFO = 'app/DO_GET_USERINFO';
export const DO_INIT_MENU = 'app/DO_INIT_MENU';
export const DO_INIT_APPDATA = 'app/DO_INIT_APPDATA';
export const INIT_APPDATA_SUCCESS = 'app/INIT_APPDATA_SUCCESS';

export type DO_UPDATE_MODULE = typeof DO_UPDATE_MODULE;
export type UPDATE_MODULE_SUCCESS = typeof UPDATE_MODULE_SUCCESS;
export type DO_UPDATE_ACCESSMENU = typeof DO_UPDATE_ACCESSMENU;
export type UPDATE_ACCESSMENU_SUCCESS = typeof UPDATE_ACCESSMENU_SUCCESS;
export type GET_USERINFO_SUCCESS = typeof GET_USERINFO_SUCCESS;
export type DO_GET_USERINFO = typeof DO_GET_USERINFO;
export type DO_INIT_MENU = typeof DO_INIT_MENU;
export type DO_INIT_APPDATA = typeof DO_INIT_APPDATA;
export type INIT_APPDATA_SUCCESS = typeof INIT_APPDATA_SUCCESS;

// Actions
export interface getAccessMenuAction {
  payload: any;
  type: DO_UPDATE_ACCESSMENU;
}
export const getAccessMenuAction = (data: any): getAccessMenuAction => {
  return { type: DO_UPDATE_ACCESSMENU, payload: data };
};
// Actions
export interface getAccessMenuSuccessAction {
  payload: any;
  type: UPDATE_ACCESSMENU_SUCCESS;
}
export const getAccessMenuSuccessAction = (
  data: any,
): getAccessMenuSuccessAction => {
  return { type: UPDATE_ACCESSMENU_SUCCESS, payload: data };
};
// ---
// Actions
export interface updateModuleAction {
  payload: any;
  type: DO_UPDATE_MODULE;
}
export const updateModuleAction = (data: any): updateModuleAction => {
  return { type: DO_UPDATE_MODULE, payload: data };
};
// Actions
export interface updateModuleSucessAction {
  payload: any;
  type: UPDATE_MODULE_SUCCESS;
}
export const updateModuleSucessAction = (
  data: any,
): updateModuleSucessAction => {
  return { type: UPDATE_MODULE_SUCCESS, payload: data };
};
// ---
// Actions
export interface initMenuAction {
  payload: any;
  type: DO_INIT_MENU;
}
export const initMenuAction = (data: any): initMenuAction => {
  return { type: DO_INIT_MENU, payload: data };
};
// Actions
export interface initAppDataAction {
  payload: any;
  type: DO_INIT_APPDATA;
}
export const initAppDataAction = (data: any): initAppDataAction => {
  return { type: DO_INIT_APPDATA, payload: data };
};
// Actions
export interface initAppDataSuccessAction {
  payload: any;
  type: INIT_APPDATA_SUCCESS;
}
export const initAppDataSuccessAction = (
  data: any,
): initAppDataSuccessAction => {
  return { type: INIT_APPDATA_SUCCESS, payload: data };
};
// userActions
// Actions
export interface getUserInfoSuccess {
  payload: any;
  type: GET_USERINFO_SUCCESS;
}
export const getUserInfoSuccess = (data: any): getUserInfoSuccess => {
  return { type: GET_USERINFO_SUCCESS, payload: data };
};
// Actions
export interface getUserInfoAction {
  payload: any;
  type: DO_GET_USERINFO;
}
export const getUserInfoAction = (data: any): getUserInfoAction => {
  return { type: DO_GET_USERINFO, payload: data };
};

export type LayOutActionsType =
  | getAccessMenuAction
  | getAccessMenuSuccessAction
  | updateModuleAction
  | updateModuleSucessAction
  | initMenuAction
  | initAppDataAction
  | initAppDataSuccessAction
  | getUserInfoSuccess
  | getUserInfoAction;
