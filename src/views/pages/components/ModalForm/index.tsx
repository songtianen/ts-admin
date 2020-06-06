import * as React from 'react';
import { Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
// import { ModalProps } from 'antd/lib/modal';
import CommonForm from '../Form';
import { IEditSchemaProps } from '../Form/util/type';

export interface IModalFormProps {
  schema: IEditSchemaProps;
  uiSchema: any;
  formData?: any;
  visible: boolean;
  cancelText: string;
  okText: string;
  title: string;
  onCancel: () => void;
  modalSubmit: (values: any) => void;
  destroyOnClose: boolean;
}

const ModalForm: React.FunctionComponent<IModalFormProps> = (props) => {
  const {
    schema,
    uiSchema,
    formData,
    visible,
    cancelText,
    okText,
    title,
    onCancel,
    destroyOnClose,
    modalSubmit,
  } = props;
  let FormIns: FormInstance;
  const handleModalSunbmit = () => {
    FormIns.validateFields().then((values) => {
      modalSubmit(values);
    });
  };

  return (
    <Modal
      visible={visible}
      cancelText={cancelText}
      okText={okText}
      title={title}
      onCancel={onCancel}
      onOk={handleModalSunbmit}
      destroyOnClose={destroyOnClose}
    >
      <CommonForm
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        handleFormInstance={(formIns) => {
          FormIns = formIns;
        }}
      />
    </Modal>
  );
};
export default ModalForm;
