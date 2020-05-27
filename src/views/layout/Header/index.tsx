import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Menu } from 'antd';
import {
  GithubOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IReduxState } from '../../../redux/types';
import ResetDB from './components/ResetDB';
import SearchInput from './components/SearchInput';
import FullScreen from './components/FullScreen';
import ModuleMenu from './components/ModuleMenu';
import UserCenter from './components/UserCenter';
import Loadble from './components/RenderLoadble';

const collapsedStyle = {
  fontSize: 18,
};

export interface IHeaderProps extends RouteComponentProps {
  collapsed: boolean;
  toggle: () => void;
  toggleNavTab: () => void;
  navTabshow: boolean;
  itemDisplay: boolean;
  theme: any;
  avatar: string;
  headerCurrentModuleName: string;
  moduleList: any[];
}

const MyHeader: React.FunctionComponent<IHeaderProps> = (props) => {
  const {
    moduleList,
    itemDisplay,
    toggle,
    collapsed,
    headerCurrentModuleName,
  } = props;
  const { theme } = props;
  const HeaderModuleList = moduleList.filter((item: any) => item.leftMenu);
  const moduleListLen = moduleList.length;

  // // 更新左侧的菜单
  const onMenuClick = (e: any) => {
    const { history, location } = props;
    const accesseMenu = props.moduleList;
    const ImoduleList = accesseMenu.filter((item) => {
      return item.leftMenu && item.name === e.key;
    });
    if (location.pathname !== moduleList[0].path) {
      history.push(ImoduleList[0].path);
    }
  };

  console.log('Header-render', moduleList);
  return (
    <Row justify='start'>
      <Col xs={4} sm={4} md={2} lg={1} xl={1}>
        <Menu
          theme={theme}
          style={{
            display: 'flex',
            height: '100%',
            border: 'none',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={toggle}
        >
          {collapsed ? (
            <MenuUnfoldOutlined style={collapsedStyle} />
          ) : (
            <MenuFoldOutlined style={collapsedStyle} />
          )}
        </Menu>
      </Col>
      <Col xs={14} sm={16} md={10} lg={10} xl={10}>
        {moduleListLen ? (
          <ModuleMenu
            moduleList={HeaderModuleList}
            onMenuClick={onMenuClick}
            headerCurrentModuleName={headerCurrentModuleName}
            theme={theme}
          />
        ) : (
          <Loadble num={5} />
        )}
      </Col>
      <Col
        sm={12}
        md={7}
        lg={6}
        xl={6}
        style={{
          display: itemDisplay ? 'block' : 'none',
          // backgroundColor: 'green',
        }}
      >
        <Menu
          theme={theme}
          style={{
            border: 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <SearchInput />
            <a href='https://github.com/songtianen'>
              <GithubOutlined
                style={{
                  fontSize: 20,
                }}
              />
            </a>
            <FullScreen />
            <ResetDB />
          </div>
        </Menu>
      </Col>
      <Col xs={6} sm={4} md={5} lg={4} xl={4} xxl={4}>
        <UserCenter />
      </Col>
    </Row>
  );
};

const mapStateToProps = (state: IReduxState) => {
  return {
    name: state.app.name,
    theme: state.app.theme,
    avatar: state.app.avatar,
    headerCurrentModuleName: state.app.headerCurrentModuleName,
    moduleList: state.app.moduleList,
  };
};
export default withRouter(connect(mapStateToProps)(MyHeader));
