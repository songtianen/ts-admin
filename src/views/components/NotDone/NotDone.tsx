import * as React from 'react';
// import { Form, Input } from 'antd';
import { Modal, Button } from 'antd';
import CommonForm from '../../pages/components/Form';

import schema from './schema';

const NotDone: React.FunctionComponent = () => {
  const [visible, setvisible] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, setformData] = React.useState({
    title: 'title-',
    name: 'name-',
    path: 'path-',
    functionCode: 'functionCode-',
  });
  React.useEffect(() => {
    console.log('modal，中的 ref');
  }, []);
  const onCancel = () => {
    setvisible((val) => !val);
  };
  const onOk = () => {};
  const handleButtonClick = () => {
    setvisible((val) => !val);
  };
  return (
    <div>
      <Button onClick={handleButtonClick}>按钮</Button>
      <Modal
        visible={visible}
        cancelText='关闭'
        okText='提交'
        title='sdsd'
        onCancel={onCancel}
        onOk={onOk}
        destroyOnClose
      >
        <CommonForm
          schema={schema.editSchema}
          uiSchema={schema.editUiSchema}
          formData={formData}
          // modalSaveFunctionData={this.props.handFormSubmit}
        />
      </Modal>
      NotDone!
    </div>
  );
};
export default NotDone;
// interface Iprops {
//   form: any;
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const TestForm: React.FunctionComponent<Iprops> = (props) => {
//   const [form] = Form.useForm();

//   React.useEffect(() => {
//     form.setFieldsValue({
//       username: 'Bamboo',
//     });
//     console.log('测试Form', form);
//   }, []);
//   const arr = ['username', 'password'];
//   const FormI = arr.map((item) => {
//     return (
//       <Form.Item name={item}>
//         <Input />
//       </Form.Item>
//     );
//   });

//   return <Form>{FormI}</Form>;
// };

// export default TestForm;
