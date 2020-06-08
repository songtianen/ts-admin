import * as React from 'react';
import { Modal, Form, Button, Input, notification } from 'antd';
import { resetdb } from '../../../../api';
import MyIcon from '../../../components/MyIcon';

const FormItem = Form.Item;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IResetDBProps {
  // theme: 'dark' | 'light' | undefined;
  responsive: boolean;
}

const ResetDB: React.FunctionComponent<IResetDBProps> = (props) => {
  const { responsive } = props;
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleSubmit = async (values: any) => {
    try {
      const data: any = await resetdb({ password: values.password });

      if (data.statusCode === 200) {
        notification.success({
          message: data.msg,
        });
      }
    } catch (error) {
      notification.error({
        message: error.msg,
      });
    }
  };

  const modalOnCancel = () => {
    setModalVisible(false);
  };

  const iconClick = () => {
    setModalVisible((val) => {
      return !val;
    });
  };

  return (
    <div>
      <MyIcon
        type='icon-database'
        style={{
          fontSize: 16,
          color: '#08c',
          display: responsive ? 'none' : 'block',
        }}
        onClick={iconClick}
      />
      <Modal visible={modalVisible} title='重置数据库' onCancel={modalOnCancel} footer={null} destroyOnClose>
        <Form onFinish={handleSubmit}>
          <FormItem
            name='password'
            rules={[
              { required: true, message: '请输入密码!' },
              { whitespace: true, message: '不能输入空格!' },
              { max: 20, message: '不能超过10位!' },
            ]}
          >
            <Input.Password
              prefix={<MyIcon type='icon-lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='请输入密码'
            />
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
              提交
            </Button>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};

export default ResetDB;
