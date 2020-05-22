import * as React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import MySider from '../Sider';
import MyHeader from '../Header';
import MyNavTabs from '../Content';
import Footer from '../Footer';

const { Content } = Layout;

export interface IProps {
  // dispatch():void ,
  // history: object,
  // location: object,
  moduleList: [];
  siderModuleMenu: [];
  siderOpenKeys: [];
}
export interface IState {
  collapsed: boolean;
  responsive: boolean;
  navTabShow: boolean;
  headerItemDisplay: boolean;
  layOutHeight: string;
}

class MyLayout extends React.PureComponent<IProps, IState> {
  state: IState = {
    collapsed: false,
    responsive: false,
    navTabShow: true,
    headerItemDisplay: true,
    layOutHeight: '',
  };

  componentDidMount() {
    console.log(this.props);
  }
  public render() {
    const { siderModuleMenu } = this.props;
    return (
      <Layout style={{ height: this.state.layOutHeight }}>
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
