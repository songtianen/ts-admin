import * as React from 'react';

const useGetClient = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [responsive, setResponsive] = React.useState(false);
  const [headerItemDisplay, setHeaderItemDisplay] = React.useState(true);
  const [layOutHeight, setLayOutHeight] = React.useState(0);
  React.useEffect(() => {
    document.title = '首页';
    const { clientWidth } = document.body;
    const { clientHeight } = document.body;

    setResponsive(() => {
      return clientWidth <= 991;
    });
    setCollapsed(() => {
      return clientWidth <= 991;
    });
    setLayOutHeight(() => {
      return clientHeight;
    });
    if (clientWidth < 577) {
      setHeaderItemDisplay(false);
    }
    if (clientWidth < 768) {
      setHeaderItemDisplay(false);
    }
    if (clientWidth >= 768) {
      setHeaderItemDisplay(true);
    }
  }, []);

  return {
    collapsed,
    responsive,
    headerItemDisplay,
    layOutHeight,
  };
};
export default useGetClient;
