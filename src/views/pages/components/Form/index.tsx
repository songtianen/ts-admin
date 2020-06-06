import * as React from 'react';
import { Form } from 'antd';
import getForm from './util/commonFormSchemaUtil';
import { IEditSchemaProps } from './util/type';

export interface ICommoFormProps {
  schema: IEditSchemaProps;
  uiSchema: any;
  formData?: any;
  handleFormInstance: (values: any) => void;
}

const CommoForm: React.FunctionComponent<ICommoFormProps> = (props) => {
  const { schema, uiSchema, formData, handleFormInstance } = props;
  const EhanceForm = getForm({ schema, uiSchema, formData });
  const [form] = Form.useForm();
  const formLayout = schema.formLayout || {};

  React.useEffect(() => {
    if (handleFormInstance) {
      handleFormInstance(form);
    }
  });

  return (
    <Form {...formLayout} initialValues={formData} form={form}>
      <EhanceForm />
    </Form>
  );
};

export default CommoForm;
