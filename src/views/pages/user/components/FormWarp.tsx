import * as React from 'react';
import { Button, Card } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import './index.less';

const logo = require('../../../../resource/assets/logo.jpg');

const { Meta } = Card;

export interface IbtnProp {
  hasBtn?: boolean;
  btnStyle?: React.CSSProperties;
  btnContent?: string;
  btnClick?: () => any;
}

export interface IUserFormWarpProps {
  btn?: IbtnProp;
}

const UserFormWarp: React.FunctionComponent<IUserFormWarpProps> = (props) => {
  const { btn, children } = props;
  return (
    <div className='login-wrap'>
      <div className='login-item-box'>
        <img src={logo} className='logo-img' alt='login-img' />
        {children}
        <div className='login-bottom'>
          <div className='login-rigster-btn'>
            {btn?.hasBtn ? (
              <Button
                type='primary'
                style={btn.btnStyle}
                onClick={btn.btnClick}
              >
                {btn.btnContent}
              </Button>
            ) : (
              ''
            )}
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
UserFormWarp.defaultProps = {
  btn: {
    hasBtn: false,
  },
};

export default UserFormWarp;
