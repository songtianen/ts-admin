/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import * as React from 'react';
import { Input } from 'antd';
import MyICon from '../../../components/MyIcon';

interface ISearchInputProps {}

const SearchInput: React.FunctionComponent<ISearchInputProps> = (props) => {
  const [focus, setFocus] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Input
      placeholder='Search'
      style={{ border: 'none', width: 150 }}
      size='small'
      prefix={
        focus ? (
          <MyICon type='icon-arrowleft' />
        ) : (
          <MyICon type='icon-search' style={{ fontSize: 14, color: '#aaa' }} />
        )
      }
      value={value}
    />
  );
};

export default SearchInput;
