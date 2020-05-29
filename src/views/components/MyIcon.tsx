import * as React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { IconFontProps } from '@ant-design/icons/lib/components/IconFont';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1847450_f5uqxroi7x.js',
});

type IMyIconProps = IconFontProps;

const MyIcon: React.FunctionComponent<IMyIconProps> = (props) => {
  return <IconFont {...props} />;
};

export default MyIcon;
