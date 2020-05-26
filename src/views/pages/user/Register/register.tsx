import * as React from 'react';
import { Form, Input, Button } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import { RouteChildrenProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import UserFormWarp from '../components/FormWarp';
import { register } from '../redux/actions';
import { IReduxState } from '../../../../redux/types';
import useDocAndHTML from '../hooks/useDocAndHTML';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

interface IRegisterProps extends RouteChildrenProps {
  error: string;
  isLogin: boolean;
  dispatch: Dispatch;
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [count, setCount] = React.useState(0);
  useDocAndHTML({
    deps: [],
    docTilte: '注册',
  });
  React.useEffect(() => {
    const { isLogin, history } = props;
    if (isLogin) {
      setLoading(false);
      history.replace('/');
    }
  });
  const onGetCaptcha = () => {
    let num = 10;
    setCount(num);
    const interval = window.setInterval(() => {
      num -= 1;
      setCount(num);
      if (num === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };
  const handleSubmit = (values: any) => {
    const { dispatch } = props;
    dispatch(register(values));
    setLoading(true);
  };
  const onFinishFailed = () => {
    setLoading(false);
  };
  console.log('register-Render');
  return (
    <UserFormWarp>
      <Form
        {...formItemLayout}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          // {...tailFormItemLayout}
          label='用户名'
          name='username'
          rules={[
            { required: true, message: '输入用户名' },
            { whitespace: true, message: '用户名不能输入空格' },
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='用户名'
          />
        </Form.Item>
        <Form.Item
          label='邮箱'
          name='email'
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '邮箱格式一定要正确' },
          ]}
        >
          <Input
            prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='邮箱'
          />
        </Form.Item>
        <Form.Item
          label='密码'
          name='password'
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
            { whitespace: true, message: '用户名不能输入空格' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='密码'
            visibilityToggle
          />
        </Form.Item>
        <Form.Item
          label='确认'
          name='confirm'
          rules={[
            {
              required: true,
              message: '请确认密码!',
            },
            { whitespace: true, message: '用户名不能输入空格' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('请输入一致的密码 !');
              },
            }),
          ]}
        >
          <Input.Password placeholder='确认密码' />
        </Form.Item>
        <Form.Item
          label='手机号'
          name='phone'
          rules={[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3-578]\d{9}$/, message: '请输入正确的手机格式' },
          ]}
        >
          <Input
            prefix={<MobileOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='手机号'
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label='验证码'
          name='captcha'
          rules={[
            { required: true, message: '请输入验证码' },
            { max: 6, message: '6位' },
            { whitespace: true, message: '用户名不能输入空格' },
          ]}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Input placeholder='任意6位' style={{ width: '40%' }} />
            <Button type='primary' disabled={!!count} onClick={onGetCaptcha}>
              {count ? `${count} s` : '获取验证码'}
            </Button>
          </div>
        </Form.Item>
        <Form.Item style={{ marginTop: '30px' }}>
          <Button type='primary' loading={loading} htmlType='submit'>
            提交
          </Button>
        </Form.Item>
      </Form>
    </UserFormWarp>
  );
};
const mapStateToProps = (state: IReduxState) => {
  return {
    error: state.login.error,
    isLogin: state.login.isLogin,
  };
};

export default connect(mapStateToProps)(Register);
