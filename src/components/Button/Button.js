import './Button.scss';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const Button = ({type, children, outline, ...rest}) => (
  <button className={classNames('button', `button--${type}`, {
    'button--outline': outline
  })} {...rest}>
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'default']),
  outline: PropTypes.bool
};

Button.defaultProps = {
  type: 'default',
  outline: false
};

export default Button;
