import * as React from 'react';
import { notification } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import util from '../../../../util/util';
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
  useFetchAPIHook,
  IuseFetchAPIProps,
} from './systemStateHook';
import * as api from '../../../../api';

const myapi: { [index: string]: any } = api;

const useSystemPageHook = () => {
  const { tableFilter, changeTableFilter } = useTableFilterHook();
  const { tableLoading, controlTableLoading } = useTableLoadingClickHook();
  const [tablePagination, changeTablePagination] = useTablePaginationHook();
  const { tableSelectedRowKeys, changeTableSelectedRowKeys } = useTableSelectedRowKeysHook();
  const { tablePagedList, changeTablePagelist } = useTablePagedListHook();
  // const { tableQuery, changeQuery } = useQueryHook();
  const { editModalVisible, changeEditModalVisible } = useEditModalVisibleHook();
  const { isEditModal, changeIsEditModal } = useIsEditModalHook();
  const { tableSorter, changeSoter } = useSorterHook();
  const { editFormData, changeIsEditFormData } = useEditFormDataHook();
  const { apis, changeFetchAPI } = useFetchAPIHook();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetch = async (query = {}, reqApi?: IuseFetchAPIProps) => {
    // if (reqApi) {
    //   changeFetchAPI(reqApi);
    // }

    if (apis.findlApi) {
      console.log('tableFilter>>>>>>>', apis);

      controlTableLoading.addLoading();
      const ResData = await myapi[apis.findlApi](query);

      controlTableLoading.noLoading();
      const { data } = ResData;
      changeTablePagination({ total: data.totalCount });
      changeTablePagelist(util.addKeyforArray(data.rows));
    }
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
    // console.log('hook>>>>>>>', tableFilter);
    refresh();
  }, [apis]);
  const onTableSearchSubmmit = (filter: any) => {
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
  // table 选择器
  const onTableSelectChange = (selectedRowKeys: any) => {
    changeTableSelectedRowKeys(selectedRowKeys);
  };
  const tableHasSelected = tableSelectedRowKeys.length > 0;
  // table 表格 分页、排序、筛选变化时触发
  // eslint-disable-next-line no-shadow
  const onTableChange = (pagination: PaginationProps, filters: any, sorter: any) => {
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
  const onModalSubmit = async (data: any) => {
    if (isEditModal) {
      const formData = { ...data, id: editFormData.id };
      try {
        if (apis.editApi) {
          await myapi[apis.editApi](formData);
          changeEditModalVisible(false);
          changeIsEditModal(false);
          notification.success({
            message: '保存成功',
          });
        }
      } catch (e) {
        notification.error({
          message: e.msg,
        });
      }
    } else {
      try {
        if (apis.addApi) {
          await myapi[apis.addApi](data);
          changeEditModalVisible(false);
          notification.success({
            message: '保存成功',
          });
        }
      } catch (e) {
        notification.error({
          message: e.msg,
        });
      }
    }
    refresh();
  };
  // modal
  const onEditModalOnCancel = () => {
    changeIsEditModal(false);
    changeEditModalVisible(false);
  };
  const onTableHeaderToolAddFunc = () => {
    changeIsEditFormData({});
    changeIsEditModal(false);
    changeEditModalVisible(true);
  };
  const onTableHeaderToolonConfirm = async () => {
    // button Popconfirm 删除
    try {
      if (apis.delApi) {
        await myapi[apis.delApi]({
          ids: tableSelectedRowKeys,
        });
        changeTableSelectedRowKeys([]);
        notification.success({
          message: '删除成功',
        });
      }
    } catch (e) {
      notification.error({
        message: e.msg,
      });
    }
    refresh();
  };

  return {
    changeTableFilter,
    controlTableLoading,
    changeTablePagination,
    changeTableSelectedRowKeys,
    changeTablePagelist,
    changeEditModalVisible,
    changeIsEditModal,
    changeSoter,
    changeIsEditFormData,
    changeFetchAPI,
    tableFilter,
    tableLoading,
    tablePagination,
    tableSelectedRowKeys,
    tablePagedList,
    editModalVisible,
    isEditModal,
    tableSorter,
    editFormData,
    fetch,
    refresh,
    onTableSearchSubmmit,
    onTableSelectChange,
    onTableChange,
    onModalSubmit,
    onEditModalOnCancel,
    onTableHeaderToolAddFunc,
    onTableHeaderToolonConfirm,
    tableHasSelected,
  };
};

export default useSystemPageHook;
