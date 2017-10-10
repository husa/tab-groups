import './Input.scss';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const Input = ({className, ...props}) => (
  <input
    type="text"
    className={classNames('input', className)}
    {...props} />
);

Input.propTypes = {
  className: PropTypes.string
};

Input.defaultProps = {
  className: ''
};

export default Input;
