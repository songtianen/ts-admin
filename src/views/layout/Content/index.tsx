/* eslint-disable @typescript-eslint/no-empty-interface */
import * as React from 'react';

export interface IContentProps {
  show: boolean;
}

export interface IContentState {}

export default class Content extends React.Component<
  IContentProps,
  IContentState
> {
  constructor(props: IContentProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>this is Content</div>;
  }
}
