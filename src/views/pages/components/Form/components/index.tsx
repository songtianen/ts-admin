import {
  // Form,
  // Input,
  // DatePicker,
  // InputNumber,
  // Checkbox,
  // Radio,
  // Select,
  // Switch,
  // Cascader,
  // Upload,
  TreeSelect,
} from 'antd';
import * as React from 'react';
import { TreeSelectProps } from 'antd/lib/tree-select';

interface ItreeSelectProps {
  options: TreeSelectProps<any>;
}

class ItreeSelect extends React.PureComponent<ItreeSelectProps> {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
  }

  render() {
    const { options } = this.props;
    return <TreeSelect {...options} />;
  }
}

export default ItreeSelect;
