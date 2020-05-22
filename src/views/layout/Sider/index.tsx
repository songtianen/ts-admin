import * as React from 'react';

export interface ISiderProps {}

export interface ISiderState {}

export default class Sider extends React.Component<ISiderProps, ISiderState> {
  constructor(props: ISiderProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>Sider</div>;
  }
}
