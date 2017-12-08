// @flow

import './Button.scss';

import * as React from 'react';
import classNames from 'classnames';

type Props = {
  type: 'primary' | 'secondary' | 'default',
  flat?: boolean,
  raised?: boolean,
  compact?: boolean,
  children?: React.Node
};

const Button = ({
  type = 'default',
  flat = false,
  raised = false,
  compact = false,
  children,
  ...rest
}: Props) => (
  <button
    className={classNames('button', `button--${type}`, {
      'button--flat': flat,
      'button--raised': raised,
      'button--compact': compact
    })}
    {...rest}>
    {children}
  </button>
);

export default Button;
