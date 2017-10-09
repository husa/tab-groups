import './Button.scss';

import React from 'react';
import classNames from 'classnames';


const Button = ({type, children, ...rest}) => (
  <button className={classNames('button', `button--${type}`)} {...rest}>
    {children}
  </button>
);

export default Button;
