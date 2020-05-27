import * as React from 'react';
import { Menu } from 'antd';

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
        <Menu.Item key={_moduleList[i].name}>
          <div>{_moduleList[i].title}</div>
        </Menu.Item>,
      );
    }
    return list;
  };
  console.log('ModuleMenu-render');
  return (
    <Menu
      style={{
        border: 'none',
      }}
      theme={theme}
      onClick={onMenuClick}
      selectedKeys={[headerCurrentModuleName]}
      mode='horizontal'
    >
      {renderList(moduleList)}
    </Menu>
  );
};

export default ModuleMenu;
