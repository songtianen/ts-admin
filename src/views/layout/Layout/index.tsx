/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Dispatch } from 'redux';
import { RouteChildrenProps } from 'react-router-dom';
import { getToken } from '../../../util/token';
import util from '../../../util/util';
import MySider from '../Sider';
import MyHeader from '../Header';
import MyContent from '../Content';
import MyFooter from '../Footer';
import reduxApp from './redux';
import { IReduxState } from '../../../redux/types';
import MyIcon from '../../components/MyIcon';

const { Content, Sider, Footer } = Layout;
const { initAppDataAction, updateModuleAction } = reduxApp.actions;

export interface IProps extends RouteChildrenProps {
  dispatch: Dispatch;
  moduleList: [];
  siderModuleMenu: [];
  siderOpenKeys: [];
  theme: any;
}
export interface ILayoutState {
  collapsed: boolean;
  responsive: boolean;
  navTabShow: boolean;
  headerItemDisplay: boolean;
  layOutHeight: number | '';
}

class MyLayout extends React.PureComponent<IProps, ILayoutState> {
  // constructor(props: IProps) {
  //   super(props);
  // }
  // eslint-disable-next-line react/state-in-constructor
  state: ILayoutState = {
    collapsed: false,
    responsive: false,
    navTabShow: true,
    headerItemDisplay: true,
    layOutHeight: '',
  };

  // // eslint-disable-next-line react/no-deprecated
  // componentWillMount() {
  //   this.getClientWidth();
  // }

  componentDidMount() {
    this.initAppData();
    this.getClientWidth();
    // window.onresize = () => {
    //   this.getClientWidth();
    // };
    const StartLoading = document.getElementById('StartLoading');
    if (StartLoading) {
      document.body.removeChild(StartLoading);
    }
  }

  componentDidUpdate(prevProps: any) {
    // eslint-disable-next-line react/destructuring-assignment
    const thisPathname = this.props.location.pathname;
    const prevPathname = prevProps.location.pathname;
    if (thisPathname !== prevPathname) {
      const { moduleList, dispatch, siderOpenKeys } = this.props;
      const findModule = util.findCurrentMenuNameAndModule(moduleList, thisPathname);
      const siderModuleMenu = JSON.parse(JSON.stringify(findModule.children));
      const siderData = util.findSiderComponentSelectedNameAndOpenKeys(siderModuleMenu, thisPathname); // 查找的Sider组件需要的key和openKeys
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

  // 初始化Layout组件，初始化Sider组件
  initAppData = () => {
    // 获取用户信息,菜单,权限列表(整个应用就一种layout布局,App就是相当母版页,不必在AuthrizedRoute里每次路由跳转的时候判断是否需要获取,是否登录也在此处判断)
    // 没有登录，跳转到登录界面，并记下当前路径
    const { history } = this.props;
    const token = getToken();
    if (!token) {
      history.replace('/login');
      return;
    }
    const { dispatch, location } = this.props;
    dispatch(initAppDataAction(location.pathname));
  };

  // 获取当前浏览器宽度并设置responsive管理响应式
  getClientWidth = () => {
    const { clientWidth } = document.body;
    const { clientHeight } = document.body;

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

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  render() {
    const { siderModuleMenu } = this.props;
    const { responsive, collapsed, navTabShow, headerItemDisplay, layOutHeight } = this.state;
    const { theme } = this.props;
    console.log('Layout-rnder');
    return (
      <Layout style={{ height: layOutHeight }}>
        <MyHeader toggle={this.toggle} navTabshow={navTabShow} responsive={responsive} />
        <Layout>
          <Sider
            breakpoint='md'
            collapsedWidth={responsive ? 0 : undefined}
            // trigger={
            //   collapsed ? (
            //     <MyIcon
            //       type='icon-indent'
            //       style={{
            //         fontSize: 20,
            //         color: '#777',
            //       }}
            //     />
            //   ) : (
            //     <MyIcon
            //       type='icon-outdent'
            //       style={{ fontSize: 20, color: '#777' }}
            //     />
            //   )
            // }
            collapsible
            width={180}
            theme={theme}
            onCollapse={this.toggle}
            style={{
              // boxShadow: '-2px 0px 10px #eee',
              boxSizing: 'content-box',
              borderRight: '1px solid #eee',
              backgroundColor: '#FcFcFc',
            }}
          >
            <MySider siderModuleMenu={siderModuleMenu} />
          </Sider>
          <Layout style={{ backgroundColor: '#F0F2F5' }}>
            <Content>
              <MyContent />
            </Content>
            <Footer>
              <MyFooter itemDisplay={headerItemDisplay} />
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
const mapState2Props = (state: IReduxState) => {
  const { siderModuleMenu, moduleList, siderOpenKeys, theme } = state.app;
  return {
    moduleList,
    siderModuleMenu,
    siderOpenKeys,
    theme,
  };
};
export default connect(mapState2Props)(MyLayout);
