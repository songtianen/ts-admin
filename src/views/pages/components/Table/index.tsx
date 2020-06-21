import * as React from 'react';
import { Table, Divider } from 'antd';
import { TableProps } from 'antd/lib/table';
import SearchForm, { ISearchFormProps } from './SearchForm';
import TableHeaderTool, { ITableHeaderToolProps } from './TableHeaderTool';
import ModalForm, { IModalFormProps } from '../ModalForm';

interface IEhanceTableProps {
  searchFormOption?: ISearchFormProps;
  tableHeaderToolOption?: ITableHeaderToolProps;
  tableOption?: TableProps<any>;
  modalFormOption?: IModalFormProps;
}

const EhanceTable: React.FunctionComponent<IEhanceTableProps> = (props) => {
  const { searchFormOption, tableHeaderToolOption, tableOption, modalFormOption } = props;
  return (
    <div style={{ backgroundColor: '#fff', padding: '18px' }}>
      {searchFormOption ? <SearchForm {...searchFormOption} /> : ''}
      {tableHeaderToolOption ? <TableHeaderTool {...tableHeaderToolOption} /> : ''}
      {tableHeaderToolOption ? <Divider /> : ''}
      {tableOption ? <Table {...tableOption} /> : ''}
      {modalFormOption ? <ModalForm {...modalFormOption} /> : ''}
    </div>
  );
};

export default EhanceTable;
