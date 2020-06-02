import * as React from 'react';
import { Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
// import { ModalProps } from 'antd/lib/modal';
import CommonForm from '../Form';
import { IEditSchemaProps } from '../Form/util/type';

export interface IModalFormProps {
  editSchema: IEditSchemaProps;
  editUiSchema: any;
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
    editSchema,
    editUiSchema,
    formData,
    visible,
    cancelText,
    okText,
    title,
    onCancel,
    destroyOnClose,
    children,
    modalSubmit,
  } = props;
  let FormIns: FormInstance;
  const handleModalSunbmit = () => {
    FormIns.validateFields().then((values) => {
      modalSubmit(values);
    });
  };

  return (
    <div>
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
          schema={editSchema}
          uiSchema={editUiSchema}
          formData={formData}
          handleFormInstance={(formIns) => {
            FormIns = formIns;
          }}
        />
      </Modal>
      {children}
    </div>
  );
};
export default ModalForm;
