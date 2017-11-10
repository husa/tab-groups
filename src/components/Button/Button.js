// @flow

import './Button.scss';

import * as React from 'react';
import classNames from 'classnames';

type Props = {
  type: 'primary' | 'secondary' | 'default',
  outline?: boolean,
  children?: React.Node
};

const Button = ({type = 'default', children, outline = false, ...rest}: Props) => (
  <button
    className={classNames('button', `button--${type}`, {
      'button--outline': outline
    })}
    {...rest}>
    {children}
  </button>
);

export default Button;
