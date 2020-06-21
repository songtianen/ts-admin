/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Tag, Button, Tree, Input, TreeSelect } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import EhanceTable from '../../components/Table';
import schema from './schema/index';
import useSystemPageHook from '../hooks/systemPageHook';
import PermissionContainer from '../../../../util/permissionContainer';
import { getAllMenuWithFunction } from '../../../../api';

const RolePermission: React.FunctionComponent = () => {
  const {
    changeTableFilter,
    changeFetchAPI,
    tableLoading,
    tablePagination,
    tableSelectedRowKeys,
    tablePagedList,
    editModalVisible,
    changeEditModalVisible,
    changeIsEditModal,
    editFormData,
    changeIsEditFormData,
    onTableSearchSubmmit,
    onTableSelectChange,
    onTableChange,
    onModalSubmit,
    onEditModalOnCancel,
    onTableHeaderToolAddFunc,
    onTableHeaderToolonConfirm,
    tableHasSelected,
  } = useSystemPageHook();

  const [menuFunctionList, setMenuFunctionList] = React.useState([]);
  const [rolePermissions, setRolePermissions] = React.useState([]);

  const buildMenuListAndFunctions = (menuList: any) => {
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
  React.useEffect(() => {
    console.log('ComponentDidMount///');
    changeFetchAPI({
      findlApi: 'getFunctionPagedList',
    });
    changeTableFilter({
      name: '',
      code: '',
      departmentId: '',
    });
    getAllMenuWithFunction({}).then((res) => {
      const menuFunctionLists = buildMenuListAndFunctions(res.data.menuList);
      const rolePermission = res.data.roleFunctions.permission;
      setMenuFunctionList(menuFunctionLists);
      setRolePermissions(rolePermission);
    });
  }, []);
  const editRolePermission = (record: any) => {};
  const columns: ColumnsType = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: '角色编码',
      dataIndex: 'code',
      key: 'code',
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      fixed: 'right',
      width: 120,
      render: (text, record) => {
        return (
          <PermissionContainer permission={['role_permission_edit']}>
            <div>
              <Button type='link' onClick={() => editRolePermission(record)}>
                编辑角色权限
              </Button>
            </div>
          </PermissionContainer>
        );
      },
    },
  ];
  console.log('RolePermission render');
  return (
    <>
      <EhanceTable
        searchFormOption={{
          schema: schema.searchSchema,
          uiSchema: schema.searchUiSchema,
          onSubmmit: () => {},
        }}
        // tableHeaderToolOption={{
        //   addFunc: myTableHeaderToolAddFunc,
        //   onConfirm: onTableHeaderToolonConfirm,
        //   hasSelected: tableHasSelected,
        //   addPermission: ['menu_add'],
        //   delPermission: ['menu_del'],
        // }}
        tableOption={{
          columns,
          scroll: { x: 1000 },
          size: 'small',
          bordered: true,
          // rowSelection: {
          //   selectedRowKeys: tableSelectedRowKeys,
          //   onChange: onTableSelectChange,
          // },
          rowKey: (record) => record.id,
          dataSource: tablePagedList,
          pagination: tablePagination,
          loading: tableLoading,
          onChange: onTableChange,
        }}
        modalFormOption={{
          schema: schema.editSchema,
          uiSchema: schema.editUiSchema,
          formData: editFormData,
          visible: editModalVisible,
          cancelText: '取消',
          okText: '提交',
          title: editFormData.id ? '编辑' : '新增',
          onCancel: onEditModalOnCancel,
          modalSubmit: onModalSubmit,
          destroyOnClose: true,
        }}
      />
    </>
  );
};

export default RolePermission;
