// @flow

import './Checkbox.scss';

import * as React from 'react';
import classNames from 'classnames';


type Props = {
  className?: string,
  inputClassName?: string,
  children?: React.Node
};

const Checkbox = ({children, className, inputClassName, ...props}: Props) => (
  <label className={classNames('checkbox', className)}>
    <input
      className={classNames('checkbox__input', inputClassName)}
      type="checkbox"
      {...props} />
    <span className="checkbox__text">
      {children}
    </span>
  </label>
);

export default Checkbox;
