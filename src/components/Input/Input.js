// @flow

import './Input.scss';

import React from 'react';
import classNames from 'classnames';


type Props = {
  className?: string
};

const Input = ({className = '', ...props}: Props) => (
  <input
    type="text"
    className={classNames('input', className)}
    {...props} />
);

export default Input;
