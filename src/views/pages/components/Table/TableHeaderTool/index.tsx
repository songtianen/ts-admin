import * as React from 'react';
import { Button, Popconfirm, Divider } from 'antd';
import MyIcon from '../../../../components/MyIcon';
import PermissionContainer from '../../../../../util/permissionContainer';

export interface ITableHeaderToolProps {
  addFunc: () => void;
  hasSelected: boolean;
  onConfirm: () => void;
  addPermission: string[];
  delPermission: string[];
}

const TableHeaderTool: React.FunctionComponent<ITableHeaderToolProps> = (props) => {
  const { addFunc, hasSelected, onConfirm, addPermission, delPermission } = props;
  return (
    <div style={{ marginBottom: 16 }}>
      <PermissionContainer permission={addPermission}>
        <Button type='primary' icon={<MyIcon type='icon-plus' />} onClick={addFunc}>
          新增
        </Button>
      </PermissionContainer>

      <Divider type='vertical' />
      <PermissionContainer permission={delPermission}>
        {!hasSelected ? (
          <Button danger disabled={!hasSelected} icon={<MyIcon type='icon-delete' />}>
            删除
          </Button>
        ) : (
          <Popconfirm title='确定删除?' onConfirm={onConfirm}>
            <Button danger disabled={!hasSelected} icon={<MyIcon type='icon-delete' />}>
              删除
            </Button>
          </Popconfirm>
        )}
      </PermissionContainer>
    </div>
  );
};

export default TableHeaderTool;
