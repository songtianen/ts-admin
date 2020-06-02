import Loadable from 'react-loadable';
import TableLoading from '../views/components/TableLoading';

const Menu = Loadable({
  loader: () =>
    import(/* webpackChunkName: "menu" */ '../views/pages/system/Menu/index'),
  loading: TableLoading,
});
const Notdone = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "notDone" */ '../views/components/NotDone/NotDone'
    ),
  loading: TableLoading,
});
const FunctionPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "function" */ '../views/pages/system/Function'),
  loading: TableLoading,
});
const Role = Loadable({
  loader: () =>
    import(/* webpackChunkName: "role" */ '../views/pages/system/Role'),
  loading: TableLoading,
});
const Welcome = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Welcome" */ '../views/components/Welcome'),
  loading: TableLoading,
});
const RolePermission = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "RolePermission" */ '../views/pages/system/RolePermisson'
    ),
  loading: TableLoading,
});
const RoleUser = Loadable({
  loader: () =>
    import(/* webpackChunkName: "RoleUser" */ '../views/pages/system/RoleUser'),
  loading: TableLoading,
});
const UserRole = Loadable({
  loader: () =>
    import(/* webpackChunkName: "UserRole" */ '../views/pages/system/UserRole'),
  loading: TableLoading,
});
const Department = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "Department" */ '../views/pages/system/Department'
    ),
  loading: TableLoading,
});
const Position = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Position" */ '../views/pages/system/Role'),
  loading: TableLoading,
});

const Users = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Users" */ '../views/pages/system/Users'),
  loading: TableLoading,
});
const interfaceSetup = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "interfaceSetup" */ '../views/pages/home/InterFace'
    ),
  loading: TableLoading,
});
// key为与后端返回菜单的name相对应
const myCompMap: { [index: string]: any } = {
  menu: Menu,
  welcome: Welcome,
  function: FunctionPage,
  role: Role,
  rolepermission: RolePermission,
  roleuser: RoleUser,
  userrole: UserRole,
  position: Position,
  department: Department,
  usersEdit: Users,
  notdone: Notdone,
  interface_setup: interfaceSetup,
};

// key为与后端返回菜单的name相对应
export default myCompMap;
