import React, { FC, useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteChildrenProps } from 'react-router-dom';
import { IReduxState } from '../../../../redux/types';
import { login } from '../redux/actions';
import UserFormWarp from '../components/FormWarp';
import useDocAndHTML from '../hooks/useDocAndHTML';
import './index.less';
import MyIcon from '../../../components/MyIcon';

const layout = {
  // labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

export interface ILoginProps extends RouteChildrenProps {
  isLogin: boolean;
  dispatch: Dispatch;
  error: string;
}

const Login: FC<ILoginProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const { history } = props;
  // useEffect，react 在组件卸载时，和更新时，去执行清除上一个useEffect
  useDocAndHTML({
    deps: [],
    docTilte: '登陆',
  });
  useEffect(() => {
    const { isLogin } = props;
    if (isLogin) {
      setLoading(false);
      history.replace('/');
    }
    // setLoading(false);
    // history.push('/register');
  });

  const onFinish = (values: any) => {
    const { username, password } = values;
    const { dispatch } = props;
    dispatch(
      login({
        username,
        password,
      }),
    );
    setLoading(true);
    console.log('Success:', username, password);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onFinishFailed = (errorInfo: any) => {
    setLoading(false);
  };
  const gotoRegister = () => {
    history.push('/register');
  };

  console.log('LoginComponent-befor-render');

  return (
    <UserFormWarp
      btn={{
        hasBtn: true,
        btnClick: gotoRegister,
        btnContent: '注册',
      }}
    >
      <Form
        {...layout}
        name='basic'
        initialValues={{
          remember: true,
          username: 'admin',
          password: '123456',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        用户名：
        <span style={{ backgroundColor: 'yellow' }}>
          admin/admin2/HR/CTO/CFO/CMO
        </span>
        <Form.Item
          // label='Username'
          name='username'
          rules={[
            { required: true, message: '请输入用户名 !' },
            {
              whitespace: true,
              message: '不能有空格 !',
            },
          ]}
        >
          <Input
            prefix={<MyIcon type='icon-user' style={{ color: '#aaa' }} />}
          />
        </Form.Item>
        <Form.Item
          // label='Password'
          name='password'
          rules={[
            { required: true, message: '请输入密码 !' },
            {
              whitespace: true,
              message: '不能有空格 !',
            },
          ]}
        >
          <Input.Password
            prefix={<MyIcon type='icon-lock' style={{ color: '#aaa' }} />}
            placeholder='Password'
          />
        </Form.Item>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>忘记密码？</a>
        <Form.Item {...tailLayout}>
          <Button
            type='primary'
            htmlType='submit'
            loading={loading}
            style={{ width: '100%', margin: '10px 0' }}
          >
            登陆
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
      </Form>
    </UserFormWarp>
  );
};
const mapStateToProps = (state: IReduxState) => {
  // console.log('Login-state--', state);
  return {
    isLogin: state.login.isLogin,
    error: state.login.error,
  };
};

export default connect(mapStateToProps)(Login);
