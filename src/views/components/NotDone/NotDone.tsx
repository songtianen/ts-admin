import * as React from 'react';
import { Button } from 'antd';
import schema from './schema';

import { IEditSchemaProps } from '../../pages/components/Form/util/type';
import ModalFrom from '../../pages/components/ModalForm';
import useModalClickHook from './useModalClickHook';

export interface ICommonModalProps {
  editSchema: IEditSchemaProps;
  editUiSchema: any;
  formData?: any;
}

const NotDone: React.FunctionComponent<ICommonModalProps> = () => {
  const [visible, controlVisble] = useModalClickHook(false);
  const cancelText = '取消';
  const okText = 'ok';
  const title = 'title';

  const modalSubmit = (values: any) => {
    console.log('ModalSubmiit', values);
  };
  const destroyOnClose = true;

  return (
    <>
      <ModalFrom
        visible={visible}
        cancelText={cancelText}
        okText={okText}
        title={title}
        onCancel={controlVisble.onCancel}
        modalSubmit={modalSubmit}
        destroyOnClose={destroyOnClose}
        schema={schema.editSchema}
        uiSchema={schema.editUiSchema}
        formData={{ path: '/////' }}
      />

      <Button onClick={controlVisble.onVisible}>NotDone!</Button>
    </>
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
