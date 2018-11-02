// @flow

import './Button.scss';

import * as React from 'react';
import classNames from 'classnames';

import Icon from '../Icon/Icon';

type Props = {
  className?: string,
  type?: 'primary' | 'secondary' | 'default',
  flat?: boolean,
  raised?: boolean,
  compact?: boolean,
  rounded?: boolean,
  outline?: boolean,
  icon?: string,
  children?: React.Node
};

const Button = ({
  className = '',
  type = 'default',
  flat = false,
  raised = false,
  compact = false,
  rounded = false,
  outline = false,
  icon,
  children,
  ...rest
}: Props) => (
  <button
    className={classNames(className, 'button', `button--${type}`, {
      'button--flat': flat,
      'button--raised': raised,
      'button--compact': compact,
      'button--rounded': rounded,
      'button--outline': outline,
      'button--icon': icon,
      'button--empty': !children
    })}
    {...rest}>
    {icon && <Icon name={icon} className="button__icon" />}
    {children}
  </button>
);

export default Button;
