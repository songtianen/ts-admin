import * as React from 'react';
import MyIcon from '../../components/MyIcon';

export interface IFooterProps {
  itemDisplay: boolean;
}

export default function Footer(props: IFooterProps) {
  const { itemDisplay } = props;
  return (
    <>
      <div
        style={{
          display: itemDisplay ? 'block' : 'none',
          textAlign: 'center',
          color: '#bebebe',
          backgroundColor: 'pink',
          fontSize: '12px',
        }}
      >
        <a
          href='https://github.com/songtianen'
          target='_blank'
          rel='noopener noreferrer'
        >
          AU-admin&nbsp;&nbsp;&nbsp;&nbsp;
          <MyIcon type='icon-github-fill' />
        </a>
        <div>
          Copyright @<span>2019&nbsp;多元宇宙科技有限公司</span>
          <div>
            Email:
            <a
              style={{ color: '#bebebe' }}
              href='mailto:songten@icloud.com?subject=test&cc=抄送人邮箱&subject=主题&body=内容'
            >
              songten@icloud.com
            </a>
          </div>
        </div>
      </div>
      {itemDisplay ? (
        ''
      ) : (
        <div
          style={{
            textAlign: 'center',
            color: '#bebebe',
            fontSize: '12px',
          }}
        >
          <a
            href='https://github.com/songtianen'
            target='_blank'
            rel='noopener noreferrer'
          >
            AU-admin&nbsp;&nbsp;&nbsp;&nbsp;
            <MyIcon type='icon-github-fill' />
          </a>
        </div>
      )}
    </>
  );
}
