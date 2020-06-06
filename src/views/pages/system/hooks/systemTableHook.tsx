/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { PaginationProps } from 'antd/lib/pagination';

export const useModalClickHook = (initialValue: any) => {
  const [visible, setVisble] = React.useState(initialValue);
  const onCancel = () => {
    setVisble(false);
  };

  const onVisible = () => {
    setVisble(true);
  };
  const controlVisble = {
    onVisible,
    onCancel,
  };
  // 返回包含了更多逻辑的 state 以及改变 state 方法的钩子
  return [visible, controlVisble];
};

export const useTableLoadingClickHook = (initialValue?: boolean) => {
  const [tableLoading, setTableLoading] = React.useState(initialValue || false);

  const noLoading = () => {
    setTableLoading(false);
  };

  const addLoading = () => {
    setTableLoading(true);
  };
  const controlTableLoading = {
    noLoading,
    addLoading,
  };
  // 返回包含了更多逻辑的 state 以及改变 state 方法的钩子
  return { tableLoading, controlTableLoading };
};

export interface ItableFilterProps {
  [index: string]: string;
}

export const useTableFilterHook = (initialVal?: ItableFilterProps) => {
  const [tableFilter, setTableFilter] = React.useState(initialVal || {});
  const changeTableFilter = (val: ItableFilterProps) => {
    setTableFilter((value) => {
      return {
        ...value,
        ...val,
      };
    });
  };
  return {
    tableFilter,
    changeTableFilter,
  };
};

export interface IPaginationProps extends PaginationProps {
  current?: number;
  pageSize?: number;
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
  total?: number;
  showTotal?: (total: number) => string;
}
const TablePagination: IPaginationProps = {
  current: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true,
  showTotal: (total: number) => `共${total}条`,
};

export const useTablePaginationHook = (
  initialValue?: IPaginationProps,
): [IPaginationProps, (newVal: IPaginationProps) => void] => {
  const [tablePagination, setTablePagination] = React.useState(initialValue || TablePagination);
  const changeTablePagination = (newVal: IPaginationProps) => {
    setTablePagination((val?: IPaginationProps) => {
      return {
        ...val,
        ...newVal,
      };
    });
  };
  // 返回包含了更多逻辑的 state 以及改变 state 方法的钩子
  return [tablePagination, changeTablePagination];
};

export const useTableSelectedRowKeysHook = (initialValue?: any[]) => {
  const [tableSelectedRowKeys, setTableSelectedRowKeys] = React.useState(initialValue || []);
  const changeTableSelectedRowKeys = (value: []) => {
    setTableSelectedRowKeys(value);
  };
  return {
    tableSelectedRowKeys,
    changeTableSelectedRowKeys,
  };
};

export interface IqueryProps {
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  descending?: string;
  filter?: ItableFilterProps;
}

export const useQueryHook = (initialValue?: IqueryProps) => {
  const [tableQuery, setQuery] = React.useState(initialValue || {});
  const changeQuery = (newVal: IqueryProps) => {
    setQuery((value) => {
      return {
        ...value,
        ...newVal,
      };
    });
  };
  return {
    tableQuery,
    changeQuery,
  };
};

export const useTablePagedListHook = (initialValue?: any[]) => {
  const [tablePagedList, setTablePagedList] = React.useState(initialValue || []);
  const changeTablePagelist = (values: any[]) => {
    setTablePagedList(values);
  };
  return {
    tablePagedList,
    changeTablePagelist,
  };
};

export interface IuseSorterHook {
  field?: string;
  order?: string;
}

export const useSorterHook = (initialValue?: IuseSorterHook) => {
  const [tableSorter, setSorter] = React.useState(initialValue || { field: '', order: '' });
  const changeSoter = (val: IuseSorterHook) => {
    setSorter((vals) => {
      return {
        ...vals,
        ...val,
      };
    });
  };
  return {
    tableSorter,
    changeSoter,
  };
};

export const useEditModalVisibleHook = (initialValue?: boolean) => {
  const [editModalVisible, setEditModalVisible] = React.useState(initialValue || false);
  const changeEditModalVisible = (val: boolean) => {
    setEditModalVisible(val);
  };
  return {
    editModalVisible,
    changeEditModalVisible,
  };
};
export const useIsEditModalHook = (initialValue?: boolean) => {
  const [isEditModal, setIsEditModalHook] = React.useState(initialValue || false);
  const changeIsEditModal = (val: boolean) => {
    setIsEditModalHook(val);
  };
  return {
    isEditModal,
    changeIsEditModal,
  };
};

interface editFormData {
  [index: string]: string;
}

export const useEditFormDataHook = (initialValue?: editFormData) => {
  const [editFormData, setEditFormData] = React.useState(initialValue || {});
  const changeIsEditFormData = (val: any) => {
    setEditFormData(val);
  };
  return {
    editFormData,
    changeIsEditFormData,
  };
};

export interface IuseFetchHookProps {
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  descending?: string;
  filter?: ItableFilterProps;
}

export const useInitailHook = () => {};
