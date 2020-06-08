import * as React from 'react';
import { Tag, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import EhanceTable from '../../components/Table';
import schema from './schema/index';
import useSystemPageHook from '../hooks/systemPageHook';
import PermissionContainer from '../../../../util/permissionContainer';
import { getAllMenu } from '../../../../api';

const Function: React.FunctionComponent = () => {
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
  const [menuList, setMenuList] = React.useState<any>([]);
  React.useEffect(() => {
    console.log('ComponentDidMount///');
    changeFetchAPI({
      findlApi: 'getFunctionPagedList',
      addApi: 'addFunction',
      editApi: 'editFunction',
      delApi: 'delFunctions',
    });
    changeTableFilter({ name: '', code: '' });
    getAllMenu({}).then((res) => {
      const menuLsit = res.data.rows;
      setMenuList(menuLsit);
    });
  }, []);
  const getMoudleName = (id: string) => {
    const findName = (data: any[], _id: string) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const i of data) {
        if (i.id === _id) {
          return i.title;
        }
      }
      return '';
    };
    return findName(menuList, id);
  };
  //  Modal 框编辑功能 table表格编辑时调用
  const editFunction = async (record: any) => {
    schema.editUiSchema.moduleId['ui:options'].disabled = true;
    // 表单不进行网络请求
    schema.editUiSchema.moduleId['ui:remoteConfig'] = {
      apiKey: '',
      hand: () => {},
    };
    const obj = {
      // name: record.name,
      // code: record.code,
      // description: record.description,
      // moduleId: record.moduleId,
      // id: record.id,
      ...record,
    };
    changeIsEditFormData(obj);
    changeEditModalVisible(true);
    changeIsEditModal(true);
  };

  const columns: ColumnsType = [
    {
      title: '模块名称',
      dataIndex: 'module',
      key: 'module',
      render: (text, record: any) => {
        return <Tag color='green'>{getMoudleName(record.moduleId)}</Tag>;
      },
      sorter: true,
    },
    {
      title: '功能名称',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: '功能编码',
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
        /**
         * 生成复杂数据的渲染函数，
         * 参数分别为当前行的值，当前行数据，行索引，
         * @return里面可以设置表格行/列合并
         */
        return (
          <PermissionContainer permission={['function_edit']}>
            <div style={{ textAlign: 'center' }}>
              <Button type='link' onClick={() => editFunction(record)}>
                编辑
              </Button>
            </div>
          </PermissionContainer>
        );
      },
    },
  ];

  const myTableHeaderToolAddFunc = () => {
    schema.editUiSchema.moduleId['ui:options'].disabled = false;
    schema.editUiSchema.moduleId['ui:remoteConfig'] = {
      apiKey: 'getAllMenuWithFunction',
      hand: (data) => {
        // console.log('FunctionData', data);
        const changeList = (list: any) => {
          // eslint-disable-next-line no-restricted-syntax
          for (const i of list) {
            i.value = i.id;
            // eslint-disable-next-line no-underscore-dangle
            i.key = i._id;
            i.selectable = true;
            i.disabled = false;
            if (i.moduleId) {
              i.selectable = false;
              i.disabled = true;
            }
            if (i.children) {
              changeList(i.children);
            }
          }
          return list;
        };
        return changeList(data);
      },
    };
    onTableHeaderToolAddFunc();
  };

  return (
    <EhanceTable
      searchFormOption={{
        schema: schema.searchSchema,
        uiSchema: schema.searchUiSchema,
        onSubmmit: onTableSearchSubmmit,
      }}
      tableHeaderToolOption={{
        addFunc: myTableHeaderToolAddFunc,
        onConfirm: onTableHeaderToolonConfirm,
        hasSelected: tableHasSelected,
        addPermission: ['menu_add'],
        delPermission: ['menu_del'],
      }}
      tableOption={{
        columns,
        scroll: { x: 1000 },
        size: 'small',
        bordered: true,
        rowSelection: {
          selectedRowKeys: tableSelectedRowKeys,
          onChange: onTableSelectChange,
        },
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
  );
};

export default Function;
