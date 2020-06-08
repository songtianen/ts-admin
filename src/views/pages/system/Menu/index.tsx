/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Badge, Tag, Button, notification } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { PaginationProps } from 'antd/lib/pagination';
import Table from '../../components/Table';
import { getAllMenu, editMenu, delMenus, addMenu } from '../../../../api';
import util from '../../../../util/util';

import menuSchema from './schema';
import PermissionContainer from '../../../../util/permissionContainer';
import {
  useTablePaginationHook,
  useTableFilterHook,
  useTableSelectedRowKeysHook,
  useSorterHook,
  useTablePagedListHook,
  useIsEditModalHook,
  useEditModalVisibleHook,
  useTableLoadingClickHook,
  useEditFormDataHook,
} from '../hooks/systemStateHook';

const Menu: React.FunctionComponent = () => {
  const { tableFilter, changeTableFilter } = useTableFilterHook({
    title: '',
    functionCode: '',
  });
  const { tableLoading, controlTableLoading } = useTableLoadingClickHook();
  const [tablePagination, changeTablePagination] = useTablePaginationHook();
  const { tableSelectedRowKeys, changeTableSelectedRowKeys } = useTableSelectedRowKeysHook();
  const { tablePagedList, changeTablePagelist } = useTablePagedListHook();
  // const { tableQuery, changeQuery } = useQueryHook();
  const { editModalVisible, changeEditModalVisible } = useEditModalVisibleHook();
  const { isEditModal, changeIsEditModal } = useIsEditModalHook();
  const { tableSorter, changeSoter } = useSorterHook();
  const { editFormData, changeIsEditFormData } = useEditFormDataHook();
  const [allList, setAllList] = React.useState<any>([]);

  const fetch = async (query = {}) => {
    controlTableLoading.addLoading();
    const ResData = await getAllMenu(query);
    controlTableLoading.noLoading();
    const { data } = ResData;
    changeTablePagination({ total: data.totalCount });
    changeTablePagelist(util.addKeyforArray(data.rows));
    setAllList((val: any[]) => [...val, ...data.allList]);
  };

  const refresh = () => {
    const query = {
      pageIndex: tablePagination.current,
      pageSize: tablePagination.pageSize,
      sortBy: tableSorter.field,
      descending: tableSorter.order === 'descend',
      filter: tableFilter,
    };
    fetch(query);
  };

  React.useEffect(() => {
    refresh();
  }, []);
  /**
   * @description 查询
   */
  const tableSearchSubmmit = (filter: any) => {
    changeTablePagination({
      current: 1,
    });
    changeTableFilter(filter);
    const query = {
      pageIndex: 1,
      pageSize: tablePagination.pageSize,
      sortBy: tableSorter.field,
      descending: tableSorter.order === 'descend',
      filter,
    };

    fetch(query);
  };

  const getParentName = (id: string): string => {
    const pagedList = allList;
    // eslint-disable-next-line no-restricted-syntax
    for (const i of pagedList) {
      if (i.id === id) {
        return i.title;
      }
    }
    return '';
  };
  const editRole = (record: any) => {
    const obj = {
      ...record,
      isLock: record.isLock ? '1' : '0',
      leftMenu: record.leftMenu ? '1' : '0',
    };
    changeIsEditFormData(obj);
    changeEditModalVisible(true);
    changeIsEditModal(true);
  };
  // table 选择器
  const onSelectChange = (selectedRowKeys: any) => {
    changeTableSelectedRowKeys(selectedRowKeys);
  };
  const hasSelected = tableSelectedRowKeys.length > 0;
  const columns: ColumnsType = [
    {
      title: '菜单title',
      dataIndex: 'title',
      key: 'title',
      width: 110,
      sorter: true,
    },
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      width: 110,
      sorter: true,
    },
    {
      title: '菜单编码',
      dataIndex: 'functionCode',
      key: 'functionCode',
      width: 140,
      sorter: true,
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
      width: 220,
      key: 'path',
      sorter: true,
    },
    {
      title: '父菜单',
      dataIndex: 'parentId',
      key: 'parentId',
      render: (text) => {
        return <Tag color='green'>{getParentName(text)}</Tag>;
      },
      width: 140,
      sorter: true,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      width: 100,
    },
    {
      title: '左侧菜单',
      dataIndex: 'leftMenu',
      key: 'leftMenu',
      render: (text) => {
        return text ? (
          <div style={{ textAlign: 'center' }}>
            <Badge status='success' />
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Badge status='error' />
          </div>
        );
      },
    },
    {
      title: '是否锁定',
      dataIndex: 'isLock',
      key: 'isLock',
      render: (text) => {
        return text ? (
          <div style={{ textAlign: 'center' }}>
            <Badge status='success' />
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Badge status='error' />
          </div>
        );
      },
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      fixed: 'right',
      key: 'id',
      width: 120,
      render: (text, record) => {
        return (
          <PermissionContainer permission={['menu_edit']}>
            <div style={{ textAlign: 'center' }}>
              <Button
                type='link'
                onClick={() => {
                  editRole(record);
                }}
              >
                编辑
              </Button>
            </div>
          </PermissionContainer>
        );
      },
    },
  ];
  // table 表格 分页、排序、筛选变化时触发
  // eslint-disable-next-line no-shadow
  const handleTableChange = (pagination: PaginationProps, filters: any, sorter: any) => {
    changeTablePagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
    changeSoter({
      field: sorter.field,
      order: sorter.order,
    });
    const query = {
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
      sortBy: sorter.field,
      descending: sorter.order === 'descend',
      filter: tableFilter,
    };
    fetch(query);
  };
  const modalSubmit = async (data: any) => {
    if (isEditModal) {
      const formData = { ...data, id: editFormData.id };

      try {
        await editMenu(formData);
        changeEditModalVisible(false);
        changeIsEditModal(false);
        notification.success({
          message: '保存成功',
        });
      } catch (e) {
        notification.error({
          message: e.msg,
        });
      }
    } else {
      try {
        await addMenu(data);
        changeEditModalVisible(false);
        notification.success({
          message: '保存成功',
        });
      } catch (e) {
        notification.error({
          message: e.msg,
        });
      }
    }
    refresh();
  };

  // modal
  const editModalOnCancel = () => {
    changeIsEditModal(false);
    changeEditModalVisible(false);
  };

  const tableHeaderToolAddFunc = () => {
    changeIsEditFormData({});
    changeIsEditModal(false);
    changeEditModalVisible(true);
  };
  const tableHeaderToolonConfirm = async () => {
    // button Popconfirm 删除
    try {
      await delMenus({
        ids: tableSelectedRowKeys,
      });
      changeTableSelectedRowKeys([]);
      notification.success({
        message: '删除成功',
      });
    } catch (e) {
      notification.error({
        message: e.msg,
      });
    }
    refresh();
  };
  return (
    <Table
      searchFormOption={{
        schema: menuSchema.searchSchema,
        uiSchema: menuSchema.searchUiSchema,
        onSubmmit: tableSearchSubmmit,
      }}
      tableHeaderToolOption={{
        addFunc: tableHeaderToolAddFunc,
        onConfirm: tableHeaderToolonConfirm,
        hasSelected,
        addPermission: ['menu_add'],
        delPermission: ['menu_del'],
      }}
      tableOption={{
        columns,
        scroll: { x: 1400 },
        size: 'small',
        bordered: true,
        rowSelection: {
          selectedRowKeys: tableSelectedRowKeys,
          onChange: onSelectChange,
        },
        rowKey: (record) => record.id,
        dataSource: tablePagedList,
        pagination: tablePagination,
        loading: tableLoading,
        onChange: handleTableChange,
      }}
      modalFormOption={{
        schema: menuSchema.editSchema,
        uiSchema: menuSchema.editUiSchema,
        formData: editFormData,
        visible: editModalVisible,
        cancelText: '取消',
        okText: '提交',
        title: editFormData.id ? '编辑' : '新增',
        onCancel: editModalOnCancel,
        modalSubmit,
        destroyOnClose: true,
      }}
    />
  );
};

export default Menu;
