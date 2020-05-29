import * as React from 'react';

interface ILoadbleProps {
  num: number;
}

const Loadble: React.FunctionComponent<ILoadbleProps> = (props) => {
  const { num } = props;
  const arr = new Array(num).fill('0');
  return (
    <div
      style={{
        // width: '100%',
        // height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {arr.map((item, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{
            width: 150,
            height: 30,
            marginTop: 20,
            backgroundColor: '#F0F2F5',
          }}
        />
      ))}
    </div>
  );
};

export default Loadble;
