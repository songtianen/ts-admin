import * as React from 'react';
import { Menu, Radio, Tag, Badge, Avatar } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { removeToken } from '../../../../util/token';
import { updateModuleAction } from '../../Layout/redux/actions/actions';
import { LOGOUT_SUCCESS } from '../../../pages/user/redux/actions';
import { logout } from '../../../../api';
import { IReduxState } from '../../../../redux/types';
import MyIcon from '../../../components/MyIcon';

const { SubMenu } = Menu;
const MenuItemGroup = Menu.ItemGroup;

interface IUserCenterProps extends RouteComponentProps {
  theme: any;
  dispatch: Dispatch;
  name: string;
}

const UserCenter: React.FunctionComponent<IUserCenterProps> = (props) => {
  const { theme, name } = props;

  const radioOnChange = (e: any) => {
    const { dispatch } = props;
    localStorage.setItem('theme', e.target.value);
    dispatch(
      updateModuleAction({
        theme: e.target.value,
      }),
    );
  };

  // 头像list
  const userMenuClick = async (e: any) => {
    if (e.key === 'logout') {
      const { dispatch, history } = props;
      removeToken();

      await logout('').then((res: any) => {
        if (res.data.isLogout) {
          dispatch({
            type: LOGOUT_SUCCESS,
            payload: {
              isLogin: false,
              isLogout: true,
              error: '',
            },
          });
          history.push('/login');
        }
      });
    }
  };
  console.log('userList -render');
  return (
    <Menu
      mode='horizontal'
      style={{
        border: 'none',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={userMenuClick}
      theme={theme}
    >
      <SubMenu
        title={
          <Badge dot>
            <Avatar shape='circle'>User</Avatar>
          </Badge>
        }
      >
        <MenuItemGroup title='用户中心'>
          <Menu.Item key='navTab'>{`你好:${name}`}</Menu.Item>
          <Menu.Item key='theme'>
            <Radio.Group onChange={radioOnChange} value={theme}>
              <Radio value='light'>
                <Tag>light</Tag>
              </Radio>
              <Radio value='dark'>
                <Tag color='#001529'>dark</Tag>
              </Radio>
            </Radio.Group>
          </Menu.Item>
          <Menu.Item key='setting:1'>
            <MyIcon type='icon-user' />
            个人信息
          </Menu.Item>
          <Menu.Item key='logout'>
            <span
              style={{
                display: 'inline-block',
                width: '100%',
                height: '100%',
              }}
            >
              <MyIcon type='icon-logout' />
              退出登录
            </span>
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
};
const mapStateToProps = (state: IReduxState) => {
  return {
    theme: state.app.theme,
    name: state.app.name,
  };
};

export default withRouter(connect(mapStateToProps)(UserCenter));
