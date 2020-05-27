import {
  ILayOutActionsTypes,
  UPDATE_ACCESSMENU_SUCCESS,
  INIT_APPDATA_SUCCESS,
  UPDATE_MODULE_SUCCESS,
  GET_USERINFO_SUCCESS,
} from '../actions/actions';
import { IReduxAppState } from '../types';

const initialState: IReduxAppState = {
  name: '',
  avatar: '',
  isAdmin: '',
  token: '',
  theme: undefined,
  permission: [],
  spinLoading: false,
  toPath: '/',
  siderSelectedKey: [],
  siderOpenKeys: [],
  headerCurrentModuleName: '', // Header title
  // accessMenu: [], // 后端返回的menu与前端固定的menu总和,
  moduleList: [], // 模块列表
  siderModuleMenu: [], // 模块菜单
};

export default function app(state = initialState, action: ILayOutActionsTypes) {
  switch (action.type) {
    case UPDATE_ACCESSMENU_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case INIT_APPDATA_SUCCESS:
      // console.log('actions.DO_INIT_MENU', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_MODULE_SUCCESS:
      // 通用更新数据的action
      return {
        ...state,
        ...action.payload,
      };
    case GET_USERINFO_SUCCESS:
      // 获取用户信息
      // console.log('actions.GET_USERINFO_SUCCESS', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
