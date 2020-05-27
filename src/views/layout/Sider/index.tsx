/* eslint-disable @typescript-eslint/no-empty-interface */
import * as React from 'react';

export interface ISiderProps {
  responsive: boolean;
  collapsed: boolean;
  siderModuleMenu: [];
}

export interface ISiderState {}

class Sider extends React.Component<ISiderProps, ISiderState> {
  constructor(props: ISiderProps) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log('Sider-didMount', this.props);
  }

  public render() {
    return <div>Sider</div>;
  }
}

export default Sider;
