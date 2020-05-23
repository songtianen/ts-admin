/* eslint-disable @typescript-eslint/no-empty-interface */
import * as React from 'react';

export interface IRegisterProps {}

export interface IRegisterState {}

export default class Register extends React.PureComponent<
  IRegisterProps,
  IRegisterState
> {
  constructor(props: IRegisterProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>注册页面</div>;
  }
}
