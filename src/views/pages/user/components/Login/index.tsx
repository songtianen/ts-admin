import React, { FC, useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GithubOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { RouteChildrenProps } from 'react-router-dom';
import { IReduxState } from '../../../../../redux/types';
import { login } from '../../redux/actions';
import './index.less';

const { Meta } = Card;

const logo = require('../../../../../resource/assets/logo.jpg');

const layout = {
  // labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

interface ILoginProps extends RouteChildrenProps {
  isLogin: boolean;
  dispatch: Dispatch;
  error: string;
}

const Login: FC<ILoginProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const { history } = props;
  // useEffect，react 在组件卸载时，和更新时，去执行清除上一个useEffect
  useEffect(() => {
    console.log('Login-Props', props);
    document.title = '登陆';
    const StartLogin: HTMLElement | null = document.getElementById(
      'StartLoading',
    );

    if (StartLogin) {
      document.body.removeChild(StartLogin);
    }
    // return 一个函数做清除副作用
    // return () => {
    //   console.log('REACT_EFFECT__remove');
    // };
  }, []);
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
    <div className='login-wrap'>
      <div className='login-item-box'>
        <img src={logo} className='logo-img' alt='login-img' />
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
          <span>用户名：admin/admin2/HR/CTO/CFO/CMO</span>
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
            <Input prefix={<UserOutlined style={{ color: '#aaa' }} />} />
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
              prefix={<LockOutlined style={{ color: '#aaa' }} />}
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
        <div className='login-bottom'>
          <div className='login-rigster-btn'>
            <Button type='primary' onClick={gotoRegister}>
              注册
            </Button>
          </div>
          <div className='login-rigster-meta'>
            <Meta
              avatar={
                <GithubOutlined
                  style={{ fontSize: '22px', color: '#1890FF' }}
                />
              }
              title={
                <a
                  href='https://github.com/songtianen'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  AU-admin
                </a>
              }
              description='通用权限控制与表单的后台管理系统'
            />
          </div>
        </div>
      </div>
    </div>
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
