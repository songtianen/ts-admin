import * as React from 'react';
import { Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import CommonForm from '../../Form';
import { IEditSchemaProps } from '../../Form/util/type';
import MyIcon from '../../../../components/MyIcon';

export interface ISearchFormProps {
  schema: IEditSchemaProps;
  uiSchema: any;
  onSubmmit: (values: any) => void;
}

const SearchForm: React.FunctionComponent<ISearchFormProps> = (props) => {
  const { schema, uiSchema, onSubmmit } = props;
  const [visible, setVisible] = React.useState(true);
  let FormIns: FormInstance;

  const handleSubmit = () => {
    console.log('FormInstance', FormIns);

    FormIns.validateFields().then((values) => {
      onSubmmit(values);
    });
  };
  const handleReset = () => {
    FormIns.resetFields();
  };
  const toggle = () => {
    setVisible((vis) => !vis);
  };

  return (
    <div
      style={{
        backgroundColor: '#f0f0f0',
        marginBottom: 18,
        padding: '18px 0px',
      }}
    >
      <div
        style={{
          display: visible ? 'block' : 'none',
          marginBottom: 30,
        }}
      >
        <CommonForm
          schema={schema}
          uiSchema={uiSchema}
          handleFormInstance={(formIns) => {
            FormIns = formIns;
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            display: visible ? 'block' : 'none',
          }}
        >
          <Button size='small' type='primary' onClick={handleSubmit}>
            查询
          </Button>
          <Button size='small' style={{ marginLeft: 16 }} onClick={handleReset}>
            清空
          </Button>
        </span>
        <Button type='link' style={{ marginLeft: 18, fontSize: 12 }} onClick={toggle}>
          {visible ? '收起查询' : '展开查询'} <MyIcon type={visible ? 'icon-up' : 'icon-down'} />
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
