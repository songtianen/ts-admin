import React,{ FC } from 'react';
import { Button, DatePicker, message } from 'antd';
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

const handleChange = (value:any) => {
  message.info(
    `您选择的日期是: ${value ? value.format('YYYY年MM月DD日') : '未选择'}`,
  );
};
const MyLayout:FC = (props) => {
  return (
    <div>
      Layout组件<Button type='primary'>Button</Button>
      <DatePicker onChange={handleChange} />
      <div className='icons-list'>
        <HomeOutlined />
        <SettingFilled />
        <SmileOutlined />
        <SyncOutlined spin />
        <SmileOutlined rotate={180} />
        <LoadingOutlined />
      </div>
      ,
    </div>
  );
};
export default MyLayout;
