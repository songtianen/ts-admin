import * as React from 'react';

const useModalClickHook = (initialValue: any) => {
  const [visible, setVisble] = React.useState(initialValue);
  const onCancel = () => {
    setVisble(false);
  };

  const onVisible = () => {
    setVisble(true);
  };
  const controlVisble = {
    onVisible,
    onCancel,
  };
  // 返回包含了更多逻辑的 state 以及改变 state 方法的钩子
  return [visible, controlVisble];
};
export default useModalClickHook;
