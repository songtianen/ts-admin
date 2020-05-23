import * as React from 'react';
import { connect } from 'react-redux';
import { getToken } from '../../../util/token';
import util from '../../../util/util';
import { Layout } from 'antd';
import MySider from '../Sider';
import MyHeader from '../Header';
import MyNavTabs from '../Content';
import Footer from '../Footer';
import reduxApp from './redux';
import { Dispatch } from 'redux';
import { RouteChildrenProps } from 'react-router-dom';

const { Content } = Layout;
const { initAppDataAction, updateModuleAction } = reduxApp.actions;
export interface IProps extends RouteChildrenProps {
  dispatch: Dispatch;
  moduleList: [];
  siderModuleMenu: [];
  siderOpenKeys: [];
}
export interface IState {
  collapsed: boolean;
  responsive: boolean;
  navTabShow: boolean;
  headerItemDisplay: boolean;
  layOutHeight: number | null;
}

class MyLayout extends React.PureComponent<IProps, IState> {
  state: IState = {
    collapsed: false,
    responsive: false,
    navTabShow: true,
    headerItemDisplay: true,
    layOutHeight: null,
  };

  componentDidUpdate(prevProps: IProps) {
    const thisPathname = this.props.location.pathname;
    const prevPathname = prevProps.location.pathname;
    if (thisPathname !== prevPathname) {
      const { moduleList, dispatch, siderOpenKeys } = this.props;

      const findModule = util.findCurrentMenuNameAndModule(
        moduleList,
        thisPathname,
      );
      const siderModuleMenu = JSON.parse(JSON.stringify(findModule.children));
      const siderData = util.findSiderComponentSelectedNameAndOpenKeys(
        siderModuleMenu,
        thisPathname,
      ); // 查找的Sider组件需要的key和openKeys
      dispatch(
        updateModuleAction({
          siderModuleMenu: findModule.children,
          headerCurrentModuleName: findModule.name,
          siderOpenKeys: [...siderData.siderOpenKeys, ...siderOpenKeys],
          siderSelectedKey: siderData.siderKey,
        }),
      );
    }
  }

  componentDidMount() {
    console.log('layout.props', this.props);

    this.getClientWidth();
    this.initAppData();
    window.onresize = () => {
      this.getClientWidth();
    };
    const StartLogin: HTMLElement | null = document.getElementById(
      'StartLoading',
    );

    if (StartLogin) {
      document.body.removeChild(StartLogin);
    }
  }

  // 获取当前浏览器宽度并设置responsive管理响应式
  getClientWidth = (): void => {
    const clientWidth = document.body.clientWidth;
    const clientHeight = document.body.clientHeight;

    this.setState({
      responsive: clientWidth <= 991,
      collapsed: clientWidth <= 991,
      layOutHeight: clientHeight,
      // layOutWidth: clientWidth,
    });
    if (clientWidth < 577) {
      this.setState({
        // navTabTop: 50,
        headerItemDisplay: false,
      });
      return;
    }
    if (clientWidth < 768) {
      this.setState({
        // navTabTop: 96,
        headerItemDisplay: false,
      });
      return;
    }
    if (clientWidth >= 768) {
      this.setState({
        // navTabTop: 50,
        headerItemDisplay: true,
      });
    }
  };

  toggle = (): void => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  // 隐藏 contentTab
  toggleNavTab = (): void => {
    this.setState({ navTabShow: !this.state.navTabShow });
  };

  // 初始化Layout组件，初始化Sider组件
  initAppData = (): void => {
    // 获取用户信息,菜单,权限列表(整个应用就一种layout布局,App就是相当母版页,不必在AuthrizedRoute里每次路由跳转的时候判断是否需要获取,是否登录也在此处判断)
    // 没有登录，跳转到登录界面，并记下当前路径
    const token = getToken();
    if (!token) {
      this.props.history.push('/login');
      return;
    }
    const { dispatch, location } = this.props;
    dispatch(initAppDataAction(location.pathname));
  };
  public render() {
    const { siderModuleMenu } = this.props;
    return (
      <Layout>
        <MySider
        // responsive={this.state.responsive}
        // collapsed={this.state.collapsed}
        // siderModuleMenu={siderModuleMenu}
        />
        <Layout>
          <MyHeader
          // collapsed={this.state.collapsed}
          // toggle={this.toggle}
          // toggleNavTab={this.toggleNavTab}
          // navTabshow={this.state.navTabShow}
          // itemDisplay={this.state.headerItemDisplay}
          />
          <Content
            style={{
              height: '100%',
              overflow: 'auto',
            }}
          >
            <MyNavTabs
            // style={{
            //   marginTop: 49,
            //   width: '100%',
            //   height: '100%',
            //   display: this.state.navTabShow ? 'block' : 'none',
            // }}
            // show={this.state.navTabShow}
            />
          </Content>
          {/* <Footer itemDisplay={this.state.headerItemDisplay} /> */}
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

const mapState2Props = (state: any) => {
  const {
    name,
    siderModuleMenu,
    moduleList,
    // headerCurrentModuleName,
    siderOpenKeys,
  } = state.app;
  return {
    name,
    moduleList,
    siderModuleMenu,
    siderOpenKeys,
    // headerCurrentModuleName,
  };
};

export default connect(mapState2Props)(MyLayout);
