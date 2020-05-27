export interface IReduxAppState {
  name: string;
  avatar: string;
  isAdmin: string;
  token: string;
  theme: any;
  permission: [];
  spinLoading: false;
  toPath: string;
  siderSelectedKey: [];
  siderOpenKeys: [];
  headerCurrentModuleName: string;
  moduleList: []; // 模块列表
  siderModuleMenu: []; // 模块菜单
}
