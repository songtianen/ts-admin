/* eslint-disable @typescript-eslint/no-empty-interface */
import * as React from 'react';

export interface IHeaderProps {}

export interface IHeaderState {}

export default class Header extends React.Component<
  IHeaderProps,
  IHeaderState
> {
  constructor(props: IHeaderProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>Header</div>;
  }
}
