import * as React from 'react';
import { Form } from 'antd';
import getForm from './util/commonFormSchemaUtil';
import { IEditSchemaProps } from './util/type';

interface ICommoFormProps {
  schema: IEditSchemaProps;
  uiSchema: any;
  formData?: any;
  modalSaveFunctionData?: (values: any) => void;
}

const CommoForm: React.FunctionComponent<ICommoFormProps> = (props) => {
  const { schema, uiSchema, formData, modalSaveFunctionData } = props;
  const EhanceForm = getForm({ schema, uiSchema, formData });
  const formLayout = schema.formLayout || {};
  const [form] = Form.useForm();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const commonFormhandleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('valueSSSSSS', values);
        if (modalSaveFunctionData) {
          modalSaveFunctionData(values);
        }
      })
      .catch((err) => {
        console.log('errInfo-', err);
      });
  };

  React.useEffect(() => {
    console.log('测试Form>>>>>', form);
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Form layout={formLayout} initialValues={formData} form={form}>
      <EhanceForm />
    </Form>
  );
};

export default CommoForm;
