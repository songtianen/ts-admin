/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import * as React from 'react';
import { Input } from 'antd';
import MyICon from '../../../components/MyIcon';

const { Search } = Input;

interface ISearchInputProps {
  responsive: boolean;
}

const SearchInput: React.FunctionComponent<ISearchInputProps> = (props) => {
  const { responsive } = props;
  const [focus, setFocus] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <div
      style={{
        display: responsive ? 'none' : 'block',
      }}
    >
      <Search placeholder='Search' size='small' value={value} />
    </div>
  );
};

export default SearchInput;
