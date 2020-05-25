import {
  ILoginActionsTypes,
  BEFORE_LOGIN,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
} from './actions';
import { IReduxLoginState } from './types';

// import * as common from "../../redux/constants"; // 公共状态
const initialState: IReduxLoginState = {
  isLogin: false,
  error: '',
  isLogout: false,
};
export default function (state = initialState, action: ILoginActionsTypes) {
  switch (action.type) {
    case BEFORE_LOGIN:
      // 获取用户信息
      // console.log('BEFORE_LOGIN', state);
      return {
        ...state,
        isLogin: false,
        error: '',
      };
    case LOGIN_SUCCESS:
      // 获取用户信息
      return {
        ...state,
        ...action.payload.data,
        isLogout: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload.data,
        isLogin: true,
        isLogout: false,
      };
    case LOGIN_ERROR:
      // 登出
      return {
        ...state,
        ...action.payload,
        error: action.payload.msg,
      };
    case LOGOUT_SUCCESS:
      // 登出
      return {
        ...state,
        // isLogin: false,
        // error: '',
        ...action.payload,
      };
    default:
      return state;
  }
}
