/* eslint-disable react/sort-comp */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

import { Modal, Tree, Tag } from 'antd';
import { getAllMenuWithFunction } from '../../../../api';

const { TreeNode } = Tree;
export interface IEditModalProps {
  visible?: boolean;
  formData?: any;
  onCancel?: () => void;
  handFromSubmit?: (data: any) => void;
}

class EditModal extends React.PureComponent<IEditModalProps> {
  state = {
    // eslint-disable-next-line react/no-unused-state
    id: '',
    menuFunctionList: [],
    checkedKeys: [],
    defaultCheckKeys: [],
  };

  onCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this.setState({
      menuFunctionList: [],
      checkedKeys: [],
      defaultCheckKeys: [],
    });
  };

  onOk = async () => {
    const data = {
      roleId: this.props.formData.id,
      permissions: this.state.checkedKeys,
      moduleId: '0',
    };
    // console.log('角色权限管理，组件提交角色权限', this.props.handFromSubmit);
    if (this.props.handFromSubmit) {
      await this.props.handFromSubmit(data);
      this.setState({
        menuFunctionList: [],
        defaultCheckKeys: [],
        checkedKeys: [],
      });
    }
  };

  buildMenuListAndFunctions = (menuList: any) => {
    const changeList = (list: any) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const i of list) {
        i.key = i.id;
        i.selectable = false;
        if (i.moduleId) {
          i.selectable = true;
          i.isPermissionChild = true;
          i.title = i.name;
        }
        if (i.children) {
          changeList(i.children);
        }
      }
      return list;
    };
    return changeList(menuList);
  };

  onCheck = (checkedKeys: any) => {
    // console.log('checkedKeys', checkedKeys);
    // console.log('this-checkedKeys', this.state.checkedKeys);
    // console.log(
    //   'filter-checkedKeys',
    //   checkedKeys.filter((s) => s.indexOf('menu') < 0),
    // );

    this.state.checkedKeys = checkedKeys.filter((s: any) => s.indexOf('menu') < 0);
    // console.log('this-checkedKeys', this.checkedKeys);
  };

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: any) {
    if (!nextProps.visible) {
      return;
    }
    const roleId = nextProps.formData.id;
    getAllMenuWithFunction({
      roleId,
    }).then((moduleFunctionsRes) => {
      const menuFunctionList = this.buildMenuListAndFunctions(moduleFunctionsRes.data.menuList);
      const rolePermissions = moduleFunctionsRes.data.roleFunctions.permission;

      this.setState({
        menuFunctionList,
        defaultCheckKeys: rolePermissions,
        checkedKeys: rolePermissions,
      });
    });
  }

  renderTreeNode = (menuFunctionList: any) => {
    const list = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of menuFunctionList) {
      if (item.children && item.children.length > 0) {
        if (item.isPermissionChild) {
          list.push(
            <TreeNode className='permission-tree-node' title={item.name} key={item.id}>
              {this.renderTreeNode(item.children)}
            </TreeNode>,
          );
        } else {
          list.push(
            <TreeNode
              className='clear-both'
              title={<span style={{ color: 'rgb(181, 185, 189)' }}>{item.title}</span>}
              key={`menu${item.id}`}
            >
              {this.renderTreeNode(item.children)}
            </TreeNode>,
          );
        }
      } else if (item.isPermissionChild) {
        list.push(<TreeNode className='permission-tree-node' title={item.name} key={item.id} />);
      } else {
        list.push(
          <TreeNode
            className='clear-both'
            title={<span style={{ color: 'rgb(181, 185, 189)' }}>{item.title}</span>}
            key={`menu${item.id}`}
          />,
        );
      }
    }
    return list;
  };

  renderTree = () => {
    return (
      <Tree
        checkable
        multiple
        defaultExpandAll
        defaultCheckedKeys={this.state.defaultCheckKeys}
        onCheck={this.onCheck}
        selectable={false}
        showLine
      >
        {this.renderTreeNode(this.state.menuFunctionList)}
      </Tree>
    );
  };

  render() {
    return (
      <Modal
        width={800}
        visible={this.props.visible}
        cancelText='关闭'
        okText='提交'
        title={
          <span>
            编辑角色&nbsp;&nbsp;
            <Tag color='#2db7f5'>{this.props.formData.name}</Tag>&nbsp;权限
          </span>
        }
        onCancel={this.onCancel}
        onOk={this.onOk}
        destroyOnClose
      >
        {this.state.menuFunctionList.length > 0 ? this.renderTree() : null}
      </Modal>
    );
  }
}

export default EditModal;
