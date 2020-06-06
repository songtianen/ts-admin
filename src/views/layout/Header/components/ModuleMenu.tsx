import * as React from 'react';
import { Menu, Badge } from 'antd';

interface IModuleMenuProps {
  moduleList: any[];
  onMenuClick: (e: any) => void;
  headerCurrentModuleName: string;
  theme: any;
}

const ModuleMenu: React.FunctionComponent<IModuleMenuProps> = (props) => {
  const { theme, onMenuClick, headerCurrentModuleName, moduleList } = props;
  const renderList = (_moduleList: any[]) => {
    const list = [];
    for (let i = 0; i < _moduleList.length; i++) {
      list.push(
        <Menu.Item
          // icon={
          //   headerCurrentModuleName === _moduleList[i].name ? (
          //     <Badge color='#FFFF02' />
          //   ) : null
          // }
          key={_moduleList[i].name}
        >
          {headerCurrentModuleName === _moduleList[i].name ? (
            <Badge color='#F3F348' offset={[4, 20]}>
              {_moduleList[i].title}
            </Badge>
          ) : (
            _moduleList[i].title
          )}
        </Menu.Item>,
      );
    }
    return list;
  };
  const List = renderList(moduleList);
  console.log('ModuleMenu-render');

  return (
    <Menu
      mode='horizontal'
      style={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        border: 'none',
      }}
      theme={theme}
      onClick={onMenuClick}
      selectedKeys={[headerCurrentModuleName]}
    >
      {List}
    </Menu>
  );
};

export default ModuleMenu;
