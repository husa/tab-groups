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
      'button--icon': icon
    })}
    {...rest}>
    {icon && <Icon name={icon} className="button__icon" />}
    {children}
  </button>
);

export default Button;
