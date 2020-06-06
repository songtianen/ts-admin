import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Tabs } from 'antd';
import { IReduxState } from '../../../redux/types';
import MenuMapToComponent from '../../../conf/menuMapToComponent';
import util from '../../../util/util';
import { updateModuleAction } from '../Layout/redux/actions/actions';

import './index.less';

const { TabPane } = Tabs;

export interface IMyContentProps extends RouteComponentProps {
  dispatch: Dispatch;
  moduleList: [];
}
export interface IMyContentOpenPages {
  name: string;
  title: string;
  path: string;
  closable: boolean;
}

const MyContent: React.FunctionComponent<IMyContentProps> = (props) => {
  const [pageCurrentName, setPageCurrentName] = React.useState('');

  const [openPages, setOPenPages] = React.useState<IMyContentOpenPages[]>([]);
  const { location, moduleList, dispatch, history } = props;
  // console.log('moduleList--', moduleList);
  // console.log('location--', location.pathname);

  if (moduleList.length) {
    const pageModule = util.findInModuleList(
      moduleList,
      'path',
      location.pathname,
    );
    if (!pageModule.length) {
      return <div>404</div>;
    }
    const currentPage = pageModule[0];
    // console.log('d昂', currentPage);
    // 查看打开的page中有没有当前的页面数据
    const isInOpenPages = openPages.some(
      (s: any) => s.name === currentPage.name,
    );
    if (!isInOpenPages) {
      // 当前打开开的页面中没有这个页面
      const newOpenPage = {
        name: currentPage.name,
        title: currentPage.title,
        path: currentPage.path,
        closable: currentPage.path !== '/',
      };
      setOPenPages((pages) => {
        // console.log('>>>>openPages', pages);
        return [...pages, newOpenPage];
      });
      setPageCurrentName(currentPage.name);
    }
    if (isInOpenPages) {
      // 当前打开的页面中-有-这个页面

      if (pageCurrentName !== currentPage.name) {
        setPageCurrentName(currentPage.name);
      }
    }
    // console.log('pageModule--', pageModule);
    // console.log('currentPage--', currentPage);
    // console.log('openPages--', openPages);
    // console.log('isInOpenPages--', isInOpenPages);
    // console.log('pageCurrentName--', pageCurrentName);
  }

  // 查看打开的page中有没有当前的页面数据;

  const tabsOnChange = (activeKey: string) => {
    const activeItem = openPages.find((item) => item.name === activeKey);
    if (activeItem) {
      history.push(activeItem.path);
    }
  };

  // onEdit 返回的删除回调/还可以优化一下
  const remove = (targetKey: string) => {
    let lastIndex = 0;
    let page_CurrentName = pageCurrentName;
    openPages.forEach((pane, i) => {
      if (pane.name === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = openPages.filter((pane) => pane.name !== targetKey);
    if (lastIndex >= 0 && page_CurrentName === targetKey) {
      page_CurrentName = panes[lastIndex].name;
    }
    setOPenPages(panes);
    setPageCurrentName(page_CurrentName);

    const { path } = openPages.filter((s) => s.name === page_CurrentName)[0];
    const pageModule = util.findCurrentMenuNameAndModule(moduleList, path);
    const siderData = util.findSiderComponentSelectedNameAndOpenKeys(
      JSON.parse(JSON.stringify(pageModule.children)),
      path,
    );
    dispatch(
      updateModuleAction({
        siderModuleMenu: pageModule.children,
        siderSelectedKey: siderData.siderKey,
        headerCurrentModuleName: pageModule.name,
        siderOpenKeys: siderData.siderOpenKeys,
      }),
    );
    history.push(path);
  };

  // tab 新增/删除回调
  const onEdit = (targetKey: any, action: string) => {
    if (action === 'remove') {
      remove(targetKey);
    }
    console.log('Anction>???', typeof action, targetKey);
  };

  const renderTabPane = () => {
    return openPages.map((item: IMyContentOpenPages) => {
      /* 后端返回的name属性，前端还没有开发这个页面，返回图标页面 */
      const Page = MenuMapToComponent[item.name]
        ? MenuMapToComponent[item.name]
        : MenuMapToComponent.notdone; // 如果前端本地没有这个页面
      return (
        <TabPane
          tab={item.title}
          closable={item.closable} // 是否是可关闭
          key={item.name}
        >
          <div
            style={{
              padding: '10px',
            }}
          >
            <Page />
          </div>
        </TabPane>
      );
    });
  };

  const renderTabBar = (pro: any, DefaultTabBar: any) => {
    return (
      <DefaultTabBar
        {...pro}
        className='site-custom-tab-bar'
        style={{
          height: '40px',
          padding: '0 36px',
          borderBottom: 'none',
          backgroundColor: '#fff',
          boxShadow: '-2px 0px 4px #eee',
        }}
      />
    );
  };
  console.log('MyContent-Render');
  return (
    <Tabs
      hideAdd
      type='editable-card'
      renderTabBar={renderTabBar}
      activeKey={pageCurrentName}
      onEdit={onEdit}
      onChange={tabsOnChange}
      size='small'
    >
      {renderTabPane()}
    </Tabs>
  );
};

const mapStateToPorps = (state: IReduxState) => {
  return {
    moduleList: state.app.moduleList,
  };
};

export default withRouter(connect(mapStateToPorps)(MyContent));
