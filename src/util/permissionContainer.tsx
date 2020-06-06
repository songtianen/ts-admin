import React from 'react';

export interface IPermissionContainerProps {
  permission: string[];
}
// 组件级权限效验
class PermissionContainer extends React.PureComponent<
  IPermissionContainerProps
> {
  render() {
    // eslint-disable-next-line react/prop-types
    const { permission, children } = this.props;

    const needPermission = permission || [];
    const localPermisson = localStorage.getItem('permission') || '';
    const userPermission = JSON.parse(localPermisson) || [];
    const isAdmin = localStorage.getItem('isAdmin');
    let hasPermission = isAdmin === 'admin';
    // 不是管理员（没有权限），并且neddPermission明确需要某种权限
    if (!hasPermission && needPermission.length > 0) {
      needPermission.forEach((p: string) => {
        if (userPermission.some((s: string) => s === p)) {
          // 此用户就有权限
          hasPermission = true;
        }
      });
    }
    return hasPermission ? children : null;
  }
}
export default PermissionContainer;
