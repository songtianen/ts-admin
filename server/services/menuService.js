/* eslint-disable no-unused-vars */
const uuidv4 = require('uuid/v4');
const _ = require('lodash');
const { AccessMemuModel, FunctionModel, RoleModel } = require('../model/model'); // 引入模型
const dbSchema = require('../db/dbSchema');
const { findUserPermission } = require('./userService');
const { unique } = require('../util/util');

const buildMenu = (menus) => {
  const rootMenu = menus.filter((v) => v.parentId === '0');
  const build = (listItem, allList) => {
    for (let i = 0; i < listItem.length; i++) {
      listItem[i].children = [];
      const children = allList.filter((item) => item.parentId === listItem[i].id);
      listItem[i].children.push(...children);
      if (listItem[i].children) {
        build(listItem[i].children, allList);
      }
    }
    return listItem;
  };
  return build(rootMenu, menus);
};
// 构建有相应权限的菜单
// const buildAccessMenu = (parentMenu, menuList, userPermission) => {
//   parentMenu.children = [];
//   let children = menuList.filter((item) => {
//     return (
//       item.parentId === parentMenu.id &&
//       (!item.functionCode || userPermission.indexOf(item.functionCode) > -1)
//     );
//   });
//   // 父级没有权限访问，子级也不能访问
//   for (let menu of children) {
//     buildAccessMenu(menu, menuList, userPermission);
//   }
//   parentMenu.children.push(...children);
// };
const buildAccessMenu = (menus, userPermissionIds) => {
  // console.log('uniqueMenu---', userPermissionIds);
  if (userPermissionIds.length === 0) {
    return [];
  }
  // 找到所有具有权限显示的菜单
  const permissionMenus = [];
  for (const i of menus) {
    for (const j of userPermissionIds) {
      if (i.id === j) {
        permissionMenus.push(i);
      }
    }
  }
  const n = [];
  const findParentMenu = (menu, permissionMenu) => {
    for (let i = 0; i < menu.length; i++) {
      for (let j = 0; j < permissionMenu.length; j++) {
        if (permissionMenu[j].parentId === menu[i].id) {
          const j = [];
          j.push(menu[i]);
          n.push(menu[i]);
          findParentMenu(menu, j);
        }
      }
    }
  };
  findParentMenu(menus, permissionMenus);
  const uniqueMenu = unique(n);

  const newPermissionMenus = permissionMenus.concat(uniqueMenu);
  // 构建出菜单树
  if (newPermissionMenus && newPermissionMenus.length) {
    const rootMenu = newPermissionMenus.filter((v) => v.parentId === '0');
    const build = (listItem, allList) => {
      for (let i = 0; i < listItem.length; i++) {
        listItem[i].children = [];
        const children = allList.filter((item) => item.parentId === listItem[i].id);
        listItem[i].children.push(...children);
        if (listItem[i].children) {
          build(listItem[i].children, allList);
        }
      }
      return listItem;
    };
    if (rootMenu && rootMenu.length) {
      return build(rootMenu, newPermissionMenus);
    }
    return rootMenu;
  }
};
const checkAccssMenu = (accessMenuList, menuList) => {
  // console.log('checkAccssMenu菜单列表', accessMenuList)
  //  删除空children
  for (const item of accessMenuList) {
    if (item.children) {
      checkAccssMenu(item.children, menuList);
    }
  }
  _.remove(accessMenuList, (item) => {
    return (
      item.children.length === 0 &&
      menuList.some((s) => {
        return s.parentId === item.id;
      })
    );
  });
};
const buildWithFunc = (menuLists, funcList) => {
  for (let i = 0; i < menuLists.length; i++) {
    for (let j = 0; j < funcList.length; j++) {
      if (funcList[j].moduleId === menuLists[i].id) {
        funcList[j].title = funcList[j].name;
        menuLists[i].children.push(funcList[j]);
      }
    }
    if (menuLists[i].children) {
      buildWithFunc(menuLists[i].children, funcList);
    }
  }
  return menuLists;
};

const buildMenuTreeWithFunction = (menu, funcList) => {
  const rootMenu = menu.filter((v) => v.parentId === '0');
  const build = (listItem, allList) => {
    for (let i = 0; i < listItem.length; i++) {
      listItem[i].children = [];
      const children = allList.filter((item) => item.parentId === listItem[i].id);
      listItem[i].children.push(...children);
      if (listItem[i].children) {
        build(listItem[i].children, allList);
      }
    }
    return listItem;
  };
  const menuList = build(rootMenu, menu);

  const menuListWithFunc = buildWithFunc(menuList, funcList);

  return menuListWithFunc;
};

const menuService = {
  // 获取所有的未经处理菜单
  getAllMenuList: (selector = {}) => AccessMemuModel.find(selector).exec(),
  // 获取前端页面菜单
  getAllMenu: async (pageIndex, pageSize, sortBy, descending, filter) => {
    let menuLists = await AccessMemuModel.find();
    menuLists = JSON.parse(JSON.stringify(menuLists));
    const allList = JSON.parse(JSON.stringify(menuLists));
    if (filter.functionCode) {
      menuLists = _.filter(menuLists, (o) => o.functionCode.indexOf(filter.functionCode) > -1);
    }
    if (filter.title) {
      menuLists = _.filter(menuLists, (o) => o.title.indexOf(filter.title) > -1);
    }

    // 总数
    const totalCount = menuLists.length;
    // 排序
    if (sortBy) {
      sortBy = 'isAdd';
      menuLists = _.sortBy(menuLists, [sortBy]);
      if (descending === 'true') {
        menuLists = menuLists.reverse();
      }
    }
    if (pageIndex || pageSize) {
      // 返回给前端第几页，的 数量。（）
      const start = (pageIndex - 1) * pageSize;
      const end = pageIndex * pageSize;
      menuLists = _.slice(menuLists, start, end);
    }

    return {
      totalCount,
      rows: menuLists,
      allList,
    };
  },
  // 可访问的菜单
  AccessMenu: async (userInfo) => {
    let menuList = await AccessMemuModel.find();

    menuList = JSON.parse(JSON.stringify(menuList));

    const { isAdmin } = userInfo;
    // console.log('userInfo中的isAdmin', isAdmin);
    // 获取用户的用户角色，角色里有权限
    const { userRole } = userInfo;
    // 如若是管理员构建管理员菜单（全部菜单）
    if (isAdmin) {
      return {
        success: true,
        menuTree: _.sortBy(buildMenu(menuList), ['sort']),
      };
    }
    const funtionList = await findUserPermission(userRole);
    const list = buildAccessMenu(menuList, funtionList.menuId);
    return {
      success: true,
      menuTree: _.sortBy(list, ['sort']),
    };

    // checkAccssMenu(parentMenuList, menuList); // 根菜单，与总菜单
  },
  editMenu: async (data) => {
    if (data) {
      // 查询一条
      if (data.functionCode) {
        const menuCode = await AccessMemuModel.findOne({
          functionCode: data.functionCode,
        });
        if (menuCode && menuCode.id !== data.id) {
          return {
            success: false,
            msg: `${data.functionCode}已存在`,
          };
        }
      }

      if (data.name) {
        const menuName = await AccessMemuModel.findOne({
          name: data.name,
        });
        if (menuName && menuName.id !== data.id) {
          return {
            success: false,
            msg: `${data.name}已存在`,
          };
        }
      }
      if (data.title) {
        const menuTitle = await AccessMemuModel.findOne({
          title: data.title,
        });
        if (menuTitle && menuTitle.id !== data.id) {
          return {
            success: false,
            msg: `${data.title}已存在`,
          };
        }
      }
      if (data.path) {
        const menuPath = await AccessMemuModel.findOne({
          path: data.path,
        });
        if (menuPath && menuPath.id !== data.id) {
          return {
            success: false,
            msg: `${data.path}已存在`,
          };
        }
      }

      await AccessMemuModel.updateOne(
        {
          id: data.id,
        },
        {
          ...data,
        },
      );
      return {
        success: true,
        msg: '修改成功',
      };
    }
    return Promise.reject(new Error('保存错误，没有参数'));
  },
  addMenu: async (data) => {
    if (data) {
      if (data.title) {
        const info = await AccessMemuModel.findOne({ title: data.title });
        if (info) {
          return {
            success: false,
            msg: `${info.title}已存在`,
          };
        }
      }
      if (data.name) {
        const info = await AccessMemuModel.findOne({ name: data.name });
        if (info) {
          return {
            success: false,
            msg: `${info.name}已存在`,
          };
        }
      }
      if (data.functionCode) {
        const info = await AccessMemuModel.findOne({ functionCode: data.code });
        if (info) {
          return {
            success: false,
            msg: `${info.code}已存在`,
          };
        }
      }
      if (data.path) {
        const info = await AccessMemuModel.findOne({ path: data.path });
        if (info) {
          return {
            success: false,
            msg: `${info.path}已存在`,
          };
        }
      }
      await AccessMemuModel.create({
        ...dbSchema.Menu,
        ...data,
        id: uuidv4(),
      });
      return {
        success: true,
        msg: '数据库保存成功',
      };
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(new Error('没有参数'));
  },
  checkSameItemsInDB: async (...data) => {
    const arr = [];
    if (data) {
      for (const item of data) {
        const res = await AccessMemuModel.find({ ...item });
        if (res && res.length) {
          arr.push(item);
        }
      }
    }
    return arr;
  },
  delMenus: async (menuIds) => {
    if (menuIds) {
      await AccessMemuModel.deleteMany({ id: menuIds });
      // 删除functionModal中moduleID是menuIds的文档
      await FunctionModel.deleteMany({ moduleId: menuIds });
      return {
        success: true,
        msg: '删除成功!',
      };
    }
    return Promise.reject(new Error('服务器错误'));
  },
  getAllMenuWithFunction: async (roleId) => {
    let menu = await AccessMemuModel.find();
    let funcList = await FunctionModel.find();
    menu = JSON.parse(JSON.stringify(menu));
    funcList = JSON.parse(JSON.stringify(funcList));
    const buildMenu = buildMenuTreeWithFunction(menu, funcList);
    if (!roleId) {
      return buildMenu;
    }
    const roleFunctions = await RoleModel.findOne({ id: roleId });
    return {
      menuList: buildMenu,
      roleFunctions,
    };
  },
};
module.exports = menuService;
