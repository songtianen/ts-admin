import * as React from 'react';

export interface IUseDocAndHTMLProps {
  deps?: any[];
  docTilte?: string;
}

const useDocAndHTML = (props: IUseDocAndHTMLProps) => {
  const { deps, docTilte } = props;
  React.useEffect(() => {
    if (docTilte) {
      document.title = docTilte;
    }
    const StartLogin: HTMLElement | null = document.getElementById('StartLoading');
    if (StartLogin) {
      document.body.removeChild(StartLogin);
    }
  }, deps);
};
export default useDocAndHTML;
