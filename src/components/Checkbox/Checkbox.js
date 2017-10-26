import './Checkbox.scss';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const Checkbox = ({children, className, inputClassName, ...props}) => (
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

Checkbox.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string
};

Checkbox.defaultProps = {
  className: '',
  inputClassName: ''
};

export default Checkbox;
