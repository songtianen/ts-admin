/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import * as React from 'react';
import { Input } from 'antd';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';

interface ISearchInputProps {}

const SearchInput: React.FunctionComponent<ISearchInputProps> = (props) => {
  const [focus, setFocus] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Input
      placeholder='Search'
      disabled
      style={{ border: 'none', width: 150 }}
      size='small'
      prefix={focus ? <ArrowLeftOutlined /> : <SearchOutlined />}
      value={value}
    />
  );
};

export default SearchInput;
