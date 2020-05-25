const permission = {};
// 权限校验
permission.check = function (config) {
  if (config.permission && config.permission.length > 0) {
    const configPermissions = config.permission;
    const permissions = JSON.parse(localStorage.getItem('permission'));
    // let isAdmin = localStorage.getItem('isAdmin');
    const hasPermission = permissions.some((s) => {
      return configPermissions.indexOf(s) > -1;
    });
    return hasPermission;
  }
  return true;
};

export default permission;
